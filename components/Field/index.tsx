import { cn } from "@/lib/cn";
import type { SelectFieldProps, TextFieldProps } from "./types";
import { fieldVariants } from "./utils";

export function TextField({ className, tone, ...props }: TextFieldProps) {
  return <input className={cn(fieldVariants({ tone }), className)} {...props} />;
}

export function SelectField({ className, tone, ...props }: SelectFieldProps) {
  return <select className={cn(fieldVariants({ tone }), className)} {...props} />;
}
