"use client";

import { useState } from "react";
import { mintToken, startCall } from "@/lib/api";
import type { CallSession } from "./types";
import { parseCallError } from "./utils";

export function useCallLauncherState() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState<CallSession | null>(null);

  async function begin() {
    setBusy(true);
    setError("");
    try {
      const call = await startCall();
      const token = await mintToken(call.room_name, call.id);
      setSession({ token: token.participant_token, serverUrl: token.server_url, callId: call.id });
    } catch (err) {
      setError(parseCallError(err));
    } finally {
      setBusy(false);
    }
  }

  return { error, busy, session, begin };
}
