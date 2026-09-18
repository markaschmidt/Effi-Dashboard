"use client";

import {
  BarVisualizer,
  LiveKitRoom,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
  useVoiceAssistant,
} from "@livekit/components-react";
import "@livekit/components-styles";
import type { VoiceBoothProps } from "./types";

function AssistantPanel() {
  const { state, audioTrack } = useVoiceAssistant();
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-ink px-6 py-10 text-paper">
        <p className="text-xs uppercase tracking-[0.25em] text-paper/50">Live with Effi</p>
        <p className="mt-2 text-lg">
          {state === "listening"
            ? "Listening"
            : state === "thinking"
              ? "Thinking"
              : state === "speaking"
                ? "Speaking"
                : "Ready"}
        </p>
        <div className="mt-6 h-24">
          <BarVisualizer state={state} barCount={18} trackRef={audioTrack} className="h-full" />
        </div>
      </div>
      <VoiceAssistantControlBar />
    </div>
  );
}

export function VoiceBooth({ token, serverUrl }: VoiceBoothProps) {
  return (
    <LiveKitRoom token={token} serverUrl={serverUrl} connect audio video={false} className="lk-room-container">
      <RoomAudioRenderer />
      <AssistantPanel />
    </LiveKitRoom>
  );
}
