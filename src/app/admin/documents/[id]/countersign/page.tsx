import { notFound } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/auth";
import { AdminSignInPrompt } from "@/components/admin/sign-in-prompt";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { SignForm, type SignField } from "@/components/portal/sign-form";
import { siteConfig } from "@/data/site";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function CountersignPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { id } = await params;
  const { token } = await searchParams;

  if (!(await isAdmin(token))) {
    return (
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-24">
        <AdminSignInPrompt />
      </div>
    );
  }

  const admin = getSupabaseAdmin();
  const { data: req } = await admin
    .from("signature_requests")
    .select("id, document_id, status, signer_name, signed_at, signed_storage_path")
    .eq("document_id", id)
    .neq("status", "void")
    .maybeSingle();
  const { data: doc } = await admin
    .from("owner_documents")
    .select("title")
    .eq("id", id)
    .maybeSingle();
  if (!req || !doc) return notFound();

  const back = `/admin/documents/${id}${token ? `?token=${encodeURIComponent(token)}` : ""}`;

  if (req.status !== "signed") {
    return (
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-24">
        <h1 className="text-3xl font-bold text-charcoal">
          {req.status === "executed" ? "Already executed" : "Waiting on the owner"}
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {req.status === "executed"
            ? "Both parties have signed. The executed copy is filed in the owner's documents."
            : "The owner hasn't signed yet. You can countersign as soon as they do."}
        </p>
        <Link href={back} className="mt-6 inline-block font-medium text-charcoal underline underline-offset-4">
          ← Back to the document
        </Link>
      </div>
    );
  }

  const { data: fields } = await admin
    .from("signature_fields")
    .select("*")
    .eq("document_id", id)
    .order("sort_order");

  // Countersign on top of the owner-signed copy, not the blank original.
  const { data: url } = await admin.storage
    .from("owner-documents")
    .createSignedUrl(req.signed_storage_path!, 1800);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-24">
      <Link href={back} className="text-sm font-medium text-charcoal underline-offset-4 hover:underline">
        ← Back to the document
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-charcoal">Countersign</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        {doc.title} — signed by {req.signer_name} on{" "}
        {new Date(req.signed_at!).toLocaleString("en-US")}. Complete Frontier&apos;s
        fields to execute the agreement.
      </p>

      {url?.signedUrl ? (
        <SignForm
          requestId={req.id}
          fileUrl={url.signedUrl}
          documentTitle={doc.title}
          role="manager"
          submitUrl="/api/admin/countersign"
          redirectTo={back}
          token={token ?? ""}
          defaultName={siteConfig.owner}
          fields={(fields ?? []).filter((f) => f.signer_role === "manager") as SignField[]}
        />
      ) : (
        <p className="mt-8 text-sm text-destructive">Could not open the signed document.</p>
      )}
    </div>
  );
}
