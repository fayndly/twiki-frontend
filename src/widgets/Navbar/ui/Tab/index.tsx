import styles from "./index.module.scss";
import type { PropsTab } from "../../types";

import { Badge, IconButton } from "@telegram-apps/telegram-ui";

export function Tab({
  children,
  isActive,
  onClick,
  hasBadge = false,
  badgeCount = 0,
}: PropsTab) {
  return (
    <div className={styles.tab_wrapper}>
      {hasBadge && badgeCount > 0 && (
        <Badge className={styles.tab_badge} mode="secondary" type="number">
          {badgeCount}
        </Badge>
      )}
      <IconButton
        className={`${styles.tab} ${isActive ? styles.is_tab_active : ""}`}
        onClick={onClick}
        // mode={isActive ? "gray" : "plain"}
        mode="plain"
        size="l"
      >
        {children}
      </IconButton>
    </div>
  );
}
