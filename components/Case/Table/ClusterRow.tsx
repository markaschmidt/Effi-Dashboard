"use client";

import { CaretDown } from "@phosphor-icons/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { caseDeskHref } from "@/lib/desk";
import { ISSUE_LABEL } from "@/lib/labels";
import { NewCaseDot } from "../NewDot";
import { StatusBadge } from "../../StatusBadge";
import { CaseRowActions } from "./RowActions";
import type { CaseCluster, CaseTableProps } from "./types";

type ClusterRowProps = Pick<
  CaseTableProps,
  "deskHref" | "onCaseUpdated" | "canReopenCases"
> & {
  cluster: CaseCluster;
};

export function CaseClusterRow({
  cluster,
  deskHref,
  onCaseUpdated,
  canReopenCases = false,
}: ClusterRowProps) {
  const [expanded, setExpanded] = useState(false);
  const primary = cluster.cases[0];
  const linked = cluster.cases.length > 1;
  const panelId = `case-cluster-${primary.id}`;

  return (
    <Fragment>
      <tr className="border-t border-ink/5 hover:bg-paper/60">
        <td className="px-4 py-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            {linked ? (
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                aria-label={`${expanded ? "Collapse" : "Expand"} ${cluster.cases.length} cases for ${primary.phone_number}`}
                onClick={() => setExpanded((current) => !current)}
                className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-ink/55 hover:bg-ink/5 hover:text-moss"
              >
                <CaretDown
                  size={16}
                  weight="bold"
                  className={expanded ? "rotate-180 transition-transform" : "transition-transform"}
                />
              </button>
            ) : (
              <span className="inline-flex size-7" />
            )}
            <Link
              href={caseDeskHref(deskHref, primary.id)}
              className="inline-flex items-center gap-2 text-moss underline-offset-2 hover:underline"
            >
              <span className="inline-flex w-2.5 justify-center">
                <NewCaseDot visible={cluster.cases.some((item) => !item.was_viewed)} />
              </span>
              {primary.case_number}
            </Link>
            {linked ? (
              <span className="whitespace-nowrap rounded-full bg-moss/10 px-2 py-1 font-sans text-[11px] text-moss">
                {cluster.cases.length} linked
              </span>
            ) : null}
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="font-medium">{primary.resident_name}</div>
          <div className="text-xs text-ink/50">{primary.phone_number}</div>
        </td>
        <td className="px-4 py-3">
          <div>{ISSUE_LABEL[primary.issue_type] ?? primary.issue_type}</div>
          <div className="max-w-xs truncate text-xs text-ink/50">{primary.description}</div>
        </td>
        <td className="px-4 py-3">
          <StatusBadge status={primary.status} />
        </td>
        <td suppressHydrationWarning className="px-4 py-3 text-ink/60">
          {new Date(primary.created_at).toLocaleString()}
        </td>
        <td className="px-4 py-3 text-right">
          {onCaseUpdated ? (
            <CaseRowActions
              item={primary}
              onCaseUpdated={onCaseUpdated}
              canReopen={canReopenCases}
            />
          ) : null}
        </td>
      </tr>
      {linked && expanded ? (
        <tr id={panelId} className="border-t border-moss/10 bg-moss/[0.035]">
          <td colSpan={6} className="px-5 py-4">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <div>
                <p className="font-medium">Cases from {primary.phone_number}</p>
                <p className="text-xs text-ink/50">
                  Linked by phone number within the same 24-hour window
                </p>
              </div>
              <span className="text-xs text-ink/45">{cluster.cases.length} cases</span>
            </div>
            <div className="grid gap-3">
              {cluster.cases.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-3 rounded-xl border border-ink/10 bg-white p-4 sm:grid-cols-[8rem_1fr_auto]"
                >
                  <div>
                    <Link
                      href={caseDeskHref(deskHref, item.id)}
                      className="inline-flex items-center gap-2 font-mono text-xs text-moss hover:underline"
                    >
                      <NewCaseDot visible={!item.was_viewed} />
                      {item.case_number}
                    </Link>
                    <p suppressHydrationWarning className="mt-1 text-xs text-ink/45">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{item.resident_name}</span>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="mt-1 text-sm">
                      {ISSUE_LABEL[item.issue_type] ?? item.issue_type}: {item.description}
                    </p>
                    {item.notes ? (
                      <p className="mt-1 text-xs text-ink/55">Notes: {item.notes}</p>
                    ) : null}
                  </div>
                  {onCaseUpdated ? (
                    <CaseRowActions
                      item={item}
                      onCaseUpdated={onCaseUpdated}
                      canReopen={canReopenCases}
                    />
                  ) : null}
                </article>
              ))}
            </div>
          </td>
        </tr>
      ) : null}
    </Fragment>
  );
}
