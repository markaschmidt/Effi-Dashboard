"use client";

import Link from "next/link";
import { caseDeskHref } from "@/lib/desk";
import { ISSUE_LABEL } from "@/lib/labels";
import { TextField } from "../../Field";
import { NewCaseDot } from "../NewDot";
import { Panel } from "../../Panel";
import { StatusBadge } from "../../StatusBadge";
import { LoadingState } from "../../LoadingState";
import { CaseRowActions } from "./RowActions";
import { CaseStatusDropdown } from "./StatusDropdown";
import { useCaseTableState } from "./states";
import type { CaseTableProps } from "./types";

export function CaseTable({ cases, deskHref, onCaseUpdated, canReopenCases = false, loading = false }: CaseTableProps) {
  const { query, setQuery, status, setStatus, rows } = useCaseTableState(cases);

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
      <table className="w-full text-left text-sm">
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
          {!loading && rows.map((item) => (
            <tr key={item.id} className="border-t border-ink/5 hover:bg-paper/60">
              <td className="px-4 py-3 font-mono text-xs">
                <Link
                  href={caseDeskHref(deskHref, item.id)}
                  className="inline-flex items-center gap-2 text-moss underline-offset-2 hover:underline"
                >
                  <span className="inline-flex w-2.5 justify-center">
                    <NewCaseDot visible={!item.was_viewed} />
                  </span>
                  {item.case_number}
                </Link>
              </td>
              <td className="px-4 py-3">
                <div className="font-medium">{item.resident_name}</div>
                <div className="text-xs text-ink/50">{item.phone_number}</div>
              </td>
              <td className="px-4 py-3">
                <div>{ISSUE_LABEL[item.issue_type] ?? item.issue_type}</div>
                <div className="max-w-xs truncate text-xs text-ink/50">{item.description}</div>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={item.status} />
              </td>
              <td suppressHydrationWarning className="px-4 py-3 text-ink/60">
                {new Date(item.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                {onCaseUpdated ? (
                  <CaseRowActions item={item} onCaseUpdated={onCaseUpdated} canReopen={canReopenCases} />
                ) : null}
              </td>
            </tr>
          ))}
          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-ink/50">
                No cases match this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Panel>
  );
}
