import styles from "./PageFiltersEdit.module.scss";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { FormFilters } from "@/widgets/forms/FormFilters";
import { pathsToPublicSrc } from "@/shared/config";
import { PlaceholderSticker } from "@/shared/Placeholder";

export function PageFiltersEdit() {
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
