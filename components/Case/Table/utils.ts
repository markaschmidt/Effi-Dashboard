import type { CaseRecord } from "@/lib/types";

export function sortCasesByRecent(cases: CaseRecord[]) {
  return [...cases].sort((left, right) => right.created_at.localeCompare(left.created_at));
}

export function filterCases(cases: CaseRecord[], query: string, status: string) {
  const needle = query.toLowerCase();
  return sortCasesByRecent(
    cases.filter((item) => {
      const haystack = `${item.case_number} ${item.resident_name} ${item.phone_number} ${item.description}`.toLowerCase();
      const matchesQuery = haystack.includes(needle);
      const matchesStatus = status === "all" || item.status === status;
      return matchesQuery && matchesStatus;
    }),
  );
}
