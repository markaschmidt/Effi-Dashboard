import type { CaseDetail, CaseRecord, RecordingRecord, TokenResponse, UserProfile } from "./types";

export const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

function apiBase() {
  return "/api/backend";
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
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

export function getMe() {
  return request<UserProfile>("/me");
}

export function listCases(params?: { q?: string; status?: string; scope?: "all" | "mine" }) {
  const query = new URLSearchParams();
  if (params?.q) query.set("q", params.q);
  if (params?.status) query.set("status", params.status);
  if (params?.scope) query.set("scope", params.scope);
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

export async function uploadRecording(callId: string, blob: Blob, filename = "call.webm") {
  const body = new FormData();
  body.append("file", blob, filename);
  const response = await fetch(`${apiBase()}/calls/${callId}/recordings`, {
    method: "POST",
    body,
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<RecordingRecord>;
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
