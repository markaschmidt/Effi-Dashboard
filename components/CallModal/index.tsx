"use client";

import { useEffect, useState } from "react";
import { Button } from "../Button";
import { VoiceBooth } from "../VoiceBooth";
import { AgentStatus } from "./AgentStatus";
import { CallRecorder } from "./CallRecorder";
import { CallAction, CallScreen } from "./CallScreen";
import { HangUpButton } from "./HangUpButton";
import { useCallModalState } from "./states";
import type { CallModalProps, StartCallControlProps } from "./types";

export function CallModal({ onClose }: CallModalProps) {
  const { phase, error, session, answer, decline, hangUp } = useCallModalState(onClose);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && phase === "incoming") decline();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [decline, phase]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Resident call with Effi"
        className="w-full max-w-[22rem] overflow-hidden rounded-[2rem] bg-ink shadow-2xl"
      >
        {phase === "live" && session ? (
          <VoiceBooth token={session.token} serverUrl={session.serverUrl} onDisconnected={hangUp}>
            <CallRecorder callId={session.callId} />
            <CallScreen status="On a call" extra={<AgentStatus />}>
              <div className="flex justify-center">
                <HangUpButton onHangUp={hangUp} />
              </div>
            </CallScreen>
          </VoiceBooth>
        ) : (
          <CallScreen
            status={phase === "connecting" ? "Connecting" : "Incoming call"}
            subtitle={phase === "connecting" ? "Opening a room with Effi" : "Resident services"}
            error={error}
          >
            <div className="flex justify-center gap-16">
              <CallAction label="Decline" tone="decline" disabled={phase === "connecting"} onClick={decline} />
              <CallAction
                label={phase === "connecting" ? "Connecting" : "Answer"}
                tone="answer"
                disabled={phase === "connecting"}
                onClick={() => void answer()}
              />
            </div>
          </CallScreen>
        )}
      </div>
    </div>
  );
}

export function StartCallControl({ label = "Start resident call" }: StartCallControlProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        {label}
      </Button>
      {open ? <CallModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}
