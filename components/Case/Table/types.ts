import type { CaseRecord } from "@/lib/types";

export type CaseTableProps = {
  cases: CaseRecord[];
  deskHref: string;
  onCaseUpdated?: (item: CaseRecord) => void;
  /** Staff/admin desk — allows re-opening resolved cases from the row menu. */
  canReopenCases?: boolean;
  loading?: boolean;
};
