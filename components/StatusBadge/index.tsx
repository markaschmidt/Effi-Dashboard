import { STATUS_LABEL } from "@/lib/labels";
import { cn } from "@/lib/cn";
import type { StatusBadgeProps } from "./types";
import { statusBadgeVariants, statusTone } from "./utils";

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={cn(statusBadgeVariants({ tone: statusTone(status) }))}>{STATUS_LABEL[status] ?? status}</span>;
}
