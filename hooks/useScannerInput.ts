"use client";

import { useEffect } from "react";

export function useScannerInput(onScan: (value: string) => void) {
  useEffect(() => {
    let buffer = "";
    let timeout: ReturnType<typeof setTimeout> | undefined;

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Enter") {
        if (buffer.trim()) onScan(buffer.trim());
        buffer = "";
        return;
      }

      if (event.key.length === 1) {
        buffer += event.key;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          buffer = "";
        }, 100);
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onScan]);
}
