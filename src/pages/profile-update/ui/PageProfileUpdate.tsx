import styles from "./PageProfileUpdate.module.scss";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { FormProfileUpdate } from "@/widgets/forms/FormProfileUpdate";

export function PageProfileUpdate() {
  return (
    <SectionWrapper>
      <section className={styles.section}>
        <FormProfileUpdate />
      </section>
    </SectionWrapper>
  );
}
