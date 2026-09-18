export type CaseStatus = "open" | "in_progress" | "waiting_on_resident" | "resolved";
export type IssueType = "missed_service" | "status_update" | "new_request" | "other";

export type UserProfile = {
  id: string;
  clerk_id: string | null;
  username: string;
  is_staff: boolean;
};

export type CaseRecord = {
  id: string;
  case_number: string;
  owner_id: string | null;
  resident_name: string;
  phone_number: string;
  issue_type: IssueType | string;
  description: string;
  status: CaseStatus | string;
  notes: string;
  summary: string;
  was_viewed: boolean;
  created_at: string;
  updated_at: string;
};

export type TranscriptLine = {
  id: string;
  role: "resident" | "agent" | "system" | string;
  text: string;
  created_at: string;
};

export type QaStatus = "unreviewed" | "approved" | "flagged" | string;

export type RecordingRecord = {
  id: string;
  call_id: string;
  bucket_key: string;
  kind: string;
  content_type: string;
  byte_size: number;
  duration_ms: number | null;
  status: string;
  qa_status: QaStatus;
  qa_notes: string;
  created_at: string;
  reviewed_at: string | null;
  case_id?: string;
};

export type CallRecord = {
  id: string;
  room_name: string;
  case_id: string | null;
  owner_id?: string | null;
  status: string;
  started_at: string;
  ended_at: string | null;
  transcript: TranscriptLine[];
  recordings?: RecordingRecord[];
};

export type AuditEvent = {
  id: string;
  field: string;
  old_value: string;
  new_value: string;
  source: string;
  created_at: string;
};

export type CaseDetail = CaseRecord & {
  calls: CallRecord[];
  audit: AuditEvent[];
};

export type TokenResponse = {
  server_url: string;
  participant_token: string;
  room_name: string;
  agent_name: string;
  call_id: string | null;
};

export type RealtimeEvent = {
  type: string;
  payload: Record<string, unknown>;
};
