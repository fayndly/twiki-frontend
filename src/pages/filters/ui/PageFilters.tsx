import styles from "./PageFilters.module.scss";
import { PlaceholderSticker } from "@/shared/Placeholder";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { FormFilters } from "@/widgets/forms/FormFilters";
import { pathsToPublicSrc } from "@/shared/config";

export function PageFilters() {
  return (
    <SectionWrapper hasMarginBottom={false}>
      <section className={`${styles.section} scrollable`}>
        <PlaceholderSticker
          header="Настройте фильтры"
          description="чтобы быстрее находить подходящие анкеты"
          pathToSticker={pathsToPublicSrc.stickers.placeholderFormFilters}
        />
        <FormFilters />
      </section>
    </SectionWrapper>
  );
}
