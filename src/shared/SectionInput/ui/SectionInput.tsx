import styles from "./SectionInput.module.scss";
import type { PropsSectionInput } from "../types";

import { Section } from "@telegram-apps/telegram-ui";

import { useIsBase } from "@/shared/usePlatform";

const Subtitle = ({ text }: { text?: string }) => {
  if (!text) {
    return;
  }
  return <Section.Footer>{text}</Section.Footer>;
};

const ErrorSubtitle = ({ text }: { text?: string }) => {
  if (!text) {
    return;
  }
  return (
    <Section.Footer className={styles.footer_errors}>{text}</Section.Footer>
  );
};

export function SectionInput({
  children,
  showSubtitle = true,
  errors,
  subtitle,
  header,
  showHeader = false,
}: PropsSectionInput) {
  const isBase = useIsBase();

  let stroke: string = "";

  if (errors) {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i]) {
        stroke += errors[i] + "\n";
      }
    }
  }

  const footerText = (
    <>
      {stroke.length ? <ErrorSubtitle text={stroke} /> : ""}
      <Subtitle text={subtitle} />
    </>
  );

  return (
    <Section
      footer={showSubtitle && footerText}
      header={(isBase || showHeader) && header}
      className={`${styles.section} ${isBase ? styles.section_base : styles.section_ios}`}
    >
      {children}
    </Section>
  );
}
