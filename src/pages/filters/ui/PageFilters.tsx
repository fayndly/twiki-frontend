import styles from "./PageFilters.module.scss";
import { PlaceholderSticker } from "@/shared/Placeholder";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { FormFilters } from "@/widgets/forms/FormFilters";

export function PageFilters() {
  return (
    <SectionWrapper hasMarginBottom={false}>
      <section className={styles.section}>
        <PlaceholderSticker
          header="Настройте фильтры"
          description="чтобы быстрее находить подходящие анкеты"
          pathToSticker="/stickers/beard_searching.json"
        />
        <FormFilters />
      </section>
    </SectionWrapper>
  );
}
