"use client";

import { StartCallControl } from "../CallModal";
import { Panel } from "../Panel";

export function CallLauncher() {
  return (
    <Panel padding="lg" className="max-w-xl space-y-4">
      <p className="leading-relaxed text-ink/80">
        This is the resident side of the demo. Answer the incoming call to open a LiveKit room, talk with Effi, and
        save a case. When you hang up, the recording is stored so staff can review it.
      </p>
      <StartCallControl />
    </Panel>
  );
}
