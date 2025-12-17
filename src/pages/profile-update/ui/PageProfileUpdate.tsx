import styles from "./PageProfileUpdate.module.scss";
import { PlaceholderSticker } from "@/shared/Placeholder";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { FormProfileUpdate } from "@/widgets/forms/FormProfileUpdate";

export function PageProfileUpdate() {
  return (
    <SectionWrapper hasMarginBottom={false}>
      <section className={styles.section}>
        <PlaceholderSticker
          header="Обновите данные анкеты"
          description="Сделайте профиль актуальным и удобным для других"
          pathToSticker="/stickers/bear_typing.json"
        />
        <FormProfileUpdate />
      </section>
    </SectionWrapper>
  );
}
