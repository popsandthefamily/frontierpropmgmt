import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { AdminSignInPrompt } from "@/components/admin/sign-in-prompt";
import { FieldEditor, type EditorField } from "@/components/admin/field-editor";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requestSignature } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Document fields, Admin",
  robots: { index: false, follow: false },
};

export default async function DocumentFieldsPage({
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
  const { data: doc } = await admin
    .from("owner_documents")
    .select("id, title, storage_path, owner_id, owner_profiles(email, full_name)")
    .eq("id", id)
    .maybeSingle();
  if (!doc) return notFound();

  const [{ data: fields }, { data: requests }, { data: signedUrl }] = await Promise.all([
    admin.from("signature_fields").select("*").eq("document_id", id).order("sort_order"),
    admin
      .from("signature_requests")
      .select("id, status, signed_at, signer_name, signed_storage_path")
      .eq("document_id", id)
      .order("created_at", { ascending: false }),
    admin.storage.from("owner-documents").createSignedUrl(doc.storage_path, 3600),
  ]);

  const owner = doc.owner_profiles as unknown as { email: string; full_name: string | null } | null;
  const openRequest = (requests ?? []).find((r) => r.status !== "void");

  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-24">
      <Link
        href={`/admin/owners${token ? `?token=${encodeURIComponent(token)}` : ""}`}
        className="text-sm font-medium text-charcoal underline-offset-4 hover:underline"
      >
        ← Owners
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-charcoal">{doc.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        For {owner?.full_name || owner?.email}
      </p>

      <section className="mt-6 border-y border-border py-4">
        {openRequest ? (
          <p className="text-sm">
            <span className="font-medium text-charcoal">
              Signature request: {openRequest.status}
            </span>
            {openRequest.signed_at && (
              <span className="text-muted-foreground">
                {" "}· signed by {openRequest.signer_name} on{" "}
                {new Date(openRequest.signed_at).toLocaleString("en-US")}
              </span>
            )}
          </p>
        ) : (
          <form action={requestSignature} className="flex flex-wrap items-center gap-4">
            <input type="hidden" name="token" value={token ?? ""} />
            <input type="hidden" name="document_id" value={doc.id} />
            <input type="hidden" name="owner_id" value={doc.owner_id} />
            <p className="text-sm text-muted-foreground">
              Place the fields below, save them, then request the signature.
            </p>
            <button
              type="submit"
              disabled={(fields ?? []).length === 0}
              className="rounded-md bg-sage px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              Request signature
            </button>
          </form>
        )}
      </section>

      <div className="mt-8">
        {signedUrl?.signedUrl ? (
          <FieldEditor
            documentId={doc.id}
            fileUrl={signedUrl.signedUrl}
            token={token ?? ""}
            initialFields={(fields ?? []) as EditorField[]}
          />
        ) : (
          <p className="text-sm text-destructive">Could not open the document file.</p>
        )}
      </div>
    </div>
  );
}
