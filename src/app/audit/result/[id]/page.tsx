import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReport } from "@/lib/audit/report-store";
import { ReportView } from "@/components/audit/report-view";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let leak = "";
  try {
    const report = await getReport(id);
    if (report) {
      leak = `$${report.leaks.revenueLeak.toLocaleString()} gap, `;
    }
  } catch {
    // ignore
  }
  return {
    title: `${leak}Your Frontier Airbnb Audit`,
    description:
      "Frontier audit report: see the revenue gap between your Airbnb listing and comparable top-performing properties in your market.",
    robots: { index: false, follow: false },
    alternates: { canonical: `https://rentwithfrontier.com/audit/result/${id}` },
  };
}

export default async function AuditResultPage({ params }: Props) {
  const { id } = await params;
  let report = null;
  try {
    report = await getReport(id);
  } catch (err) {
    console.error("[audit/result] fetch failed", err);
  }
  if (!report) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentwithfrontier.com";

  return (
    <div className="bg-cream/40">
      <ReportView report={report} siteUrl={siteUrl} />
    </div>
  );
}
