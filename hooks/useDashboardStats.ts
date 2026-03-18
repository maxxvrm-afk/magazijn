"use client";

import { useEffect, useState } from "react";
import { OverviewStats } from "@/types/stats";

export function useDashboardStats() {
  const [data, setData] = useState<OverviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        const res = await fetch("/api/stats/overview", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Dashboard laden mislukt");
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Dashboard laden mislukt");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return { data, loading, error };
}
