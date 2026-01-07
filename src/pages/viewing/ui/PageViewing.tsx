import styles from "./PageViewing.module.scss";
import { useViewingCards } from "../model";
import type { ICartProfile } from "../types";

import { SectionLoaderCarts } from "@/shared/SectionLoaderCarts";
import { SectionErrorLoadCards } from "@/shared/SectionErrorLoadCards";
import { CardProfile } from "@/widgets/CardProfile";
import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { useEffect } from "react";

export function Content() {
  const {
    data,
    isPending,
    isError,
    isSuccess,
    refetch,
    isFetching,
    viewingCardsMutations,
  } = useViewingCards();

  const likeHandler = (card: ICartProfile) => {
    viewingCardsMutations.mutate({ reaction: "like", cardId: card.id });
  };

  const dislikeHandler = (card: ICartProfile) => {
    viewingCardsMutations.mutate({ reaction: "dislike", cardId: card.id });
  };

  useEffect(() => {
    if (data?.length === 0) {
      console.log("refetch");

      refetch();
    }
  }, [data]);

  if (isPending || isFetching) {
    return (
      <SectionLoaderCarts
        header="Подбираем подходящие анкеты"
        description="Ищем людей, которые могут вам понравиться. Это займёт всего пару секунд."
      />
    );
  }

  if (isError) {
    return (
      <SectionErrorLoadCards
        onClick={refetch}
        header="Анкеты не загрузились"
        description="Кажется, произошёл сбой. Обновите страницу или попробуйте ещё раз чуть позже."
      />
    );
  }

  if (isSuccess && !isError) {
    return (
      <section className={styles.section}>
        {data &&
          data.map((card) => (
            <CardProfile
              isLiked={card.isLiked}
              isDisliked={card.isDisliked}
              onLike={() => {
                likeHandler(card);
              }}
              onDislike={() => {
                dislikeHandler(card);
              }}
              key={card.id}
              imgUrl={card.imgUrl}
              name={card.name}
              age={card.age}
              city={card.city}
              description={card.description}
            />
          ))}
      </section>
    );
  }
}

export function PageViewing() {
  return (
    <SectionWrapper>
      <Content />
    </SectionWrapper>
  );
}
