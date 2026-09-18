"use client";

import { useEffect, useState } from "react";
import { listCases } from "@/lib/api";
import { useRealtime } from "@/lib/realtime";
import type { CaseRecord } from "@/lib/types";
import { sortCasesByRecent } from "../Table/utils";
import type { CaseInboxProps } from "./types";

export function useCaseInboxState({ viewer, scope = "mine" }: Pick<CaseInboxProps, "viewer" | "scope">) {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      setCases(sortCasesByRecent(await listCases({ scope })));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load cases");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, [scope]);

  useRealtime((event) => {
    if (event.type !== "case.created" && event.type !== "case.updated") return;
    const incoming = event.payload as unknown as CaseRecord;
    if (scope !== "all" && incoming.owner_id !== viewer.id) return;
    if (event.type === "case.created") {
      setCases((current) => sortCasesByRecent([incoming, ...current.filter((item) => item.id !== incoming.id)]));
      return;
    }
    setCases((current) => current.map((item) => (item.id === incoming.id ? { ...item, ...incoming } : item)));
  });

  function patchCase(updated: CaseRecord) {
    setCases((current) => current.map((item) => (item.id === updated.id ? { ...item, ...updated } : item)));
  }

  return { cases, error, loading, patchCase };
}
