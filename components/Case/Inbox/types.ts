import type { UserProfile } from "@/lib/types";

export type CaseInboxProps = {
  deskHref: string;
  viewer: UserProfile;
  scope?: "all" | "mine";
};
