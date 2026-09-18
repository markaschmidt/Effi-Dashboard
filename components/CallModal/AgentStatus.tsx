"use client";

import { useVoiceAssistant } from "@livekit/components-react";

export function AgentStatus() {
  const { state } = useVoiceAssistant();
  const label =
    state === "listening"
      ? "Listening"
      : state === "thinking"
        ? "Thinking"
        : state === "speaking"
          ? "Speaking"
          : "Connected";

  return <p className="text-sm text-paper/55">{label}</p>;
}
