"use client";

import { DotsThreeVertical } from "@phosphor-icons/react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateCase } from "@/lib/api";
import type { CaseRecord } from "@/lib/types";
import { Spinner } from "@/components/ui/spinner";
import { IconButton } from "../../IconButton";
import { isCaseClosed } from "./constants";

type CaseRowActionsProps = {
  item: CaseRecord;
  onCaseUpdated: (item: CaseRecord) => void;
  canReopen?: boolean;
};

type ConfirmKind = "close" | "reopen" | null;

export function CaseRowActions({ item, onCaseUpdated, canReopen = false }: CaseRowActionsProps) {
  const [confirmKind, setConfirmKind] = useState<ConfirmKind>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const closed = isCaseClosed(item.status);

  async function applyAction() {
    if (!confirmKind) return;
    setBusy(true);
    setError("");
    try {
      const status = confirmKind === "close" ? "resolved" : "in_progress";
      const updated = await updateCase(item.id, { status });
      onCaseUpdated(updated);
      setConfirmKind(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : confirmKind === "close"
            ? "Could not close case"
            : "Could not re-open case",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton label="Case actions">
            <DotsThreeVertical size={20} weight="bold" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!closed ? (
            <DropdownMenuItem
              className="text-clay focus:text-clay"
              onSelect={(event) => {
                event.preventDefault();
                setConfirmKind("close");
              }}
            >
              Close case
            </DropdownMenuItem>
          ) : canReopen ? (
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                setConfirmKind("reopen");
              }}
            >
              Re-open case
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem disabled>Case closed</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmKind !== null} onOpenChange={(open) => !open && setConfirmKind(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmKind === "reopen" ? "Re-open this case?" : "Close this case?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmKind === "reopen" ? (
                <>
                  Are you sure you want to re-open the {item.case_number} case? It will return to in progress on the
                  desk.
                </>
              ) : (
                <>
                  Are you sure you want to close the {item.case_number} case? It will be marked resolved and remain on
                  the desk for reference.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error ? <p className="text-sm text-clay">{error}</p> : null}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={busy}
              onClick={(event) => {
                event.preventDefault();
                void applyAction();
              }}
            >
              {busy ? <Spinner className="size-4" /> : null}
              {busy
                ? confirmKind === "reopen"
                  ? "Re-opening…"
                  : "Closing…"
                : confirmKind === "reopen"
                  ? "Re-open case"
                  : "Close case"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
