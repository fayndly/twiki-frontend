import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageViewing.module.scss";

import { CardProfile } from "@/widgets/CardProfile";

import { cards } from "../mocks/cards";
import { useState } from "react";
import type { ICardProfile } from "../types/index.types";

export function PageViewing() {
  const [profileCards, setProfileCards] = useState(cards);

  const likeHandler = (card: ICardProfile) => {
    console.log(card.name + " liked!");
    remove(card.id, "right");
  };

  const dislikeHandler = (card: ICardProfile) => {
    console.log(card.name + " disliked!");
    remove(card.id, "left");
  };

  const remove = (id: number, way: "right" | "left") => {
    setProfileCards(() => {
      if (way === "right") {
        return profileCards.map((i) =>
          i.id === id ? { ...i, isLiked: true } : i
        );
      }
      return profileCards.map((i) =>
        i.id === id ? { ...i, isDisliked: true } : i
      );
    });

    setTimeout(() => {
      setProfileCards((profileCards) =>
        profileCards.filter((i) => i.id !== id)
      );
    }, 300);
  };

  return (
    <SectionWrapper>
      <section className={styles.section}>
        {profileCards.map((card) => (
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
    </SectionWrapper>
  );
}
