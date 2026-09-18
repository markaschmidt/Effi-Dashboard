import type { ReactNode } from "react";

export type VoiceBoothProps = {
  token: string;
  serverUrl: string;
  onDisconnected?: () => void;
  children?: ReactNode;
};
