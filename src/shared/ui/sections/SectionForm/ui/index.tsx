import styles from "./index.module.scss";
import type { PropsSectionForm } from "../types";

export function SectionForm({ children }: PropsSectionForm) {
  return (
    <section className={`${styles.section_form} scrollable`}>
      {children}
    </section>
  );
}
