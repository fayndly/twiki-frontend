import styles from "./SectionNoContent.module.scss";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Title } from "@telegram-apps/telegram-ui";

export function SectionNoContent({ text }: { text: string }) {
  return (
    <section className={styles.sections_no_content}>
      <DotLottieReact src="/stickers/duck_nothing.json" loop autoplay />
      <Title className={styles.title} level="3" weight="3">
        {text}
      </Title>
    </section>
  );
}
