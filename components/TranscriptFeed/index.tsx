"use client";

import { formatTime } from "@/lib/labels";
import type { TranscriptFeedProps } from "./types";

export function TranscriptFeed({ lines, liveText }: TranscriptFeedProps) {
  return (
    <ol className="space-y-3">
      {lines.map((line) => (
        <li key={line.id} className={line.role === "resident" ? "pl-0" : "pl-6"}>
          <p className="text-[11px] uppercase tracking-wide text-ink/40">
            {line.role} · {formatTime(line.created_at)}
          </p>
          <p className="rounded-xl bg-white px-3 py-2 text-sm leading-relaxed shadow-sm">{line.text}</p>
        </li>
      ))}
      {liveText?.text ? (
        <li className="opacity-70">
          <p className="text-[11px] uppercase tracking-wide text-ink/40">{liveText.role} · speaking</p>
          <p className="rounded-xl border border-dashed border-ink/20 px-3 py-2 text-sm">{liveText.text}</p>
        </li>
      ) : null}
      {lines.length === 0 && !liveText?.text ? (
        <li className="text-sm text-ink/50">Transcript will appear here during a live call.</li>
      ) : null}
    </ol>
  );
}
