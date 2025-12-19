import styles from "./SectionLoaderForm.module.scss";
import { Spinner } from "@telegram-apps/telegram-ui";

export function SectionLoaderForm() {
  return (
    <section className={styles.section_loader_form}>
      <Spinner size="l" />
    </section>
  );
}
