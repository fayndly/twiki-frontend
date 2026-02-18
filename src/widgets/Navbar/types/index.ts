import type { JSX } from "react";

export interface PropsTab {
  icon: () => JSX.Element;
  isActive: boolean;
  onClick: () => void;
  hasBadge: boolean;
  badgeCount: number | undefined;
}

export interface PropsNavbar {
  show?: boolean;
}
