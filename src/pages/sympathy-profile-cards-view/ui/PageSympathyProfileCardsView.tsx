import styles from "./PageSympathyProfileCardsView.module.scss";

import { openTelegramLink } from "@tma.js/sdk-react";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { useSympathyCards } from "@/app/store/useSympathyCards";
import { CardSympathy } from "@/widgets/CardSympathy";
import { SectionNoContent } from "@/shared/SectionNoContent";
import { SectionLoaderCarts } from "@/shared/SectionLoaderCarts";
import { SectionErrorLoadCards } from "@/shared/SectionErrorLoadCards";
import { getAddSnackbar } from "@/widgets/SnackbarContainer";

function Content() {
  const {
    data,
    isPending,
    isError,
    isSuccess,
    refetch,
    error: err,
  } = useSympathyCards();

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
    if (err) {
      const addSnackbar = getAddSnackbar();

      let header = `${err.name} [${err.status}]`;
      let description = err.message;
      let type = "clientError" as "clientError" | "serverError";

      if (err.status) {
        if (err.status >= 400 && err.status < 500) {
          header = `Не удалось загрузить анкеты симпатий`;
          description = err.response?.data?.message || "";
          type = "clientError";
        } else if (err.status >= 500) {
          header = `Не удалось загрузить анкеты симпатий`;
          description = err.response?.data?.message || "";
          type = "serverError";
        }
      }

      addSnackbar(header, description, type);
    }
    return (
      <SectionErrorLoadCards
        onClick={refetch}
        header="Любовь взяла тайм-аут"
        description="Анкеты временно недоступны. Мы уже разбираемся — попробуйте ещё раз через минуту."
      />
    );
  }

  if (isSuccess && !isError) {
    return (
      <section className={`${styles.section} scrollable`}>
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

export function PageSympathyProfileCardsView() {
  return (
    <SectionWrapper>
      <Content />
    </SectionWrapper>
  );
}
