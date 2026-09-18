export function parseCallError(err: unknown) {
  const raw = err instanceof Error ? err.message : "Could not start a call";
  try {
    const parsed = JSON.parse(raw) as { detail?: unknown };
    return typeof parsed.detail === "string" ? parsed.detail : raw;
  } catch {
    return raw;
  }
}

export function recorderMimeType() {
  if (typeof MediaRecorder === "undefined") return "";
  if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) return "audio/webm;codecs=opus";
  if (MediaRecorder.isTypeSupported("audio/webm")) return "audio/webm";
  if (MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")) return "audio/ogg;codecs=opus";
  return "";
}
