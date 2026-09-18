"use client";

import { useRoomContext } from "@livekit/components-react";
import { CallAction } from "./CallScreen";

type HangUpButtonProps = {
  onHangUp: () => void;
};

export function HangUpButton({ onHangUp }: HangUpButtonProps) {
  const room = useRoomContext();

  return (
    <CallAction
      label="End"
      tone="decline"
      onClick={() => {
        void room.disconnect();
        onHangUp();
      }}
    />
  );
}
