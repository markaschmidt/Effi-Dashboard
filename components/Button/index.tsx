import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/cn";
import { buttonVariants } from "./utils";
import type { ButtonProps } from "./types";

export function Button({ className, variant, size, type = "button", loading, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading ? <Spinner className="size-4" /> : null}
      {loading && size === "icon" ? null : children}
    </button>
  );
}
