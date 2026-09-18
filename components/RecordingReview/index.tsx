"use client";

import { useEffect, useState } from "react";
import { recordingAudioUrl, reviewRecording } from "@/lib/api";
import { formatDate } from "@/lib/labels";
import type { RecordingRecord } from "@/lib/types";
import { Button } from "../Button";
import { Panel } from "../Panel";
import type { RecordingReviewProps } from "./types";

function RecordingPlayer({ recording }: { recording: RecordingRecord }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (recording.status !== "ready") return;
    let objectUrl = "";
    let cancelled = false;
    fetch(recordingAudioUrl(recording.id))
      .then((response) => {
        if (!response.ok) throw new Error("Audio unavailable");
        return response.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      })
      .catch(() => {
        if (!cancelled) setSrc("");
      });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [recording.id, recording.status]);

  if (recording.status !== "ready") {
    return <p className="text-sm text-ink/50">Recording is {recording.status}…</p>;
  }
  if (!src) {
    return <p className="text-sm text-ink/50">Loading audio…</p>;
  }
  return <audio className="w-full" controls preload="metadata" src={src} />;
}

export function RecordingReview({ recordings, onReviewed }: RecordingReviewProps) {
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  async function review(recording: RecordingRecord, qa_status: "approved" | "flagged") {
    setBusy(recording.id + qa_status);
    setError("");
    try {
      onReviewed(await reviewRecording(recording.id, qa_status));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save review");
    } finally {
      setBusy("");
    }
  }

  return (
    <Panel>
      <h3 className="mb-3 font-semibold">Call audio (QA)</h3>
      <p className="mb-4 text-sm text-ink/60">
        Stereo capture from the live room: resident on the left, Effi on the right. Stored in the local bucket after the
        call ends.
      </p>
      <ul className="space-y-4">
        {recordings.map((recording) => (
          <li key={recording.id} className="space-y-2 border-b border-ink/5 pb-4 last:border-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-ink/50">
              <span className="font-mono">{recording.id.slice(0, 8)}</span>
              <span suppressHydrationWarning>
                {recording.qa_status} · {formatDate(recording.created_at)}
              </span>
            </div>
            <RecordingPlayer recording={recording} />
            {recording.qa_notes ? <p className="text-sm text-ink/60">{recording.qa_notes}</p> : null}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={Boolean(busy)}
                onClick={() => void review(recording, "approved")}
              >
                {busy === recording.id + "approved" ? "Saving…" : "Approve"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={Boolean(busy)}
                onClick={() => void review(recording, "flagged")}
              >
                {busy === recording.id + "flagged" ? "Saving…" : "Flag"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {recordings.length === 0 ? <p className="text-sm text-ink/50">No recordings yet. They appear after a live call ends.</p> : null}
      {error ? <p className="mt-3 text-sm text-clay">{error}</p> : null}
    </Panel>
  );
}
