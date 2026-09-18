import type { CaseRecord } from "@/lib/types";

export function filterCases(cases: CaseRecord[], query: string, status: string) {
  const needle = query.toLowerCase();
  return cases.filter((item) => {
    const haystack = `${item.case_number} ${item.resident_name} ${item.phone_number} ${item.description}`.toLowerCase();
    const matchesQuery = haystack.includes(needle);
    const matchesStatus = status === "all" || item.status === status;
    return matchesQuery && matchesStatus;
  });
}
