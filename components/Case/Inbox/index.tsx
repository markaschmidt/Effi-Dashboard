"use client";

import Link from "next/link";
import { CaseTable } from "../Table";
import { useCaseInboxState } from "./states";
import type { CaseInboxProps } from "./types";

export function CaseInbox({ deskHref, viewer, scope = "mine" }: CaseInboxProps) {
  const { cases, error, loading, patchCase } = useCaseInboxState({ viewer, scope });

  return (
    <div className="space-y-4">
      {error ? (
        <p className="rounded-xl border border-clay/30 bg-white px-4 py-3 text-sm text-clay">
          {error} Make sure Effi-Backend is running.
        </p>
      ) : null}
      <CaseTable
        cases={cases}
        deskHref={deskHref}
        onCaseUpdated={patchCase}
        canReopenCases={viewer.is_staff}
        loading={loading}
      />
      {viewer.is_staff ? (
        <p className="text-sm text-ink/50">Newest cases appear first. Unread cases show a green dot until you open them.</p>
      ) : (
        <p className="text-sm text-ink/50">
          Voice intake lives on the{" "}
          <Link href="/call" className="text-moss hover:underline">
            resident call
          </Link>{" "}
          page. New cases appear here as soon as the agent saves them.
        </p>
      )}
    </div>
  );
}
