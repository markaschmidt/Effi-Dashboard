"use client";

import { CaretDown } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";
import { fieldVariants } from "../../Field/utils";
import { STATUS_FILTER_OPTIONS, statusFilterLabel } from "./constants";

type CaseStatusDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CaseStatusDropdown({ value, onChange }: CaseStatusDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className={cn(fieldVariants({ tone: "default" }), "inline-flex min-w-[11rem] items-center justify-between gap-2")}
      >
        <span>{statusFilterLabel(value)}</span>
        <CaretDown className="h-4 w-4 text-ink/45" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[11rem]">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {STATUS_FILTER_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
