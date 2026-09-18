import { BrandMark } from "../BrandMark";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/cn";
import type { LoadingStateProps } from "./types";
import { loadingStateVariants } from "./utils";

export function LoadingState({ label = "Loading", variant = "inline", className }: LoadingStateProps) {
  const spinnerSize = variant === "inline" ? "size-4" : "size-8";
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(loadingStateVariants({ variant }), className)}
    >
      <Spinner className={spinnerSize} />
      <span>{label}</span>
    </div>
  );
}

export function AppLoadingScreen({ title = "Cases", label = "Loading" }: { title?: string; label?: string }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-ink/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
          <BrandMark compact />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">{title}</h1>
        <LoadingState variant="page" label={label} className="min-h-[40vh]" />
      </main>
    </div>
  );
}
