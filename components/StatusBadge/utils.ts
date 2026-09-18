import { cva, type VariantProps } from "class-variance-authority";

export const statusBadgeVariants = cva("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", {
  variants: {
    tone: {
      open: "bg-sky-100 text-sky-900",
      in_progress: "bg-amber-100 text-amber-900",
      waiting_on_resident: "bg-violet-100 text-violet-900",
      resolved: "bg-emerald-100 text-emerald-900",
      unknown: "bg-stone-200 text-stone-800",
    },
  },
  defaultVariants: {
    tone: "unknown",
  },
});

export type StatusTone = NonNullable<VariantProps<typeof statusBadgeVariants>["tone"]>;

const TONES = new Set<StatusTone>(["open", "in_progress", "waiting_on_resident", "resolved"]);

export function statusTone(status: string): StatusTone {
  return TONES.has(status as StatusTone) ? (status as StatusTone) : "unknown";
}
