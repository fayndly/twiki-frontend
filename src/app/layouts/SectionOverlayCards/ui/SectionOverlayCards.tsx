import styles from "./SectionOverlayCards.module.scss";
import type { PropsSectionOverlayCards } from "../types";

export function SectionOverlayCards({ children }: PropsSectionOverlayCards) {
  return <section className={styles.section_overlay_cards}>{children}</section>;
}
