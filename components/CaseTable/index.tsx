"use client";

import Link from "next/link";
import { ISSUE_LABEL } from "@/lib/labels";
import { SelectField, TextField } from "../Field";
import { Panel } from "../Panel";
import { StatusBadge } from "../StatusBadge";
import { useCaseTableState } from "./states";
import type { CaseTableProps } from "./types";

export function CaseTable({ cases }: CaseTableProps) {
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
        <SelectField value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">All statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="waiting_on_resident">Waiting on resident</option>
          <option value="resolved">Resolved</option>
        </SelectField>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-paper/80 text-xs uppercase tracking-wide text-ink/50">
          <tr>
            <th className="px-4 py-3 font-medium">Case</th>
            <th className="px-4 py-3 font-medium">Resident</th>
            <th className="px-4 py-3 font-medium">Issue</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => (
            <tr key={item.id} className="border-t border-ink/5 hover:bg-paper/60">
              <td className="px-4 py-3 font-mono text-xs">
                <Link href={`/cases/${item.id}`} className="text-moss underline-offset-2 hover:underline">
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
                {new Date(item.updated_at).toLocaleString()}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center text-ink/50">
                No cases match this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Panel>
  );
}
