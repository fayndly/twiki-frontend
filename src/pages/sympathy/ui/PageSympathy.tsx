import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageSympathy.module.scss";

import { CardSympathy } from "@/widgets/CardSympathy";

import { openTelegramLink } from "@tma.js/sdk-react";

import { cards } from "../mocks/cards";
import { useState } from "react";
import { SectionNoContent } from "@/shared/SectionNoContent";

function Content() {
  const [sympathyCards, setSympathyCards] = useState(cards);

  if (sympathyCards.length === 0) {
    return <SectionNoContent text="Пока никто не ответил взаимной симпатией" />;
  }

  return (
    <section className={styles.section}>
      {sympathyCards.map(({ userId, imgUrl, name, age, city }, index) => (
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
  );
}

export function PageSympathy() {
  return (
    <SectionWrapper>
      <Content />
    </SectionWrapper>
  );
}
