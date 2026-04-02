import styles from "./PageLikes.module.scss";

import { SectionNoContent } from "@/shared/SectionNoContent";
import { SectionLoaderCarts } from "@/shared/SectionLoaderCarts";
import { SectionErrorLoadCards } from "@/shared/SectionErrorLoadCards";
import { CardProfile } from "@/widgets/CardProfile";
import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { queryClient } from "@/app/store";
import {
  useLikesCards,
  type StoreItemCardProfile,
} from "@/app/store/useLikesCards";
import { useOpenAppealModal } from "@/widgets/AppealModal";
import { getAddSnackbar } from "@/widgets/SnackbarContainer";

function Content() {
  const { data, isPending, isError, isSuccess, refetch, likesCardsMutations, error: err } =
    useLikesCards();

  const openAppealModal = useOpenAppealModal();

  const likeHandler = (card: StoreItemCardProfile) => {
    likesCardsMutations.mutate({ reaction: "like", cardId: card.id });
  };

  const dislikeHandler = (card: StoreItemCardProfile) => {
    likesCardsMutations.mutate({ reaction: "dislike", cardId: card.id });
  };

  const canRefetch =
    data &&
    data.every((item) => item.isLiked === true || item.isDisliked === true);

  const canNoDataShow = (data && data.length === 0 && !isPending) || canRefetch;

  if (isPending) {
    return (
      <SectionLoaderCarts
        header="Загружаем симпатии"
        description="Собираем анкеты людей, которым вы уже понравились."
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
          header = `Не удалось загрузить анкеты лайков`;
          description = err.response?.data?.message || "";
          type = "clientError";
        } else if (err.status >= 500) {
          header = `Не удалось загрузить анкеты лайков`;
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
        {canNoDataShow && !isPending && (
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
