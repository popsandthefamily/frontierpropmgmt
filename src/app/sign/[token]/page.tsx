import type { Metadata } from "next";
import { SignDocument } from "@/components/sign/sign-document";
import { loadSigningPage, REASONS } from "@/lib/sign/page-data";
import { siteConfig } from "@/data/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Sign document",
  robots: { index: false, follow: false },
};

/** The door for a signer with no account: the emailed link is the credential. */
export default async function TokenSignPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const data = await loadSigningPage({ token });

  if (!data.ok || !data.fileUrl) {
    const r = REASONS[data.ok ? "not_found" : data.reason];
    return (
      <div className="mx-auto max-w-xl px-4 pt-32 pb-24">
        <h1 className="text-3xl font-bold text-charcoal">{r.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{r.body}</p>
        <p className="mt-6 text-sm text-muted-foreground">
          Call or text {siteConfig.phone}.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-10">
      <h1 className="text-[2rem] font-bold leading-tight tracking-tight text-charcoal sm:text-4xl">
        {data.documentTitle}
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
        Hi {String(data.signer.name).split(" ")[0]} — read it through, complete the
        highlighted fields, then confirm at the bottom. Nothing is recorded until
        you sign.
      </p>
      <SignDocument
        fileUrl={data.fileUrl}
        fields={data.fields}
        otherFields={data.otherFields}
        documentTitle={data.documentTitle}
        signerName={String(data.signer.name)}
        roleLabel={String(data.signer.role_label)}
        consentText={data.consentText}
        token={token}
        redirectTo={`/sign/${token}`}
      />
    </div>
  );
}
