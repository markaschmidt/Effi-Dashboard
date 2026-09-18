import { cva } from "class-variance-authority";

export const panelVariants = cva("rounded-2xl border border-ink/10", {
  variants: {
    tone: {
      surface: "bg-white",
      muted: "bg-paper",
    },
    padding: {
      none: "",
      md: "p-5",
      lg: "p-6",
    },
  },
  defaultVariants: {
    tone: "surface",
    padding: "md",
  },
});
