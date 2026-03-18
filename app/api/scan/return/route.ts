import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { barcode, shelf, deviceName, userName } = body;

    if (!barcode) {
      return NextResponse.json({ error: "Barcode is verplicht" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.rpc("return_part_to_stock", {
      p_barcode: barcode,
      p_shelf: shelf || null,
      p_device_name: deviceName || "browser",
      p_user_name: userName || "onbekend",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, item: data });
  } catch {
    return NextResponse.json({ error: "Return scan mislukt" }, { status: 500 });
  }
}
