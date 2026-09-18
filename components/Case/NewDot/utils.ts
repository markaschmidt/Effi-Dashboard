import { cva, type VariantProps } from "class-variance-authority";

export const newCaseDotVariants = cva("inline-block shrink-0 rounded-full bg-moss", {
  variants: {
    size: {
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type NewCaseDotSize = NonNullable<VariantProps<typeof newCaseDotVariants>["size"]>;
