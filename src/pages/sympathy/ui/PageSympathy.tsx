import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageSympathy.module.scss";

import { CardSympathy } from "@/widgets/CardSympathy";

const cards = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
];

export function PageSympathy() {
  return (
    <SectionWrapper>
      <section className={styles.section}>
        {cards.map(({ id }) => (
          <CardSympathy key={id} />
        ))}
      </section>
    </SectionWrapper>
  );
}
