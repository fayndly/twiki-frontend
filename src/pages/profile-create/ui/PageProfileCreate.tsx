import styles from "./PageProfileUpdate.module.scss";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { FormProfileUpdate } from "@/widgets/forms/FormProfileUpdate";
import { PlaceholderSticker } from "@/shared/Placeholder";

export function PageProfileCreate() {
  return (
    <SectionWrapper hasMarginBottom={false}>
      <section className={styles.section}>
        <PlaceholderSticker
          header="Расскажите немного о себе"
          description="Это поможет создать вашу анкету"
          pathToSticker="/stickers/dog_writing.json"
        />
        <FormProfileUpdate />
      </section>
    </SectionWrapper>
  );
}
