"use client";

import { useCallback, useEffect, useState } from "react";
import { Part } from "@/types/part";

export function useParts(search = "", status = "") {
  const [items, setItems] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status) params.set("status", status);

      const query = params.toString();
      const res = await fetch(`/api/parts${query ? `?${query}` : ""}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Voorraad laden mislukt");
      setItems(json.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Voorraad laden mislukt");
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    void load();
  }, [load]);

  return { items, loading, error, refresh: load };
}
