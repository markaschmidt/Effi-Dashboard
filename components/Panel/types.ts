import type { HTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { panelVariants } from "./utils";

export type PanelProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof panelVariants> & {
    children: ReactNode;
  };
