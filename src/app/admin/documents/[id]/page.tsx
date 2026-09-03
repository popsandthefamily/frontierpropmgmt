import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { AdminSignInPrompt } from "@/components/admin/sign-in-prompt";
import {
  FieldEditor,
  type EditorField,
  type EditorSigner,
} from "@/components/admin/field-editor";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requestSignature, voidRequest } from "./actions";

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

  const [{ data: fields }, { data: requests }, { data: signedUrl }, { data: signers }] = await Promise.all([
    admin.from("signature_fields").select("*").eq("document_id", id).order("sort_order"),
    admin
      .from("signature_requests")
      .select("id, status, signed_at, signer_name, signed_storage_path")
      .eq("document_id", id)
      .order("created_at", { ascending: false }),
    admin.storage.from("owner-documents").createSignedUrl(doc.storage_path, 3600),
    admin
      .from("signature_signers")
      .select("id, name, email, role_label, kind, sort_order, signed_at")
      .eq("document_id", id)
      .order("sort_order"),
  ]);

  const signerList = signers ?? [];
  // Fields carry a signer id; the editor works in list positions.
  const indexOf = new Map(signerList.map((s, i) => [s.id, i]));

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
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-medium text-charcoal">
                {openRequest.status === "executed"
                  ? "Executed — every party has signed"
                  : `Out for signature — ${signerList.filter((s) => s.signed_at).length} of ${signerList.length} signed`}
              </p>
              {openRequest.status !== "executed" && (
                <form action={voidRequest}>
                  <input type="hidden" name="token" value={token ?? ""} />
                  <input type="hidden" name="request_id" value={openRequest.id} />
                  <input type="hidden" name="document_id" value={doc.id} />
                  <button type="submit" className="text-sm font-medium text-destructive underline underline-offset-4">
                    Cancel request
                  </button>
                </form>
              )}
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {signerList.map((s) => (
                <li key={s.id} className="flex flex-wrap items-center gap-3">
                  <span className="text-charcoal">
                    {s.name}
                    <span className="text-muted-foreground">
                      {" "}· {s.role_label}
                      {s.email ? ` · ${s.email}` : ""}
                    </span>
                  </span>
                  {s.signed_at ? (
                    <span className="text-sage">
                      signed {new Date(s.signed_at).toLocaleString("en-US")}
                    </span>
                  ) : (
                    <span className="text-amber-600">
                      {s.kind === "manager" ? "waiting on Frontier" : "waiting"}
                    </span>
                  )}
                  {!s.signed_at && s.kind === "manager" && (
                    <Link
                      href={`/admin/sign/${s.id}?doc=${doc.id}${token ? `&token=${encodeURIComponent(token)}` : ""}`}
                      className="rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
                    >
                      Sign as Frontier
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <form action={requestSignature} className="flex flex-wrap items-center gap-4">
            <input type="hidden" name="token" value={token ?? ""} />
            <input type="hidden" name="document_id" value={doc.id} />
            <input type="hidden" name="owner_id" value={doc.owner_id} />
            <p className="text-sm text-muted-foreground">
              {(fields ?? []).length === 0
                ? "Add signers and place their fields below, then click Save — this button stays disabled until fields are saved."
                : `${signerList.length} signer${signerList.length === 1 ? "" : "s"}, ${(fields ?? []).length} field${(fields ?? []).length === 1 ? "" : "s"}. Sending emails a signing link to anyone who isn't Frontier or a portal owner.`}
            </p>
            <button
              type="submit"
              disabled={(fields ?? []).length === 0}
              className="rounded-md bg-sage px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              Send for signature
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
            locked={Boolean(openRequest)}
            initialSigners={signerList.map((s) => ({
              id: s.id,
              name: s.name ?? "",
              email: s.email ?? "",
              role_label: s.role_label ?? "Owner",
              kind: s.kind,
            })) as EditorSigner[]}
            initialFields={(fields ?? []).map((f) => ({
              ...f,
              signer_index: indexOf.get(f.signer_id) ?? 0,
            })) as EditorField[]}
          />
        ) : (
          <p className="text-sm text-destructive">Could not open the document file.</p>
        )}
      </div>
    </div>
  );
}
