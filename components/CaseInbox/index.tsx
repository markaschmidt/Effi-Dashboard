"use client";

import Link from "next/link";
import { CaseTable } from "../CaseTable";
import { useCaseInboxState } from "./states";
import type { CaseInboxProps } from "./types";

export function CaseInbox({ initialCases }: CaseInboxProps) {
  const { cases, error } = useCaseInboxState(initialCases);

  return (
    <div className="space-y-4">
      {error ? (
        <p className="rounded-xl border border-clay/30 bg-white px-4 py-3 text-sm text-clay">
          {error} Make sure Effi-Backend is running.
        </p>
      ) : null}
      <CaseTable cases={cases} />
      <p className="text-sm text-ink/50">
        Voice intake lives on the{" "}
        <Link href="/call" className="text-moss hover:underline">
          resident call
        </Link>{" "}
        page. New cases appear here as soon as the agent saves them.
      </p>
    </div>
  );
}
