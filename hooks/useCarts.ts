"use client";

import { useEffect, useState } from "react";
import { Cart } from "@/types/cart";

export function useCarts() {
  const [items, setItems] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/carts");
      const json = await res.json();
      setItems(json.items ?? []);
      setLoading(false);
    }

    void load();
  }, []);

  return { items, loading };
}
