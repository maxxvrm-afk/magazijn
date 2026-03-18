"use client";

import { useEffect, useState } from "react";

export interface MovementItem {
  id: string;
  action: string;
  scanned_value?: string | null;
  device_name?: string | null;
  user_name?: string | null;
  notes?: string | null;
  created_at: string;
}

export function useMovements() {
  const [items, setItems] = useState<MovementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/movements", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Laden mislukt");
        setItems(json.items ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Laden mislukt");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return { items, loading, error };
}
