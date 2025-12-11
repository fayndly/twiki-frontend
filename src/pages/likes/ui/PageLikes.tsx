import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageLikes.module.scss";

import { CardProfile } from "@/widgets/CardProfile";

const cards = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export function PageLikes() {
  return (
    <SectionWrapper>
      <section className={styles.section}>
        {cards.map(({ id }) => (
          <CardProfile key={id} />
        ))}
      </section>
    </SectionWrapper>
  );
}
