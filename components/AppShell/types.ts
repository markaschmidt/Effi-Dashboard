import type { ReactNode } from "react";

export type AppShellProps = {
  children: ReactNode;
  title: string;
  titleLeading?: ReactNode;
  actions?: ReactNode;
  isStaff?: boolean;
  deskHref?: string;
};
