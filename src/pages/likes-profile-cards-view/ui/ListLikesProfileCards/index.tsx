import { queryClient } from "@/app/store";
import {
  useLikesCards,
  type StoreItemCardProfile,
} from "@/app/store/useProfileCards";
import { SectionOverlayCards } from "@/app/layouts/SectionOverlayCards";
import { getAddSnackbar } from "@/widgets/SnackbarContainer";
import { CardProfileWithActions } from "@/widgets/CardProfileWithActions";
import { SectionFeedbackLoading } from "@/shared/ui/sections/SectionFeedbackLoading";

export function ListLikesProfileCards() {
  const {
    data,
    isPending,
    isError,
    isSuccess,
    refetch,
    likesCardsMutations,
    error: err,
  } = useLikesCards();

  const canRefetch =
    data &&
    data.every((item) => item.isLiked === true || item.isDisliked === true);

  const canNoDataShow = (data && data.length === 0 && !isPending) || canRefetch;

  if (isPending) {
    return (
      <SectionFeedbackLoading
        type="loadingCards"
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
      <SectionFeedbackLoading
        type="errorLoadingCards"
        header="Анкеты не загрузились"
        description="Кажется, произошёл сбой. Обновите страницу или попробуйте ещё раз чуть позже."
        onClickButtonReload={refetch}
      />
    );
  }

  if (isSuccess && !isError) {
    return (
      <SectionOverlayCards>
        {canNoDataShow && !isPending && (
          <SectionFeedbackLoading
            type="noContent"
            description="Когда кто-то поставит вам лайк, вы увидите это здесь"
          />
        )}
        {data &&
          data.map((card) => (
            <CardProfileWithActions
              key={card.id}
              imgUrl={card.imgUrl}
              name={card.name}
              age={card.age}
              city={card.city}
              description={card.description}
              isLiked={card.isLiked}
              isDisliked={card.isDisliked}
              isAppealed={card.isAppealed}
              canRemove={() => {
                if (card.isRemoving) {
                  queryClient.setQueryData<StoreItemCardProfile[]>(
                    ["likesCards"],
                    (old = []) => old.filter((c) => c.id !== card.id),
                  );
                }
              }}
              id={card.id}
              mutations={likesCardsMutations}
              from={"likesCards"}
            />
          ))}
      </SectionOverlayCards>
    );
  }
}
