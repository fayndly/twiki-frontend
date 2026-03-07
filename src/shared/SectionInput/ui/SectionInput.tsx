import { Section } from "@telegram-apps/telegram-ui";
import type { PropsSectionInput } from "../types";
import { useIsBase } from "@/shared/usePlatform";
import styles from "./SectionInput.module.scss";

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
      // footer={"text"}
      header={(isBase || showHeader) && header}
      className={`${isBase ? styles.section_base : styles.section}`}
    >
      {children}
    </Section>
  );
}
