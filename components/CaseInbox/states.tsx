"use client";

import { useEffect, useState } from "react";
import { listCases } from "@/lib/api";
import { useRealtime } from "@/lib/realtime";
import type { CaseRecord } from "@/lib/types";

export function useCaseInboxState(initialCases: CaseRecord[] = []) {
  const [cases, setCases] = useState<CaseRecord[]>(initialCases);
  const [error, setError] = useState("");

  async function refresh() {
    try {
      setCases(await listCases());
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load cases");
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  useRealtime((event) => {
    if (event.type === "case.created") {
      const incoming = event.payload as unknown as CaseRecord;
      setCases((current) => [incoming, ...current.filter((item) => item.id !== incoming.id)]);
    }
    if (event.type === "case.updated") {
      const incoming = event.payload as unknown as CaseRecord;
      setCases((current) => current.map((item) => (item.id === incoming.id ? { ...item, ...incoming } : item)));
    }
  });

  return { cases, error };
}
