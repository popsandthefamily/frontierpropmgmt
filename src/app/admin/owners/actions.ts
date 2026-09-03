"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { sendPortalInvite } from "@/lib/sign/notify";
import { isAdmin } from "@/lib/admin/auth";

/**
 * Admin actions behind /admin/owners.
 *
 * Every one of these re-checks the token itself. A server action is a callable
 * endpoint in its own right, so gating only the page that renders the form
 * would leave the mutations wide open to anyone who knows the action exists.
 * The check belongs here, on each action, not just on the page.
 */
async function assertAdmin(token: string | undefined) {
  if (!(await isAdmin(token))) throw new Error("Not authorised.");
}

function refresh() {
  // "layout" so the owner list and every owner workspace under it both update;
  // a statement published from a detail page changes counts on the list too.
  revalidatePath("/admin/owners", "layout");
}

/** Create the auth user and the owner profile together. */
export async function createOwner(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  await assertAdmin(token);

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  if (!email) throw new Error("An email address is required.");

  const admin = getSupabaseAdmin();

  // email_confirm so the owner can use a sign-in link immediately. No password
  // is ever set: the portal is magic-link only.
  const { data, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
  });
  if (error) throw new Error(`Could not create the account: ${error.message}`);

  const { error: profileError } = await admin.from("owner_profiles").insert({
    id: data.user.id,
    email,
    full_name: fullName || null,
    phone: phone || null,
  });
  if (profileError) {
    // Don't leave an auth user with no profile behind.
    await admin.auth.admin.deleteUser(data.user.id);
    throw new Error(`Could not save the profile: ${profileError.message}`);
  }

  refresh();

  // An account nobody is told about is an account nobody uses.
  if (formData.get("invite") !== "off") {
    const sent = await sendPortalInvite({ to: email, ownerName: fullName });
    if (!sent.ok) {
      throw new Error(
        `${email} was created, but the welcome email failed: ${sent.error}. Use "Send portal invite" to try again.`,
      );
    }
  }
}

export async function addProperty(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  await assertAdmin(token);

  const { error } = await getSupabaseAdmin().from("owner_properties").insert({
    owner_id: String(formData.get("owner_id")),
    name: String(formData.get("name") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim() || null,
    address: String(formData.get("address") ?? "").trim() || null,
    hospitable_id: String(formData.get("hospitable_id") ?? "").trim() || null,
  });
  if (error) throw new Error(error.message);

  refresh();
}

/**
 * Save a month's statement.
 *
 * Only the four figures that come off a payout report are entered by hand.
 * Net rental income, the management fee and the payout are derived here so the
 * arithmetic on the owner's statement is always internally consistent and
 * always matches the published fee definition, rather than depending on
 * whoever typed the numbers.
 */
export async function saveStatement(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  await assertAdmin(token);

  const num = (key: string) => Number(formData.get(key) ?? 0) || 0;

  const gross = num("gross_revenue");
  const platformFees = num("platform_fees");
  const occupancyTaxes = num("occupancy_taxes");
  const passThrough = num("pass_through_costs");

  const netRentalIncome = gross - platformFees - occupancyTaxes;
  const managementFee = Math.round(netRentalIncome * 0.2 * 100) / 100;
  const ownerPayout =
    Math.round((netRentalIncome - managementFee - passThrough) * 100) / 100;

  const nightsBooked = num("nights_booked");
  const nightsAvailable = num("nights_available");

  const { error } = await getSupabaseAdmin()
    .from("owner_statements")
    .upsert(
      {
        property_id: String(formData.get("property_id")),
        owner_id: String(formData.get("owner_id")),
        period_start: String(formData.get("period_start")),
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
  if (error) throw new Error(error.message);

  refresh();
}

/** Publishing is what makes a statement visible to the owner. */
export async function setPublished(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  await assertAdmin(token);

  const publish = String(formData.get("publish")) === "true";
  const { error } = await getSupabaseAdmin()
    .from("owner_statements")
    .update({ published_at: publish ? new Date().toISOString() : null })
    .eq("id", String(formData.get("statement_id")));
  if (error) throw new Error(error.message);

  refresh();
}

/** Upload a document for an owner into the private bucket. */
export async function uploadDocument(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  await assertAdmin(token);

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose a file to upload.");
  }

  const ownerId = String(formData.get("owner_id"));
  const propertyId = String(formData.get("property_id") ?? "");
  const title = String(formData.get("title") ?? "").trim() || file.name;
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
  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

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
    throw new Error(error.message);
  }

  refresh();
}

/** Publishing is what makes a document visible to the owner. */
export async function setDocumentPublished(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  await assertAdmin(token);

  const publish = String(formData.get("publish")) === "true";
  const { error } = await getSupabaseAdmin()
    .from("owner_documents")
    .update({ published_at: publish ? new Date().toISOString() : null })
    .eq("id", String(formData.get("document_id")));
  if (error) throw new Error(error.message);

  refresh();
}

/** Remove a document and its file together. */
export async function deleteDocument(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  await assertAdmin(token);

  const admin = getSupabaseAdmin();
  const id = String(formData.get("document_id"));
  const { data } = await admin
    .from("owner_documents")
    .select("storage_path")
    .eq("id", id)
    .maybeSingle();

  if (data?.storage_path) {
    await admin.storage.from("owner-documents").remove([data.storage_path]);
  }
  const { error } = await admin.from("owner_documents").delete().eq("id", id);
  if (error) throw new Error(error.message);

  refresh();
}

/** Send, or re-send, the portal welcome email. */
export async function sendOwnerInvite(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  await assertAdmin(token);

  const admin = getSupabaseAdmin();
  const { data: owner } = await admin
    .from("owner_profiles")
    .select("email, full_name")
    .eq("id", String(formData.get("owner_id")))
    .single();
  if (!owner) throw new Error("Owner not found.");

  const sent = await sendPortalInvite({ to: owner.email, ownerName: owner.full_name });
  refresh();
  if (!sent.ok) throw new Error(`Could not email ${owner.email}: ${sent.error}`);
}
