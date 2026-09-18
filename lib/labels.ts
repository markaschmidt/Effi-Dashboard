export const STATUS_LABEL: Record<string, string> = {
  open: "Open",
  in_progress: "In progress",
  waiting_on_resident: "Waiting on resident",
  resolved: "Resolved",
};

export const ISSUE_LABEL: Record<string, string> = {
  missed_service: "Missed service",
  status_update: "Status update",
  new_request: "New request",
  other: "Other",
};

export function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
