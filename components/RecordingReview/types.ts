import type { RecordingRecord } from "@/lib/types";

export type RecordingReviewProps = {
  recordings: RecordingRecord[];
  onReviewed: (recording: RecordingRecord) => void;
};
