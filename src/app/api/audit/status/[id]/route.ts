import { NextRequest } from "next/server";
import { getReport } from "@/lib/audit/report-store";
import { json } from "@/lib/audit/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) return json({ status: "not_found" }, 404);
  return json({ status: "ready", reportId: report.id });
}
