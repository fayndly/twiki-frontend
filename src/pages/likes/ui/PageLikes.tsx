import { useLikesCards } from "../model";
import type { ICartProfile } from "../types";
import styles from "./PageLikes.module.scss";

import { SectionNoContent } from "@/shared/SectionNoContent";
import { SectionLoaderCarts } from "@/shared/SectionLoaderCarts";
import { SectionErrorLoadCards } from "@/shared/SectionErrorLoadCards";
import { CardProfile } from "@/widgets/CardProfile";
import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { useEffect, useState } from "react";
import { queryClient } from "@/app/store";

function Content() {
  const { data, isPending, isError, isSuccess, refetch, likesCardsMutations } =
    useLikesCards();

  const likeHandler = (card: ICartProfile) => {
    likesCardsMutations.mutate({ reaction: "like", cardId: card.id });
  };

  const dislikeHandler = (card: ICartProfile) => {
    likesCardsMutations.mutate({ reaction: "dislike", cardId: card.id });
  };

  const [canNoDataShow, setNoDataShow] = useState(false);

  useEffect(() => {
    const canRefetch =
      data &&
      data.every((item) => item.isLiked === true || item.isDisliked === true);

    if ((data && data.length === 0 && !isPending) || canRefetch) {
      setTimeout(() => {
        setNoDataShow(true);
      }, 300);
    } else {
      setNoDataShow(false);
    }
  }, [data]);

  if (canNoDataShow) {
    return (
      <SectionNoContent text="Когда кто-то поставит вам лайк, вы увидите это здесь" />
    );
  }

  if (isPending) {
    return (
      <SectionLoaderCarts
        header="Загружаем симпатии"
        description="Собираем анкеты людей, которым вы уже понравились."
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
              canRemove={() => {
                if (card.isRemoving) {
                  queryClient.setQueryData<ICartProfile[]>(
                    ["likesCards"],
                    (old = []) => old.filter((c) => c.id !== card.id)
                  );
                }
              }}
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

export function PageLikes() {
  return (
    <SectionWrapper>
      <Content />
    </SectionWrapper>
  );
}
