import styles from "./SectionErrorLoadCards.module.scss";

import { PlaceholderSticker } from "@/shared/Placeholder";
import { Button } from "@telegram-apps/telegram-ui";
import { pathsToPublicSrc } from "@/shared/config";
import type { PropsSectionErrorLoadCards } from "../types";

export function SectionErrorLoadCards({
  onClick,
  header,
  description,
}: PropsSectionErrorLoadCards) {
  return (
    <section className={styles.section_error}>
      <PlaceholderSticker
        pathToSticker={pathsToPublicSrc.stickers.error}
        header={header}
        description={description}
        actions={
          <Button onClick={onClick} mode="filled" size="l">
            Попробовать снова
          </Button>
        }
      />
    </section>
  );
}
