import type { CaseDetail, UserProfile } from "@/lib/types";

export type CaseDeskProps = {
  deskHref: string;
  title: string;
  scope: "all" | "mine";
  viewer: UserProfile;
  caseId?: string;
  detail?: CaseDetail | null;
  detailError?: string;
};
