import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageViewing.module.scss";

import { CardProfile } from "@/widgets/CardProfile";

import type { ICartProfile } from "../types";

import { useGetterData } from "../api";
import { SectionLoaderCarts } from "@/shared/SectionLoaderCarts";

export function PageViewing() {
  const { profileCarts, setProfileCarts, isDataLoading } = useGetterData();

  const likeHandler = (card: ICartProfile) => {
    console.log(card.name + " liked!");
    remove(card.id, "right");
  };

  const dislikeHandler = (card: ICartProfile) => {
    console.log(card.name + " disliked!");
    remove(card.id, "left");
  };

  const remove = (id: number, way: "right" | "left") => {
    setProfileCarts(() => {
      if (way === "right") {
        return profileCarts.map((i) =>
          i.id === id ? { ...i, isLiked: true } : i
        );
      }
      return profileCarts.map((i) =>
        i.id === id ? { ...i, isDisliked: true } : i
      );
    });

    setTimeout(() => {
      setProfileCarts((profileCarts) =>
        profileCarts.filter((i) => i.id !== id)
      );
    }, 300);
  };

  return (
    <SectionWrapper>
      {isDataLoading ? (
        <SectionLoaderCarts
          header="Подбираем подходящие анкеты"
          description="Ищем людей, которые могут вам понравиться. Это займёт всего пару секунд."
        />
      ) : (
        <section className={styles.section}>
          {profileCarts.map((card) => (
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
      )}
    </SectionWrapper>
  );
}
