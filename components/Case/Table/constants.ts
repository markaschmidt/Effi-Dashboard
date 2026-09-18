import { STATUS_LABEL } from "@/lib/labels";

export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All statuses" },
  ...Object.entries(STATUS_LABEL).map(([value, label]) => ({ value, label })),
];

export function statusFilterLabel(value: string) {
  if (value === "all") return "All statuses";
  return STATUS_LABEL[value] ?? value;
}

export function isCaseClosed(status: string) {
  return status === "resolved";
}
