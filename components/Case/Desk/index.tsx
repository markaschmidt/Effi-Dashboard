import { AppShell } from "../../AppShell";
import { StartCallControl } from "../../CallModal";
import { CaseDetailView } from "../DetailView";
import { CaseInbox } from "../Inbox";
import { DeskBackLink } from "../BackLink";
import type { CaseDeskProps } from "./types";

export function CaseDesk({ deskHref, title, scope, viewer, caseId, detail, detailError }: CaseDeskProps) {
  const heading = detail?.resident_name ?? title;
  const titleLeading = caseId ? <DeskBackLink href={deskHref} /> : undefined;
  const actions = caseId || viewer.is_staff ? null : <StartCallControl />;
  return (
    <AppShell title={heading} titleLeading={titleLeading} actions={actions} isStaff={viewer.is_staff} deskHref={deskHref}>
      {caseId && detail ? (
        <CaseDetailView initial={detail} isStaff={viewer.is_staff} />
      ) : caseId ? (
        <p className="text-clay">{detailError || "Case could not be loaded."}</p>
      ) : (
        <CaseInbox deskHref={deskHref} viewer={viewer} scope={scope} />
      )}
    </AppShell>
  );
}
