"use client";

import { useState } from "react";
import { StatusMessage } from "@/components/common/status-message";

export function PartForm({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState({ barcode: "", partName: "", brand: "", model: "", year: "", shelf: "", cartCode: "" });
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"success" | "error" | "info">("info");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/scan/in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Opslaan mislukt");
      setTone("success");
      setMessage(`Onderdeel opgeslagen: ${json.item?.barcode || form.barcode}`);
      setForm({ barcode: "", partName: "", brand: "", model: "", year: "", shelf: "", cartCode: "" });
      onSaved?.();
    } catch (err) {
      setTone("error");
      setMessage(err instanceof Error ? err.message : "Opslaan mislukt");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <h3>Handmatig toevoegen</h3>
      <div className="grid grid-3">
        <input className="input" placeholder="Barcode" value={form.barcode} onChange={(e) => setForm({ ...form, barcode: e.target.value })} />
        <input className="input" placeholder="Onderdeel" value={form.partName} onChange={(e) => setForm({ ...form, partName: e.target.value })} />
        <input className="input" placeholder="Merk" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        <input className="input" placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
        <input className="input" placeholder="Bouwjaar" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
        <input className="input" placeholder="Vak" value={form.shelf} onChange={(e) => setForm({ ...form, shelf: e.target.value })} />
        <input className="input" placeholder="Kar code" value={form.cartCode} onChange={(e) => setForm({ ...form, cartCode: e.target.value })} />
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        <button className="button" type="button" onClick={submit} disabled={busy || !form.barcode.trim()}>
          {busy ? "Bezig..." : "Opslaan"}
        </button>
      </div>
      <div style={{ marginTop: 12 }}>
        <StatusMessage message={message} tone={tone} />
      </div>
    </div>
  );
}
