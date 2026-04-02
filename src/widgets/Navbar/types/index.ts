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
