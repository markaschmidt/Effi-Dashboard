import "server-only";

import { auth } from "@clerk/nextjs/server";
import type { CaseDetail, CaseRecord, TokenResponse, UserProfile } from "./types";

function apiBase() {
  return (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
}

function serviceHeaders(): Record<string, string> {
  const key = process.env.EFFI_API_KEY;
  return key ? { "X-API-Key": key } : {};
}

async function identityHeaders(): Promise<Record<string, string>> {
  const { userId, sessionClaims } = await auth();
  const headers: Record<string, string> = { ...serviceHeaders() };
  if (userId) headers["X-Clerk-User-Id"] = userId;
  const username = typeof sessionClaims?.username === "string" ? sessionClaims.username : undefined;
  if (username) headers["X-Clerk-Username"] = username;
  return headers;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const response = await fetch(`${apiBase()}${path}`, {
    ...init,
    signal: init?.signal ?? controller.signal,
    headers: {
      "Content-Type": "application/json",
      ...(await identityHeaders()),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  }).finally(() => clearTimeout(timeout));
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export function getMe() {
  return request<UserProfile>("/me");
}

export function getCase(id: string) {
  return request<CaseDetail>(`/cases/${id}`);
}

export function listCases(params?: { q?: string; status?: string; scope?: "all" | "mine" }) {
  const query = new URLSearchParams();
  if (params?.q) query.set("q", params.q);
  if (params?.status) query.set("status", params.status);
  if (params?.scope) query.set("scope", params.scope);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return request<CaseRecord[]>(`/cases${suffix}`);
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
