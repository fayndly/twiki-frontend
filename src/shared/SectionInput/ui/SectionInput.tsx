import { Section } from "@telegram-apps/telegram-ui";
import type { PropsSectionInput } from "../types";
import { useIsBase } from "@/shared/usePlatform";
import styles from "./SectionInput.module.scss";

export function SectionInput({
  children,
  showSubtitle = true,
  errors,
  subtitle,
  header,
  showHeader = false,
}: PropsSectionInput) {
  const isBase = useIsBase();

  return (
    <Section
      footer={showSubtitle && errors ? errors : subtitle}
      header={(isBase || showHeader) && header}
      className={`${isBase ? styles.section_base : styles.section} ${errors && styles.has_error}`}
    >
      {children}
    </Section>
  );
}
