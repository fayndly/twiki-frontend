import type { PropsCellCustom } from "../../types";
import styles from "./index.module.scss";

import { Cell, IconContainer, Navigation } from "@telegram-apps/telegram-ui";
import { DynamicIcon } from "lucide-react/dynamic";

import { useIsBase } from "@/app/store";

export function CellCustom({
  title,
  moveTitle,
  subtitle,
  onClick,
  beforeIcon,
}: PropsCellCustom) {
  const isBase = useIsBase();

  return (
    <Cell
      className={`${isBase ? styles.cell_base : styles.cell}`}
      interactiveAnimation="background"
      onClick={onClick}
      subtitle={isBase && subtitle}
      after={!isBase && <Navigation>{moveTitle}</Navigation>}
      before={
        <IconContainer
          className={styles.icon_container}
          style={{
            backgroundColor: beforeIcon.colorContainer,
          }}
        >
          <DynamicIcon name={beforeIcon.name} />
        </IconContainer>
      }
    >
      {title}
    </Cell>
  );
}
