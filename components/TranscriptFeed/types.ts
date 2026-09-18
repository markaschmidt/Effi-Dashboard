import type { TranscriptLine } from "@/lib/types";

export type TranscriptFeedProps = {
  lines: TranscriptLine[];
  liveText?: { role: string; text: string } | null;
};
