import Link from "next/link";
import { cn } from "@/lib/cn";
import type { BrandMarkProps } from "./types";

export function BrandMark({ href = "/", compact = false }: BrandMarkProps) {
  return (
    <Link href={href} className={cn("tracking-tight text-ink", compact ? "text-base font-semibold" : "text-lg font-semibold")}>
      EffiGov Concierge
    </Link>
  );
}
