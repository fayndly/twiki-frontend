import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageLikes.module.scss";

import { CardProfile } from "@/widgets/CardProfile";

import type { ICartProfile } from "../types";

import { SectionNoContent } from "@/shared/SectionNoContent";
import { SectionLoaderCarts } from "@/shared/SectionLoaderCarts";
import { useGetterData } from "../api";

function Content() {
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

  if (profileCarts.length === 0 && !isDataLoading) {
    return (
      <SectionNoContent text="Когда кто-то поставит вам лайк, вы увидите это здесь" />
    );
  }

  return (
    <>
      {isDataLoading ? (
        <SectionLoaderCarts
          header="Загружаем симпатии"
          description="Собираем анкеты людей, которым вы уже понравились."
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
    </>
  );
}

export function PageLikes() {
  return (
    <SectionWrapper>
      <Content />
    </SectionWrapper>
  );
}
