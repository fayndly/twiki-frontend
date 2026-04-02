import styles from "./SectionErrorLoadFormData.module.scss";

import { Button, Placeholder } from "@telegram-apps/telegram-ui";
import type { PropsSectionErrorLoadFormData } from "../types";

export function SectionErrorLoadFormData({
  onClick,
  header,
  description,
}: PropsSectionErrorLoadFormData) {
  return (
    <section className={styles.section_error}>
      <Placeholder
        description={description}
        header={header}
        action={
          <Button onClick={onClick} mode="filled" size="l">
            Попробовать снова
          </Button>
        }
      ></Placeholder>
    </section>
  );
}
