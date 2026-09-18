import { cn } from "@/lib/cn";
import type { NewCaseDotProps } from "./types";
import { newCaseDotVariants } from "./utils";

export function NewCaseDot({ visible = true, label = "New case", size = "sm" }: NewCaseDotProps) {
  if (!visible) return null;
  return (
    <span role="status" aria-label={label} title={label} className={cn(newCaseDotVariants({ size }))} />
  );
}
