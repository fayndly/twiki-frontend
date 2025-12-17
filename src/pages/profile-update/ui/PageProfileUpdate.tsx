import styles from "./PageProfileUpdate.module.scss";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { FormProfileUpdate } from "@/widgets/forms/FormProfileUpdate";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Placeholder } from "@telegram-apps/telegram-ui";

export function PageProfileUpdate() {
  return (
    <SectionWrapper hasMarginBottom={false}>
      <section className={styles.section}>
        <Placeholder
          description="Сделайте профиль актуальным и удобным для других"
          header="Обновите данные анкеты"
        >
          <DotLottieReact src="/stickers/bear_typing.json" loop autoplay />
        </Placeholder>
        <FormProfileUpdate />
      </section>
    </SectionWrapper>
  );
}
