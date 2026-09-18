"use client";

import { useMemo, useState } from "react";
import { updateCase } from "@/lib/api";
import { useRealtime } from "@/lib/realtime";
import type { CaseDetail, RecordingRecord, TranscriptLine } from "@/lib/types";

export function useCaseDetailState(initial: CaseDetail) {
  const [detail, setDetail] = useState(initial);
  const [live, setLive] = useState<{ role: string; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useRealtime((event) => {
    if (event.type === "case.updated" && event.payload.id === detail.id) {
      setDetail((current) => ({ ...current, ...event.payload }));
    }
    if (event.type === "call.transcript") {
      const payload = event.payload as {
        call_id?: string;
        case_id?: string;
        role: string;
        text: string;
        is_final: boolean;
        id?: string;
        created_at?: string;
      };
      if (payload.case_id && payload.case_id !== detail.id) return;
      if (!payload.case_id && !detail.calls.some((call) => call.id === payload.call_id)) return;
      if (!payload.is_final) {
        setLive({ role: payload.role, text: payload.text });
        return;
      }
      setLive(null);
      if (!payload.id || !payload.created_at) return;
      const line: TranscriptLine = {
        id: payload.id,
        role: payload.role,
        text: payload.text,
        created_at: payload.created_at,
      };
      setDetail((current) => ({
        ...current,
        calls: current.calls.map((call) =>
          call.id === payload.call_id ? { ...call, transcript: [...call.transcript, line] } : call,
        ),
      }));
    }
    if (event.type === "call.recording" || event.type === "recording.reviewed") {
      const recording = event.payload as RecordingRecord;
      if (recording.case_id && recording.case_id !== detail.id) return;
      setDetail((current) => upsertRecording(current, recording));
    }
  });

  const transcript = useMemo(
    () => detail.calls.flatMap((call) => call.transcript).sort((a, b) => a.created_at.localeCompare(b.created_at)),
    [detail.calls],
  );

  const recordings = useMemo(
    () =>
      detail.calls
        .flatMap((call) => call.recordings ?? [])
        .sort((a, b) => a.created_at.localeCompare(b.created_at)),
    [detail.calls],
  );

  function onRecording(recording: RecordingRecord) {
    setDetail((current) => upsertRecording(current, recording));
  }

  async function onStatus(status: string) {
    setSaving(true);
    setError("");
    try {
      const updated = await updateCase(detail.id, { status });
      setDetail((current) => ({ ...current, ...updated }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update status");
    } finally {
      setSaving(false);
    }
  }

  return { detail, live, saving, error, transcript, recordings, onStatus, onRecording };
}

function upsertRecording(detail: CaseDetail, recording: RecordingRecord): CaseDetail {
  return {
    ...detail,
    calls: detail.calls.map((call) => {
      if (call.id !== recording.call_id) return call;
      const existing = call.recordings ?? [];
      const next = existing.some((item) => item.id === recording.id)
        ? existing.map((item) => (item.id === recording.id ? recording : item))
        : [...existing, recording];
      return { ...call, recordings: next };
    }),
  };
}
