"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { BluetoothScanHint } from "@/components/scanning/bluetooth-scan-hint";
import { CameraScanHint } from "@/components/scanning/camera-scan";
import { ScanInput } from "@/components/scanning/scan-input";

export default function BinnenkomstPage() {
  const router = useRouter();

  async function handleScan(barcode: string) {
    const res = await fetch("/api/scan/in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ barcode, deviceName: "browser", userName: "magazijn" }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Binnen scannen mislukt");
    router.refresh();
    return { message: `Binnen gescand: ${json.item?.barcode || barcode}` };
  }

  return (
    <AppShell title="Binnenkomst">
      <ScanInput label="Scan onderdeel binnen" submitLabel="Binnen scannen" onSubmit={handleScan} />
      <div className="grid grid-2">
        <CameraScanHint />
        <BluetoothScanHint />
      </div>
    </AppShell>
  );
}
