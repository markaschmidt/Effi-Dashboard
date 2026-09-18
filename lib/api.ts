import type { CaseDetail, CaseRecord, RecordingRecord, TokenResponse } from "./types";

export const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

function apiBase() {
  if (typeof window === "undefined") {
    return (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
  }
  return "/api/backend";
}

function serviceHeaders(): HeadersInit {
  const key = process.env.EFFI_API_KEY;
  return key ? { "X-API-Key": key } : {};
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...serviceHeaders(),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export function listCases(params?: { q?: string; status?: string }) {
  const query = new URLSearchParams();
  if (params?.q) query.set("q", params.q);
  if (params?.status) query.set("status", params.status);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return request<CaseRecord[]>(`/cases${suffix}`);
}

export function getCase(id: string) {
  return request<CaseDetail>(`/cases/${id}`);
}

export function updateCase(id: string, body: Partial<CaseRecord> & { source?: string }) {
  return request<CaseRecord>(`/cases/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...body, source: body.source ?? "dashboard" }),
  });
}

export function startCall() {
  return request<{ id: string; room_name: string }>(`/calls`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}

export function mintToken(roomName: string, callId: string) {
  return request<TokenResponse>(`/livekit/token`, {
    method: "POST",
    body: JSON.stringify({
      room_name: roomName,
      identity: `resident-${crypto.randomUUID().slice(0, 8)}`,
      call_id: callId,
    }),
  });
}

export function reviewRecording(id: string, qa_status: string, qa_notes = "") {
  return request<RecordingRecord>(`/recordings/${id}/review`, {
    method: "PATCH",
    body: JSON.stringify({ qa_status, qa_notes }),
  });
}

export function recordingAudioUrl(id: string) {
  return `/api/backend/recordings/${id}/audio`;
}

export function wsUrl(token?: string) {
  const base = `${BACKEND_ORIGIN.replace(/^http/, "ws")}/ws`;
  if (!token) return base;
  return `${base}?token=${encodeURIComponent(token)}`;
}
