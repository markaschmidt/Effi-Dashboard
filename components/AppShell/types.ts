import type { ReactNode } from "react";

export type AppShellProps = {
  children: ReactNode;
  title: string;
  actions?: ReactNode;
};
