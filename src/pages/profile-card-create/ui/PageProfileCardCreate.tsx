import styles from "./PageProfileCardCreate.module.scss";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { FormProfileCreate } from "@/widgets/forms/FormProfileCreate";
import { PlaceholderSticker } from "@/shared/Placeholder";
import { pathsToPublicSrc } from "@/shared/config";

export function PageProfileCardCreate() {
  return (
    <SectionWrapper hasMarginBottom={false}>
      <section className={`${styles.section} scrollable`}>
        <PlaceholderSticker
          header="Расскажите немного о себе"
          description="Это поможет создать вашу анкету"
          pathToSticker={pathsToPublicSrc.stickers.placeholderFormProfileCreate}
        />
        <FormProfileCreate />
      </section>
    </SectionWrapper>
  );
}
