import { cva } from "class-variance-authority";

export const fieldVariants = cva(
  "rounded-lg border bg-paper px-3 py-2 text-sm outline-none transition-colors",
  {
    variants: {
      tone: {
        default: "border-ink/10 focus:border-moss",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);
