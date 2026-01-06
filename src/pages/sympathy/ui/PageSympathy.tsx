import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageSympathy.module.scss";

import { CardSympathy } from "@/widgets/CardSympathy";

import { openTelegramLink } from "@tma.js/sdk-react";

import { SectionNoContent } from "@/shared/SectionNoContent";
import { SectionLoaderCarts } from "@/shared/SectionLoaderCarts";

import { useSympathyCards } from "../model";

function Content() {
  const { data, isPending, isError, isSuccess } = useSympathyCards();

  if (data && data.length === 0 && !isPending) {
    return <SectionNoContent text="Пока никто не ответил взаимной симпатией" />;
  }

  if (isPending) {
    return (
      <SectionLoaderCarts
        header="Проверяем совпадения"
        description="Ищем людей, с которыми симпатия оказалась взаимной."
      />
    );
  }

  if (isError) {
    return <h1>error</h1>;
  }

  if (isSuccess && !isError) {
    return (
      <section className={styles.section}>
        {data &&
          data.map((card, index) => (
            <CardSympathy
              onClick={() => {
                openTelegramLink(`https://t.me/${card.userId}`);
              }}
              key={index}
              imgUrl={card.imgUrl}
              name={card.name}
              age={card.age}
              city={card.city}
            />
          ))}
      </section>
    );
  }
}

export function PageSympathy() {
  return (
    <SectionWrapper>
      <Content />
    </SectionWrapper>
  );
}
