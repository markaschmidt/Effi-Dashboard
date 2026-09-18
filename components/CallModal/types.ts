export type CallPhase = "incoming" | "connecting" | "live";

export type CallSession = {
  token: string;
  serverUrl: string;
  callId: string;
};

export type CallModalProps = {
  onClose: () => void;
};

export type StartCallControlProps = {
  label?: string;
};
