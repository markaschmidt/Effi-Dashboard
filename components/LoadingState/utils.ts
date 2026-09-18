import { cva, type VariantProps } from "class-variance-authority";

export const loadingStateVariants = cva("flex items-center justify-center gap-3 text-sm text-ink/60", {
  variants: {
    variant: {
      inline: "py-6",
      table: "min-h-48 py-12",
      page: "min-h-[50vh] flex-col",
      overlay: "fixed inset-0 z-50 flex-col bg-paper/85 backdrop-blur-sm",
    },
  },
  defaultVariants: {
    variant: "inline",
  },
});

export type LoadingStateVariant = NonNullable<VariantProps<typeof loadingStateVariants>["variant"]>;
