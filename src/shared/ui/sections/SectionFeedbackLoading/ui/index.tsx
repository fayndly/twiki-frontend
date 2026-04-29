import styles from "./index.module.scss";
import type { PropsSectionLoad } from "../types";
import { pathsToStickers } from "../config";

import { Button, Placeholder, Spinner } from "@telegram-apps/telegram-ui";

import { PlaceholderSticker } from "@/shared/ui/Placeholder";
import { supportHapticFeedback } from "@/shared/helpers";

export function SectionFeedbackLoading({
  type,
  header,
  description,
  onClickButtonReload,
}: PropsSectionLoad) {
  if (type === "loadingFormData") {
    return (
      <section className={styles.section_load}>
        <Spinner size="l" />
      </section>
    );
  }

  if (type === "errorLoadingFormData") {
    return (
      <section className={styles.section_load}>
        <Placeholder
          header={header}
          description={description}
          action={
            type === "errorLoadingFormData" && (
              <Button
                onClick={() => {
                  supportHapticFeedback("medium");
                  onClickButtonReload?.();
                }}
                mode="filled"
                size="l"
              >
                Попробовать снова
              </Button>
            )
          }
        />
      </section>
    );
  }

  const urlToSticker = pathsToStickers[type];

  return (
    <section className={styles.section_load}>
      {urlToSticker && (
        <PlaceholderSticker
          key={type}
          header={header}
          description={description}
          pathToSticker={urlToSticker}
          actions={
            type === "errorLoadingCards" && (
              <Button
                onClick={() => {
                  supportHapticFeedback("medium");
                  onClickButtonReload?.();
                }}
                mode="filled"
                size="l"
              >
                Попробовать снова
              </Button>
            )
          }
        />
      )}
    </section>
  );
}
