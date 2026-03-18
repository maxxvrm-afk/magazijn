import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");

  if (!month) {
    return NextResponse.json({ error: "month is verplicht, bv 2026-05-01" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin.rpc("get_monthly_stats", {
    p_month_start: month,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stats: data?.[0] ?? null });
}
