import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageSympathy.module.scss";

import { CardSympathy } from "@/widgets/CardSympathy";

import { openTelegramLink } from "@tma.js/sdk-react";

import { cards } from "../mocks/cards";

export function PageSympathy() {
  return (
    <SectionWrapper>
      <section className={styles.section}>
        {cards.map(({ userId, imgUrl, name, age, city }, index) => (
          <CardSympathy
            onClick={() => {
              openTelegramLink(`https://t.me/${userId}`);
            }}
            key={index}
            imgUrl={imgUrl}
            name={name}
            age={age}
            city={city}
          />
        ))}
      </section>
    </SectionWrapper>
  );
}
