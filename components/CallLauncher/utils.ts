export function parseCallError(err: unknown) {
  const raw = err instanceof Error ? err.message : "Could not start a call";
  try {
    const parsed = JSON.parse(raw) as { detail?: unknown };
    return typeof parsed.detail === "string" ? parsed.detail : raw;
  } catch {
    return raw;
  }
}
