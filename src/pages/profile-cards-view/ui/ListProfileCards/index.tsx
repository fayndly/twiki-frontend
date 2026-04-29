import { useEffect } from "react";

import { SectionOverlayCards } from "@/app/layouts/SectionOverlayCards";
import {
  useViewingCards,
  type StoreItemCardProfile,
} from "@/app/store/useProfileCards";
import { queryClient } from "@/app/store";
import { getAddSnackbar } from "@/widgets/SnackbarContainer";
import { CardProfileWithActions } from "@/widgets/CardProfileWithActions";
import { SectionFeedbackLoading } from "@/shared/ui/sections/SectionFeedbackLoading";

export function ListProfileCards() {
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

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (data) {
      const canRefetch = data.every(
        (item) => item.isLiked === true || item.isDisliked === true,
      );

      if (canRefetch) {
        timer = setTimeout(() => {
          refetch();
        }, 300);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [data]);

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
      <SectionFeedbackLoading
        type="errorLoadingCards"
        header="Анкеты не загрузились"
        description="Кажется, произошёл сбой. Обновите страницу или попробуйте ещё раз чуть позже."
        onClickButtonReload={refetch}
      />
    );
  }

  if (isPending || isFetching) {
    return (
      <SectionFeedbackLoading
        type="loadingCards"
        header="Подбираем подходящие анкеты"
        description="Ищем людей, которые могут вам понравиться. Это займёт всего пару секунд."
      />
    );
  }

  if (isSuccess && !isError) {
    return (
      <SectionOverlayCards>
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
                    ["viewingCards"],
                    (old = []) => old.filter((c) => c.id !== card.id),
                  );
                }
              }}
              id={card.id}
              mutations={viewingCardsMutations}
              from={"viewingCards"}
            />
          ))}
      </SectionOverlayCards>
    );
  }
}
