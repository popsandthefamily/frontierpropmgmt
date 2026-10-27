"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { sendPortalInvite } from "@/lib/sign/notify";
import { isAdmin } from "@/lib/admin/auth";
import type { ActionResult } from "@/components/admin/action-form";

/**
 * Admin actions behind /admin/owners.
 *
 * Every one of these re-checks the token itself. A server action is a callable
 * endpoint in its own right, so gating only the page that renders the form
 * would leave the mutations wide open to anyone who knows the action exists.
 * The check belongs here, on each action, not just on the page.
 *
 * They return their outcome rather than throwing it: production Next.js swaps
 * a thrown action error for a generic crash page, so "the welcome email
 * failed" never reached the admin it was written for.
 */
const NOT_AUTHORISED: ActionResult = { error: "Not authorised. Sign in again." };

async function allowed(formData: FormData): Promise<boolean> {
  return isAdmin(String(formData.get("token") ?? ""));
}

function refresh() {
  // "layout" so the owner list and every owner workspace under it both update;
  // a statement published from a detail page changes counts on the list too.
  revalidatePath("/admin/owners", "layout");
  revalidatePath("/admin");
}

/** Create the auth user and the owner profile together. */
export async function createOwner(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!(await allowed(formData))) return NOT_AUTHORISED;

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  if (!email) return { error: "An email address is required." };

  const admin = getSupabaseAdmin();

  // email_confirm so the owner can use a sign-in link immediately. No password
  // is ever set: the portal is magic-link only.
  const { data, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
  });
  if (error) return { error: `Could not create the account: ${error.message}` };

  const { error: profileError } = await admin.from("owner_profiles").insert({
    id: data.user.id,
    email,
    full_name: fullName || null,
    phone: phone || null,
  });
  if (profileError) {
    // Don't leave an auth user with no profile behind.
    await admin.auth.admin.deleteUser(data.user.id);
    return { error: `Could not save the profile: ${profileError.message}` };
  }

  refresh();

  // An unticked checkbox submits nothing at all, so this has to look for "on".
  // Checking for "off" meant unticking the box still sent the email.
  if (formData.get("invite") === "on") {
    const sent = await sendPortalInvite({ to: email, ownerName: fullName });
    if (!sent.ok) {
      return {
        error: `${email} was created, but the welcome email failed: ${sent.error}. Use "Send portal invite" on their page to try again.`,
      };
    }
    return { notice: `${fullName || email} added and sent a welcome email.` };
  }
  return { notice: `${fullName || email} added. No email was sent.` };
}

export async function addProperty(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!(await allowed(formData))) return NOT_AUTHORISED;

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Give the property a name." };

  const { error } = await getSupabaseAdmin().from("owner_properties").insert({
    owner_id: String(formData.get("owner_id")),
    name,
    city: String(formData.get("city") ?? "").trim() || null,
    address: String(formData.get("address") ?? "").trim() || null,
    hospitable_id: String(formData.get("hospitable_id") ?? "").trim() || null,
  });
  if (error) return { error: error.message };

  refresh();
  return { notice: `${name} added.` };
}

/**
 * Save a month's statement.
 *
 * Only the four figures that come off a payout report are entered by hand.
 * Net rental revenue, the management fee and the payout are derived here so the
 * arithmetic on the owner's statement is always internally consistent and
 * always matches the published fee definition, rather than depending on
 * whoever typed the numbers.
 */
export async function saveStatement(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!(await allowed(formData))) return NOT_AUTHORISED;

  // The form asks for a month, not a date: a date picker let "the 15th" through
  // and created a second statement for the same month.
  const month = String(formData.get("period_month") ?? "");
  if (!/^\d{4}-\d{2}$/.test(month)) return { error: "Choose the month this statement covers." };
  const periodStart = `${month}-01`;
  const propertyId = String(formData.get("property_id"));

  const num = (key: string) => Number(formData.get(key) ?? 0) || 0;

  const gross = num("gross_revenue");
  const platformFees = num("platform_fees");
  const occupancyTaxes = num("occupancy_taxes");
  const passThrough = num("pass_through_costs");
  if ([gross, platformFees, occupancyTaxes, passThrough].some((n) => n < 0)) {
    return { error: "Enter amounts as positive numbers; deductions are subtracted for you." };
  }

  const nightsBooked = num("nights_booked");
  const nightsAvailable = num("nights_available");
  if (nightsAvailable && nightsBooked > nightsAvailable) {
    return { error: "Nights booked can't be more than nights available." };
  }

  const admin = getSupabaseAdmin();

  // Saving a month again replaces it. That is fine for a draft, but an owner
  // may already be reading a published one, so it has to be unpublished first.
  const { data: existing } = await admin
    .from("owner_statements")
    .select("published_at")
    .eq("property_id", propertyId)
    .eq("period_start", periodStart)
    .maybeSingle();
  if (existing?.published_at) {
    return { error: "That month is already published. Unpublish it first, then save your changes." };
  }

  const netRentalIncome = gross - platformFees - occupancyTaxes;
  const managementFee = Math.round(netRentalIncome * 0.2 * 100) / 100;
  const ownerPayout =
    Math.round((netRentalIncome - managementFee - passThrough) * 100) / 100;

  const { error } = await admin
    .from("owner_statements")
    .upsert(
      {
        property_id: propertyId,
        owner_id: String(formData.get("owner_id")),
        period_start: periodStart,
        gross_revenue: gross,
        platform_fees: platformFees,
        occupancy_taxes: occupancyTaxes,
        net_rental_income: netRentalIncome,
        management_fee: managementFee,
        pass_through_costs: passThrough,
        owner_payout: ownerPayout,
        nights_booked: nightsBooked || null,
        nights_available: nightsAvailable || null,
        average_daily_rate: nightsBooked ? Math.round((gross / nightsBooked) * 100) / 100 : null,
        notes: String(formData.get("notes") ?? "").trim() || null,
      },
      { onConflict: "property_id,period_start" },
    );
  if (error) return { error: error.message };

  refresh();
  return {
    notice: `${existing ? "Draft updated" : "Saved as a draft"}. Payout ${ownerPayout.toLocaleString("en-US", { style: "currency", currency: "USD" })}. Publish it when it's ready for the owner.`,
  };
}

/** Publishing is what makes a statement visible to the owner. */
export async function setPublished(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!(await allowed(formData))) return NOT_AUTHORISED;

  const publish = String(formData.get("publish")) === "true";
  const { error } = await getSupabaseAdmin()
    .from("owner_statements")
    .update({ published_at: publish ? new Date().toISOString() : null })
    .eq("id", String(formData.get("statement_id")));
  if (error) return { error: error.message };

  refresh();
  return null;
}

/** Upload a document for an owner into the private bucket. */
export async function uploadDocument(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!(await allowed(formData))) return NOT_AUTHORISED;

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a file to upload." };
  }

  const ownerId = String(formData.get("owner_id"));
  const propertyId = String(formData.get("property_id") ?? "");
  const title = String(formData.get("title") ?? "").trim() || file.name.replace(/\.[a-z0-9]+$/i, "");
  const kind = String(formData.get("kind") ?? "other");
  const periodLabel = String(formData.get("period_label") ?? "").trim();

  const admin = getSupabaseAdmin();

  // Namespaced by owner and prefixed with a random segment, so one owner's path
  // can never be guessed from another's and re-uploading the same filename does
  // not overwrite the previous document.
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
  const storagePath = `${ownerId}/${crypto.randomUUID()}-${safeName}`;

  const { error: uploadError } = await admin.storage
    .from("owner-documents")
    .upload(storagePath, file, { contentType: file.type, upsert: false });
  if (uploadError) return { error: `Upload failed: ${uploadError.message}` };

  const { error } = await admin.from("owner_documents").insert({
    owner_id: ownerId,
    property_id: propertyId || null,
    title,
    kind,
    storage_path: storagePath,
    mime_type: file.type || null,
    size_bytes: file.size,
    period_label: periodLabel || null,
  });
  if (error) {
    // Don't leave an orphaned object in the bucket behind a failed row.
    await admin.storage.from("owner-documents").remove([storagePath]);
    return { error: error.message };
  }

  refresh();
  return { notice: `"${title}" uploaded as a draft. The owner can't see it until you publish it.` };
}

/** Publishing is what makes a document visible to the owner. */
export async function setDocumentPublished(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!(await allowed(formData))) return NOT_AUTHORISED;

  const publish = String(formData.get("publish")) === "true";
  const { error } = await getSupabaseAdmin()
    .from("owner_documents")
    .update({ published_at: publish ? new Date().toISOString() : null })
    .eq("id", String(formData.get("document_id")));
  if (error) return { error: error.message };

  refresh();
  return null;
}

/** Remove a document and its file together. */
export async function deleteDocument(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!(await allowed(formData))) return NOT_AUTHORISED;

  const admin = getSupabaseAdmin();
  const id = String(formData.get("document_id"));
  const { data } = await admin
    .from("owner_documents")
    .select("storage_path")
    .eq("id", id)
    .maybeSingle();

  // Signed paperwork is evidence. Deleting the original cascades away its
  // signers and request, and deleting an executed copy removes the file the
  // request points at, so neither can go while a request stands. Cancel the
  // request first if a draft really needs to go.
  if (data?.storage_path) {
    const [{ data: live }, { data: asCopy }] = await Promise.all([
      admin.from("signature_requests").select("id").eq("document_id", id).neq("status", "void").limit(1),
      admin.from("signature_requests").select("id").eq("signed_storage_path", data.storage_path).limit(1),
    ]);
    if ((live && live.length > 0) || (asCopy && asCopy.length > 0)) {
      return { error: "Signed or in-progress agreements can't be deleted." };
    }
    await admin.storage.from("owner-documents").remove([data.storage_path]);
  }
  const { error } = await admin.from("owner_documents").delete().eq("id", id);
  if (error) return { error: error.message };

  refresh();
  return null;
}

/** Send, or re-send, the portal welcome email. */
export async function sendOwnerInvite(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!(await allowed(formData))) return NOT_AUTHORISED;

  const admin = getSupabaseAdmin();
  const { data: owner } = await admin
    .from("owner_profiles")
    .select("email, full_name")
    .eq("id", String(formData.get("owner_id")))
    .single();
  if (!owner) return { error: "Owner not found." };

  const sent = await sendPortalInvite({ to: owner.email, ownerName: owner.full_name });
  refresh();
  if (!sent.ok) return { error: `Could not email ${owner.email}: ${sent.error}` };
  return { notice: `Invite sent to ${owner.email}.` };
}
