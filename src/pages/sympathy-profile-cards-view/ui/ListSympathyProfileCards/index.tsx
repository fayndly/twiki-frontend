import styles from "./index.module.scss";

import { openTelegramLink } from "@tma.js/sdk-react";

import { useSympathyCards } from "@/app/store/useSympathyCards";
import { getAddSnackbar } from "@/widgets/SnackbarContainer";
import { CardSympathy } from "@/entities/CardSympathy";
import { SectionFeedbackLoading } from "@/shared/ui/sections/SectionFeedbackLoading";

export function ListSympathyProfileCards() {
  const {
    data,
    isPending,
    isError,
    isSuccess,
    refetch,
    error: err,
  } = useSympathyCards();

  if (data && data.length === 0 && !isPending) {
    return (
      <SectionFeedbackLoading
        type="noContent"
        description="Пока никто не ответил взаимной симпатией"
      />
    );
  }

  if (isPending) {
    return (
      <SectionFeedbackLoading
        type="loadingCards"
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
      <SectionFeedbackLoading
        type="errorLoadingCards"
        header="Любовь взяла тайм-аут"
        description="Анкеты временно недоступны. Мы уже разбираемся — попробуйте ещё раз через минуту."
        onClickButtonReload={refetch}
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
                openTelegramLink(`https://t.me/${card.userName}`);
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
