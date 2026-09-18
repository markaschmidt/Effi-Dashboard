import { Button } from "../Button";
import type { IconButtonProps } from "./types";

export function IconButton({ label, children, ...props }: IconButtonProps) {
  return (
    <Button variant="ghost" size="icon" aria-label={label} title={label} {...props}>
      {children}
    </Button>
  );
}
