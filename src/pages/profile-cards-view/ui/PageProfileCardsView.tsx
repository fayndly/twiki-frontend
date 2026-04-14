import styles from "./PageProfileCardsView.module.scss";

import { useEffect } from "react";

import { useViewingCards, type CartProfile } from "@/app/store/useViewingCards";
import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { queryClient } from "@/app/store";
import { CardProfile } from "@/widgets/CardProfile";
import { useOpenAppealModal } from "@/widgets/AppealModal";
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
    isFetching,
    viewingCardsMutations,
    error: err,
  } = useViewingCards();

  const likeHandler = (card: CartProfile) => {
    viewingCardsMutations.mutate({ reaction: "like", cardId: card.id });
  };

  const dislikeHandler = (card: CartProfile) => {
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
    if (err) {
      const addSnackbar = getAddSnackbar();

      let header = `${err.name} [${err.status}]`;
      let description = err.message;
      let type = "clientError" as "clientError" | "serverError";

      if (err.status) {
        if (err.status >= 400 && err.status < 500) {
          header = `Не удалось загрузить анкеты`;
          description = err.response?.data?.message || "";
          type = "clientError";
        } else if (err.status >= 500) {
          header = `Не удалось загрузить анкеты`;
          description = err.response?.data?.message || "";
          type = "serverError";
        }
      }

      addSnackbar(header, description, type);
    }
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
                  queryClient.setQueryData<CartProfile[]>(
                    ["viewingCards"],
                    (old = []) => old.filter((c) => c.id !== card.id),
                  );
                }
              }}
              isLiked={card.isLiked}
              isDisliked={card.isDisliked}
              isAppealed={card.isAppealed}
              onClickButtonLike={() => {
                likeHandler(card);
              }}
              onClickButtonDislike={() => {
                dislikeHandler(card);
              }}
              onClickButtonAppeal={() => {
                openAppealModal(card.id, "viewingCards");
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

export function PageProfileCardsView() {
  return (
    <SectionWrapper>
      <Content />
    </SectionWrapper>
  );
}
