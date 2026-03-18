"use client";

import { AppShell } from "@/components/layout/app-shell";
import { CartsTable } from "@/components/carts/carts-table";
import { useCarts } from "@/hooks/useCarts";

export default function KarrenPage() {
  const { items, loading } = useCarts();

  return (
    <AppShell title="Karren">
      {loading ? <div className="card">Laden...</div> : <CartsTable items={items} />}
    </AppShell>
  );
}
