import { NextResponse } from "next/server";
import { recognizeVehicleHeuristic } from "@/lib/vehicle-recognition";

export async function POST(req: Request) {
  const body = await req.json();
  const { barcode, text, ocrText, photoText } = body;
  const raw = [barcode, text, ocrText, photoText].filter(Boolean).join(" ").trim();
  return NextResponse.json(recognizeVehicleHeuristic(raw));
}
