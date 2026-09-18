import { getCase, getMe } from "./api-server";
import { firstSearchParam } from "./desk";
import type { CaseDetail } from "./types";

export type DeskSearch = { caseID?: string | string[] };

export async function loadDesk(searchParams: Promise<DeskSearch> | DeskSearch) {
  const params = await searchParams;
  const caseId = firstSearchParam(params.caseID);
  const viewer = await getMe();
  let detail: CaseDetail | null = null;
  let detailError = "";
  if (caseId) {
    try {
      detail = await getCase(caseId);
    } catch (err) {
      detailError = err instanceof Error ? err.message : "Case could not be loaded";
    }
  }
  return { viewer, caseId, detail, detailError };
}
