import { SignDocument } from "@/components/sign/sign-document";
import { loadSigningPage, REASONS } from "@/lib/sign/page-data";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

/** The door for an owner who is already signed in to the portal. */
export default async function PortalSignPage({
  params,
}: {
  params: Promise<{ signerId: string }>;
}) {
  const { signerId } = await params;
  const data = await loadSigningPage({ signerId });

  if (!data.ok || !data.fileUrl) {
    const r = REASONS[data.ok ? "not_found" : data.reason];
    return (
      <div className="mt-16 max-w-xl">
        <h1 className="text-3xl font-bold text-charcoal">{r.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{r.body}</p>
        <Link href="/portal" className="mt-6 inline-block font-medium text-charcoal underline underline-offset-4">
          Back to your portal
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10">
        <h1 className="text-[2rem] font-bold leading-tight tracking-tight text-charcoal sm:text-4xl">
          {data.documentTitle}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          Read it through, complete the highlighted fields, then confirm at the
          bottom. Nothing is recorded until you sign.
        </p>
      </div>
      <SignDocument
        fileUrl={data.fileUrl}
        fields={data.fields}
        otherFields={data.otherFields}
        documentTitle={data.documentTitle}
        signerName={String(data.signer.name)}
        roleLabel={String(data.signer.role_label)}
        consentText={data.consentText}
        signerId={signerId}
        redirectTo="/portal"
      />
    </>
  );
}
