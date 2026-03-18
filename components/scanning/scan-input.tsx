"use client";

import { FormEvent, useState } from "react";
import { StatusMessage } from "@/components/common/status-message";

export function ScanInput({
  label,
  submitLabel,
  onSubmit,
}: {
  label: string;
  submitLabel: string;
  onSubmit: (barcode: string) => Promise<{ message?: string } | void> | { message?: string } | void;
}) {
  const [barcode, setBarcode] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"success" | "error" | "info">("info");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!barcode.trim()) return;
    setBusy(true);
    setMessage("");
    try {
      const result = await onSubmit(barcode.trim());
      setTone("success");
      setMessage(result?.message || `Verwerkt: ${barcode.trim()}`);
      setBarcode("");
    } catch (err) {
      setTone("error");
      setMessage(err instanceof Error ? err.message : "Scannen mislukt");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{label}</h3>
      <div className="row">
        <input className="input" value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Scan barcode" autoFocus />
        <button className="button" type="submit" disabled={busy}>{busy ? "Bezig..." : submitLabel}</button>
      </div>
      <div style={{ marginTop: 12 }}>
        <StatusMessage message={message} tone={tone} />
      </div>
    </form>
  );
}
