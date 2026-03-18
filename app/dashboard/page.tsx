"use client";

import { AppShell } from "@/components/layout/app-shell";
import { MonthlyOverview } from "@/components/dashboard/monthly-overview";
import { RecentScans } from "@/components/dashboard/recent-scans";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusMessage } from "@/components/common/status-message";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function DashboardPage() {
  const { data, loading, error } = useDashboardStats();

  return (
    <AppShell title="Dashboard">
      {loading ? <div className="card">Laden...</div> : null}
      {error ? <StatusMessage message={error} tone="error" /> : null}
      {!loading && !error ? (
        <>
          <div className="grid grid-4">
            <StatCard label="Op voorraad" value={data?.dashboard.total_stock_items ?? 0} />
            <StatCard label="Stuks op voorraad" value={data?.dashboard.total_stock_qty ?? 0} />
            <StatCard label="Mist auto-info" value={data?.dashboard.missing_vehicle_info ?? 0} />
            <StatCard label="Actieve karren" value={data?.dashboard.active_carts ?? 0} />
          </div>
          <MonthlyOverview data={data} />
          <RecentScans />
        </>
      ) : null}
    </AppShell>
  );
}
