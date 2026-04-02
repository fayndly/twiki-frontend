import styles from "./PageProfileUpdate.module.scss";
import { PlaceholderSticker } from "@/shared/Placeholder";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { FormProfileUpdate } from "@/widgets/forms/FormProfileUpdate";
import { pathsToPublicSrc } from "@/shared/config";

export function PageProfileUpdate() {
  return (
    <SectionWrapper hasMarginBottom={false}>
      <section className={`${styles.section} scrollable`}>
        <PlaceholderSticker
          header="Обновите данные анкеты"
          description="Сделайте профиль актуальным и удобным для других"
          pathToSticker={pathsToPublicSrc.stickers.placeholderFormProfileUpdate}
        />
        <FormProfileUpdate />
      </section>
    </SectionWrapper>
  );
}
