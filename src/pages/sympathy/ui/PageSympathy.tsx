import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageSympathy.module.scss";

import { CardSympathy } from "@/widgets/CardSympathy";

import { openTelegramLink } from "@tma.js/sdk-react";

import { SectionNoContent } from "@/shared/SectionNoContent";
import { useGetterData } from "../api";
import { SectionLoaderCarts } from "@/shared/SectionLoaderCarts";

function Content() {
  const { sympathyCarts, isDataLoading } = useGetterData();

  if (sympathyCarts.length === 0 && !isDataLoading) {
    return <SectionNoContent text="Пока никто не ответил взаимной симпатией" />;
  }

  return (
    <>
      {isDataLoading ? (
        <SectionLoaderCarts
          header="Проверяем совпадения"
          description="Ищем людей, с которыми симпатия оказалась взаимной."
        />
      ) : (
        <section className={styles.section}>
          {sympathyCarts.map((cart, index) => (
            <CardSympathy
              onClick={() => {
                openTelegramLink(`https://t.me/${cart.userId}`);
              }}
              key={index}
              imgUrl={cart.imgUrl}
              name={cart.name}
              age={cart.age}
              city={cart.city}
            />
          ))}
        </section>
      )}
    </>
  );
}

export function PageSympathy() {
  return (
    <SectionWrapper>
      <Content />
    </SectionWrapper>
  );
}
