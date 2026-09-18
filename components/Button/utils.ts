import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-ink/90",
        moss: "bg-moss text-white hover:bg-moss/90",
        ghost: "text-ink/70 hover:bg-ink/5 hover:text-ink",
        outline: "border border-ink/10 bg-white hover:border-moss hover:text-moss",
      },
      size: {
        sm: "rounded-full px-3 py-1.5 text-xs",
        md: "rounded-full px-4 py-2 text-sm",
        icon: "rounded-full p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
