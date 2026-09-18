"use client";

import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import type { VoiceBoothProps } from "./types";

export function VoiceBooth({ token, serverUrl, onDisconnected, children }: VoiceBoothProps) {
  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect
      audio
      video={false}
      onDisconnected={onDisconnected}
      className="contents"
    >
      <RoomAudioRenderer />
      {children}
    </LiveKitRoom>
  );
}
