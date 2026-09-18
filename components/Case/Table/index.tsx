"use client";

import { TextField } from "../../Field";
import { Panel } from "../../Panel";
import { LoadingState } from "../../LoadingState";
import { CaseClusterRow } from "./ClusterRow";
import { CaseStatusDropdown } from "./StatusDropdown";
import { useCaseTableState } from "./states";
import type { CaseTableProps } from "./types";

export function CaseTable({ cases, deskHref, onCaseUpdated, canReopenCases = false, loading = false }: CaseTableProps) {
  const { query, setQuery, status, setStatus, clusters } = useCaseTableState(cases);

  return (
    <Panel padding="none">
      <div className="flex flex-wrap gap-3 border-b border-ink/10 px-4 py-3">
        <TextField
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, phone, or case number"
          className="min-w-56 flex-1"
        />
        <CaseStatusDropdown value={status} onChange={setStatus} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[52rem] text-left text-sm">
          <thead className="bg-paper/80 text-xs uppercase tracking-wide text-ink/50">
            <tr>
              <th className="px-4 py-3 font-medium">Case</th>
              <th className="px-4 py-3 font-medium">Resident</th>
              <th className="px-4 py-3 font-medium">Issue</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <LoadingState variant="table" label="Loading cases" />
                </td>
              </tr>
            ) : null}
            {!loading
              ? clusters.map((cluster) => (
                  <CaseClusterRow
                    key={cluster.id}
                    cluster={cluster}
                    deskHref={deskHref}
                    onCaseUpdated={onCaseUpdated}
                    canReopenCases={canReopenCases}
                  />
                ))
              : null}
            {!loading && clusters.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-ink/50">
                  No cases match this filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
