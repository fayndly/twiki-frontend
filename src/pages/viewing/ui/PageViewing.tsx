import styles from "./PageViewing.module.scss";
import { useViewingCards } from "../model";
import type { ICartProfile } from "../types";

import { SectionLoaderCarts } from "@/shared/SectionLoaderCarts";
import { SectionErrorLoadCards } from "@/shared/SectionErrorLoadCards";
import { CardProfile } from "@/widgets/CardProfile";
import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { useEffect } from "react";
import { queryClient } from "@/app/store";
import { useOpenAppealModal } from "@/widgets/AppealModal/store/useAppelModal";

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
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (data) {
      const canRefetch = data.every(
        (item) => item.isLiked === true || item.isDisliked === true,
      );

      if (canRefetch) {
        timer = setTimeout(() => {
          console.log("refetch");
          refetch();
        }, 300);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [data]);

  const openAppealModal = useOpenAppealModal();

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
              canRemove={() => {
                if (card.isRemoving) {
                  queryClient.setQueryData<ICartProfile[]>(
                    ["viewingCards"],
                    (old = []) => old.filter((c) => c.id !== card.id),
                  );
                }
              }}
              isLiked={card.isLiked}
              isDisliked={card.isDisliked}
              isAppealed={card.isAppealed}
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
              onAppeal={() => {
                openAppealModal(card.id);
              }}
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
