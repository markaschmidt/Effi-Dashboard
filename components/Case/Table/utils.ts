import type { CaseRecord } from "@/lib/types";
import type { CaseCluster } from "./types";

const CLUSTER_WINDOW_MS = 24 * 60 * 60 * 1000;

export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function sortCasesByRecent(cases: CaseRecord[]) {
  return [...cases].sort((left, right) => right.created_at.localeCompare(left.created_at));
}

function matchesFilters(item: CaseRecord, needle: string, status: string) {
  const haystack =
    `${item.case_number} ${item.resident_name} ${item.phone_number} ${item.description}`.toLowerCase();
  return haystack.includes(needle) && (status === "all" || item.status === status);
}

export function clusterCases(cases: CaseRecord[], query: string, status: string): CaseCluster[] {
  const needle = query.toLowerCase();
  const byPhone = new Map<string, CaseRecord[]>();

  for (const item of cases) {
    const phone = normalizePhone(item.phone_number);
    const phoneKey = phone || `case:${item.id}`;
    const current = byPhone.get(phoneKey) ?? [];
    current.push(item);
    byPhone.set(phoneKey, current);
  }

  const clusters: CaseCluster[] = [];
  for (const [phoneKey, phoneCases] of byPhone) {
    const recent = sortCasesByRecent(phoneCases);
    const phone = normalizePhone(recent[0].phone_number);
    let cluster: CaseRecord[] = [];
    let newestAt = 0;

    const commit = () => {
      if (cluster.length === 0 || !cluster.some((item) => matchesFilters(item, needle, status))) return;
      clusters.push({
        id: `${phoneKey}-${cluster[0].created_at}`,
        phone,
        cases: cluster,
      });
    };

    for (const item of recent) {
      const createdAt = new Date(item.created_at).getTime();
      if (cluster.length === 0) {
        cluster = [item];
        newestAt = createdAt;
      } else if (newestAt - createdAt <= CLUSTER_WINDOW_MS) {
        cluster.push(item);
      } else {
        commit();
        cluster = [item];
        newestAt = createdAt;
      }
    }
    commit();
  }

  return clusters.sort(
    (left, right) =>
      left.phone.localeCompare(right.phone, undefined, { numeric: true }) ||
      right.cases[0].created_at.localeCompare(left.cases[0].created_at),
  );
}
