"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { buttonVariants } from "../../Button/utils";

type DeskBackLinkProps = {
  href: string;
};

export function DeskBackLink({ href }: DeskBackLinkProps) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}>
      <ArrowLeft size={14} weight="bold" aria-hidden />
      Back
    </Link>
  );
}
