"use client";

import Link from "next/link";
import { ISSUE_LABEL, formatDate } from "@/lib/labels";
import { Button } from "../Button";
import { Panel } from "../Panel";
import { StatusBadge } from "../StatusBadge";
import { RecordingReview } from "../RecordingReview";
import { TranscriptFeed } from "../TranscriptFeed";
import { useCaseDetailState } from "./states";
import type { CaseDetailViewProps } from "./types";

const STATUS_OPTIONS = ["open", "in_progress", "waiting_on_resident", "resolved"];

export function CaseDetailView({ initial }: CaseDetailViewProps) {
  const { detail, live, saving, error, transcript, recordings, onStatus, onRecording } = useCaseDetailState(initial);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Panel className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-ink/50">{detail.case_number}</p>
            <h2 className="text-2xl font-semibold">{detail.resident_name}</h2>
            <p className="text-sm text-ink/60">{detail.phone_number}</p>
          </div>
          <StatusBadge status={detail.status} />
        </div>
        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-ink/40">Issue</dt>
            <dd>{ISSUE_LABEL[detail.issue_type] ?? detail.issue_type}</dd>
          </div>
          <div>
            <dt className="text-ink/40">Description</dt>
            <dd className="leading-relaxed">{detail.description || "No description yet."}</dd>
          </div>
          <div>
            <dt className="text-ink/40">Notes</dt>
            <dd className="leading-relaxed">{detail.notes || "No staff notes."}</dd>
          </div>
          <div>
            <dt className="text-ink/40">Call summary</dt>
            <dd className="leading-relaxed">{detail.summary || "Summary appears after the call ends."}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((status) => (
            <Button key={status} variant="outline" size="sm" disabled={saving} onClick={() => onStatus(status)}>
              {status.replaceAll("_", " ")}
            </Button>
          ))}
        </div>
        {error ? <p className="text-sm text-clay">{error}</p> : null}
        <p suppressHydrationWarning className="text-xs text-ink/40">
          Updated {formatDate(detail.updated_at)}
        </p>
      </Panel>
      <section className="space-y-5">
        <Panel tone="muted">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Live transcript</h3>
            <Link href="/call" className="text-xs text-moss hover:underline">
              Start a call
            </Link>
          </div>
          <TranscriptFeed lines={transcript} liveText={live} />
        </Panel>
        <RecordingReview recordings={recordings} onReviewed={onRecording} />
        <Panel>
          <h3 className="mb-3 font-semibold">Audit</h3>
          <ul className="space-y-2 text-sm">
            {detail.audit.map((event) => (
              <li key={event.id} className="border-b border-ink/5 pb-2 last:border-0">
                <span className="font-medium">{event.field}</span>{" "}
                <span className="text-ink/50">
                  {event.old_value || "—"} → {event.new_value || "—"}
                </span>
                <div suppressHydrationWarning className="text-xs text-ink/40">
                  {event.source} · {formatDate(event.created_at)}
                </div>
              </li>
            ))}
            {detail.audit.length === 0 ? <li className="text-ink/50">No field changes yet.</li> : null}
          </ul>
        </Panel>
      </section>
    </div>
  );
}
