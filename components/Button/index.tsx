import { cn } from "@/lib/cn";
import { buttonVariants } from "./utils";
import type { ButtonProps } from "./types";

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
