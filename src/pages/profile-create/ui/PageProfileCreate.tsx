import styles from "./PageProfileUpdate.module.scss";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { FormProfileUpdate } from "@/widgets/forms/FormProfileUpdate";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Placeholder } from "@telegram-apps/telegram-ui";

export function PageProfileCreate() {
  return (
    <SectionWrapper hasMarginBottom={false}>
      <section className={styles.section}>
        <Placeholder
          description="Это поможет создать вашу анкету"
          header="Расскажите немного о себе"
        >
          <DotLottieReact src="/stickers/dog_writing.json" loop autoplay />
        </Placeholder>
        <FormProfileUpdate />
      </section>
    </SectionWrapper>
  );
}
