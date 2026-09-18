import { cn } from "@/lib/cn";
import type { PanelProps } from "./types";
import { panelVariants } from "./utils";

export function Panel({ className, tone, padding, ...props }: PanelProps) {
  return <div className={cn(panelVariants({ tone, padding }), className)} {...props} />;
}
