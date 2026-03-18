import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { barcode, partName, brand, model, year, plate, shelf, cartCode, deviceName, userName } = body;

    if (!barcode) {
      return NextResponse.json({ error: "Barcode is verplicht" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.rpc("scan_part_in", {
      p_barcode: barcode,
      p_part_name: partName || null,
      p_brand: brand || null,
      p_model: model || null,
      p_year: year ? Number(year) : null,
      p_plate: plate || null,
      p_shelf: shelf || null,
      p_cart_code: cartCode || null,
      p_device_name: deviceName || "browser",
      p_user_name: userName || "onbekend",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, item: data });
  } catch {
    return NextResponse.json({ error: "Scan-in mislukt" }, { status: 500 });
  }
}
