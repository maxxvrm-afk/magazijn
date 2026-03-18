import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { monthStartIso } from "@/lib/stats";

export async function GET() {
  const monthStart = monthStartIso();

  const [{ data: dashboard, error: dashboardError }, { data: monthly, error: monthlyError }] = await Promise.all([
    supabaseAdmin.from("dashboard_stats").select("*").single(),
    supabaseAdmin.rpc("get_monthly_stats", { p_month_start: monthStart }),
  ]);

  if (dashboardError) {
    return NextResponse.json({ error: dashboardError.message }, { status: 500 });
  }

  if (monthlyError) {
    return NextResponse.json({ error: monthlyError.message }, { status: 500 });
  }

  return NextResponse.json({ dashboard, monthly: monthly?.[0] ?? null });
}
