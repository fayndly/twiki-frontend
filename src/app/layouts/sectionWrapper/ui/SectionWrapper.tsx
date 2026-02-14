import styles from "./SectionWrapper.module.scss";
import type { PropsSectionWrapper } from "../types";

export function SectionWrapper({
  children,
  hasMarginBottom = true,
}: PropsSectionWrapper) {
  return (
    <section
      className={`${styles.section_wrapper} ${hasMarginBottom ? styles.has_margin_bottom : ""}`}
    >
      {children} {hasMarginBottom}
    </section>
  );
}
