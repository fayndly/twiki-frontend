import type { IconName } from "lucide-react/dynamic";

export interface PropsTab {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  hasBadge?: boolean;
  badgeCount?: number;
}

export interface PropsNavbar {
  show: boolean;
}

export interface TabsList {
  name: string;
  pathTo: string;
  iconName: IconName;
}
