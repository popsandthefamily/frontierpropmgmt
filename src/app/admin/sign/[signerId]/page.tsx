import Link from "next/link";
import { SignDocument } from "@/components/sign/sign-document";
import { loadSigningPage, REASONS } from "@/lib/sign/page-data";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

/** The door for Frontier, countersigning from the admin side. */
export default async function AdminSignPage({
  params,
  searchParams,
}: {
  params: Promise<{ signerId: string }>;
  searchParams: Promise<{ token?: string; doc?: string }>;
}) {
  const { signerId } = await params;
  const { token, doc } = await searchParams;
  const data = await loadSigningPage({ signerId, adminToken: token });
  const back = `/admin/documents/${doc ?? ""}${token ? `?token=${encodeURIComponent(token)}` : ""}`;

  if (!data.ok || !data.fileUrl) {
    const r = REASONS[data.ok ? "not_found" : data.reason];
    return (
      <div className="mx-auto max-w-xl px-4 pt-32 pb-24">
        <h1 className="text-3xl font-bold text-charcoal">{r.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{r.body}</p>
        <Link href={back} className="mt-6 inline-block font-medium text-charcoal underline underline-offset-4">
          Back to the document
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-10">
      <Link href={back} className="text-sm font-medium text-charcoal underline-offset-4 hover:underline">
        ← Back to the document
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-charcoal">{data.documentTitle}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Countersigning as {String(data.signer.name)} for Frontier.
      </p>
      <SignDocument
        fileUrl={data.fileUrl}
        fields={data.fields}
        otherFields={data.otherFields}
        documentTitle={data.documentTitle}
        signerName={String(data.signer.name)}
        roleLabel={String(data.signer.role_label)}
        consentText={data.consentText}
        signerId={signerId}
        adminToken={token}
        redirectTo={back}
      />
    </div>
  );
}
