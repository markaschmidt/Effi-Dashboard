export function firstSearchParam(value?: string | string[]) {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function deskHref(isStaffDesk: boolean) {
  return isStaffDesk ? "/dashboard/admin" : "/dashboard";
}

export function caseDeskHref(desk: string, caseId: string) {
  return `${desk}?caseID=${encodeURIComponent(caseId)}`;
}
