import type { ReactNode } from "react";
import type { ButtonProps } from "../Button/types";

export type IconButtonProps = Omit<ButtonProps, "children"> & {
  label: string;
  children: ReactNode;
};
