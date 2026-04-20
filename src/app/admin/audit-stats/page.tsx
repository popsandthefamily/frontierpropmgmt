import type { Metadata } from "next";
import { getUsageStats } from "@/lib/audit/caps";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export const metadata: Metadata = {
  title: "Audit stats, Admin",
  robots: { index: false, follow: false },
};

export default async function AuditStatsPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const expected = process.env.ADMIN_AUTH_SECRET;

  if (!expected) {
    return (
      <Shell>
        <p className="text-destructive">
          ADMIN_AUTH_SECRET is not set. Add it to your env to access this page.
        </p>
      </Shell>
    );
  }
  if (token !== expected) {
    return (
      <Shell>
        <h1 className="text-2xl font-bold">Admin access</h1>
        <p className="mt-2 text-muted-foreground">
          Append <code>?token=YOUR_ADMIN_AUTH_SECRET</code> to this URL.
        </p>
      </Shell>
    );
  }

  let stats: Awaited<ReturnType<typeof getUsageStats>> | null = null;
  let error: string | null = null;
  try {
    stats = await getUsageStats();
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  const killOn = process.env.AUDIT_DISABLED === "true";

  return (
    <Shell>
      <h1 className="text-3xl font-bold text-charcoal">Audit stats</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Kill switch: <strong className={killOn ? "text-destructive" : "text-sage"}>{killOn ? "ON (audits disabled)" : "off"}</strong>
      </p>

      {error && (
        <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {stats && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Stat
            label="Tier 1 today"
            value={stats.tier1Today}
            cap={stats.tier1DailyCap}
          />
          <Stat label="Tier 2 today" value={stats.tier2Today} cap={stats.dailyCap} />
          <Stat
            label="Tier 2 month-to-date"
            value={stats.tier2Month}
            cap={stats.monthlyCap}
          />
          <div className="rounded-xl border bg-white p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Est. AirROI spend today
            </div>
            <div className="mt-2 text-2xl font-bold text-charcoal">
              ${(stats.tier1Today * 0.12 + stats.tier2Today * 0.61).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">Standard tier rates</div>
          </div>
        </div>
      )}

      <div className="mt-10 rounded-xl border bg-muted/40 p-5 text-sm text-muted-foreground">
        <p>To toggle the kill switch, set <code>AUDIT_DISABLED=true</code> in Vercel env and redeploy.</p>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">{children}</div>
  );
}

function Stat({ label, value, cap }: { label: string; value: number; cap: number }) {
  const pct = cap > 0 ? Math.min(100, Math.round((value / cap) * 100)) : 0;
  const warn = pct >= 80;
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-charcoal">{value}</span>
        <span className="text-sm text-muted-foreground">/ {cap}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={warn ? "h-full bg-destructive" : "h-full bg-sage"}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
