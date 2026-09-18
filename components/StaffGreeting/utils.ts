export function displayFirstName(firstName?: string | null, fullName?: string | null) {
  if (firstName?.trim()) return firstName.trim();
  const fromFull = fullName?.trim().split(/\s+/)[0];
  return fromFull || "there";
}
