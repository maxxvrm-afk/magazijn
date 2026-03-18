"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PartLabelPreview } from "@/components/parts/part-label-preview";
import { PartForm } from "@/components/parts/part-form";
import { PartsTable } from "@/components/parts/parts-table";
import { StatusMessage } from "@/components/common/status-message";
import { useParts } from "@/hooks/useParts";
import { useState } from "react";

export default function VoorraadPage() {
  const [search, setSearch] = useState("");
  const { items, loading, error, refresh } = useParts(search);

  return (
    <AppShell title="Voorraad">
      <div className="card">
        <div className="row">
          <input className="input" placeholder="Zoek op barcode, onderdeel, merk of model" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="button secondary" type="button" onClick={() => void refresh()}>
            Verversen
          </button>
        </div>
      </div>
      <PartForm onSaved={() => void refresh()} />
      <PartLabelPreview />
      {error ? <StatusMessage message={error} tone="error" /> : null}
      {loading ? <div className="card">Laden...</div> : <PartsTable items={items} />}
    </AppShell>
  );
}
