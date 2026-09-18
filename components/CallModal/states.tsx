"use client";

import { useState } from "react";
import { mintToken, startCall } from "@/lib/api";
import type { CallPhase, CallSession } from "./types";
import { parseCallError } from "./utils";

export function useCallModalState(onClose: () => void) {
  const [phase, setPhase] = useState<CallPhase>("incoming");
  const [error, setError] = useState("");
  const [session, setSession] = useState<CallSession | null>(null);

  async function answer() {
    setPhase("connecting");
    setError("");
    try {
      const call = await startCall();
      const token = await mintToken(call.room_name, call.id);
      setSession({ token: token.participant_token, serverUrl: token.server_url, callId: call.id });
      setPhase("live");
    } catch (err) {
      setError(parseCallError(err));
      setPhase("incoming");
    }
  }

  function decline() {
    onClose();
  }

  function hangUp() {
    setSession(null);
    onClose();
  }

  return { phase, error, session, answer, decline, hangUp };
}
