import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const { partId, printerName } = body;

  if (!partId) {
    return NextResponse.json({ error: "partId is verplicht" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("print_jobs").insert({
    job_type: "label",
    part_id: partId,
    printer_name: printerName || "browser_print",
    printed_by: "webapp",
    copies: 1,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
