"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { BluetoothScanHint } from "@/components/scanning/bluetooth-scan-hint";
import { ScanInput } from "@/components/scanning/scan-input";

export default function UitgiftePage() {
  const router = useRouter();

  async function handleScan(barcode: string) {
    const res = await fetch("/api/scan/out", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode, deviceName: "browser", userName: "magazijn" }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Uit scannen mislukt");
    router.refresh();
    return { message: `Uit gescand: ${json.item?.barcode || barcode}` };
  }

  return (
    <AppShell title="Uitgifte">
      <ScanInput label="Scan onderdeel uit magazijn" submitLabel="Uit scannen" onSubmit={handleScan} />
      <BluetoothScanHint />
    </AppShell>
  );
}
