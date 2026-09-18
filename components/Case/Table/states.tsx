"use client";

import { useMemo, useState } from "react";
import type { CaseRecord } from "@/lib/types";
import { filterCases } from "./utils";

export function useCaseTableState(cases: CaseRecord[]) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const rows = useMemo(() => filterCases(cases, query, status), [cases, query, status]);
  return { query, setQuery, status, setStatus, rows };
}
