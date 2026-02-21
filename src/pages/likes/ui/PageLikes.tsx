import styles from "./PageLikes.module.scss";

import { SectionNoContent } from "@/shared/SectionNoContent";
import { SectionLoaderCarts } from "@/shared/SectionLoaderCarts";
import { SectionErrorLoadCards } from "@/shared/SectionErrorLoadCards";
import { CardProfile } from "@/widgets/CardProfile";
import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { useEffect, useState } from "react";
import { queryClient } from "@/app/store";
import {
  useLikesCards,
  type StoreItemCardProfile,
} from "@/app/store/useLikesCards";
import { useOpenAppealModal } from "@/widgets/AppealModal";

function Content() {
  const { data, isPending, isError, isSuccess, refetch, likesCardsMutations } =
    useLikesCards();

  const openAppealModal = useOpenAppealModal();

  const likeHandler = (card: StoreItemCardProfile) => {
    likesCardsMutations.mutate({ reaction: "like", cardId: card.id });
  };

  const dislikeHandler = (card: StoreItemCardProfile) => {
    likesCardsMutations.mutate({ reaction: "dislike", cardId: card.id });
  };

  const [canNoDataShow, setNoDataShow] = useState(false);

  useEffect(() => {
    const canRefetch =
      data &&
      data.every((item) => item.isLiked === true || item.isDisliked === true);

    if ((data && data.length === 0 && !isPending) || canRefetch) {
      setNoDataShow(true);
    } else {
      setNoDataShow(false);
    }
  }, [data]);

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
        {canNoDataShow && (
          <SectionNoContent text="Когда кто-то поставит вам лайк, вы увидите это здесь" />
        )}
        {data &&
          data.map((card) => (
            <CardProfile
              canRemove={() => {
                if (card.isRemoving) {
                  queryClient.setQueryData<StoreItemCardProfile[]>(
                    ["likesCards"],
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
                openAppealModal(card.id, "likesCards");
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
