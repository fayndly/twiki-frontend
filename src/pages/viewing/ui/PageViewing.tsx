import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageViewing.module.scss";

import { CardProfile } from "@/widgets/CardProfile";

import { cards } from "../mocks/cards";

export function PageViewing() {
  return (
    <SectionWrapper>
      <section className={styles.section}>
        {cards.map(({ imgUrl, name, age, city, description }, index) => (
          <CardProfile
            onLike={() => {
              console.log("like");
            }}
            onDislike={() => {
              console.log("dislike");
            }}
            key={index}
            imgUrl={imgUrl}
            name={name}
            age={age}
            city={city}
            description={description}
          />
        ))}
      </section>
    </SectionWrapper>
  );
}
