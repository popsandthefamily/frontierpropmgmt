import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { SignForm, type SignField } from "@/components/portal/sign-form";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function SignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getSupabaseServer();

  // Read as the owner: row level security is what confines this to their own
  // signature request, so a guessed id yields nothing rather than someone
  // else's contract.
  const { data: req } = await supabase
    .from("signature_requests")
    .select("id, document_id, status")
    .eq("id", id)
    .maybeSingle();
  if (!req) return notFound();

  const { data: profile } = await supabase
    .from("owner_profiles")
    .select("full_name, email")
    .maybeSingle();

  const admin = getSupabaseAdmin();
  const [{ data: doc }, { data: fields }] = await Promise.all([
    admin.from("owner_documents").select("title, storage_path").eq("id", req.document_id).single(),
    admin.from("signature_fields").select("*").eq("document_id", req.document_id).order("sort_order"),
  ]);

  if (req.status === "signed") {
    return (
      <div className="mt-16 max-w-xl">
        <h1 className="text-3xl font-bold text-charcoal">Already signed</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {doc?.title} has been signed. The executed copy, with its certificate
          of completion, is in your documents.
        </p>
        <Link
          href="/portal"
          className="mt-6 inline-block font-medium text-charcoal underline underline-offset-4"
        >
          Back to your portal
        </Link>
      </div>
    );
  }

  const { data: url } = await admin.storage
    .from("owner-documents")
    .createSignedUrl(doc!.storage_path, 1800);

  // Record that it was opened. Being able to show the document was actually
  // displayed before it was signed is part of what makes the signature stick.
  await admin.from("signature_events").insert({
    request_id: req.id,
    event_type: "viewed",
  });
  if (req.status === "sent") {
    await admin.from("signature_requests").update({ status: "viewed" }).eq("id", req.id);
  }

  return (
    <>
      <div className="mt-10">
        <h1 className="text-[2rem] font-bold leading-tight tracking-tight text-charcoal sm:text-4xl">
          {doc!.title}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          Read it through, complete the highlighted fields, then confirm at the
          bottom. Take your time — nothing is recorded until you sign.
        </p>
      </div>

      {url?.signedUrl ? (
        <SignForm
          requestId={req.id}
          fileUrl={url.signedUrl}
          documentTitle={doc!.title}
          fields={(fields ?? []) as SignField[]}
          defaultName={profile?.full_name ?? ""}
        />
      ) : (
        <p className="mt-8 text-sm text-destructive">Could not open the document.</p>
      )}
    </>
  );
}
