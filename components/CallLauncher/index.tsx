"use client";

import { Button } from "../Button";
import { Panel } from "../Panel";
import { VoiceBooth } from "../VoiceBooth";
import { useCallLauncherState } from "./states";

export function CallLauncher() {
  const { error, busy, session, begin } = useCallLauncherState();

  if (session) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-ink/60">
          Call {session.callId.slice(0, 8)} is live. Keep the cases inbox open in another tab to watch the ticket update.
        </p>
        <VoiceBooth token={session.token} serverUrl={session.serverUrl} />
      </div>
    );
  }

  return (
    <Panel padding="lg" className="max-w-xl space-y-4">
      <p className="leading-relaxed text-ink/80">
        This page is the resident side of the demo. It opens a LiveKit room, dispatches the Effi voice agent, and streams the
        conversation into the backend.
      </p>
      <Button variant="moss" onClick={() => void begin()} disabled={busy}>
        {busy ? "Connecting…" : "Start resident call"}
      </Button>
      {error ? <p className="text-sm text-clay">{error}</p> : null}
    </Panel>
  );
}
