import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageSympathy.module.scss";

import { CardSympathy, type ICardSympathy } from "@/widgets/CardSympathy";

const cards: Array<ICardSympathy> = [
  {
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyJjq3op08sK2Wc-_od5Xckv9mfQN_LKejA&s",
    name: "Lana Rhodes",
    age: 21,
    city: "New Mexico",
  },
  {
    imgUrl:
      "https://images.thevoicemag.ru/upload/img_cache/e70/e707eb96cc68b5a7219e34fe6446f645_cropped_666x833.jpg",
    name: "Elizabeth Sandra Murphy",
    age: 20,
    city: "Texas",
  },
  {
    imgUrl:
      "https://i.pinimg.com/474x/7e/f9/37/7ef9378755b9e25c20b86b968c1bcbb3.jpg",
    name: "Catherine Newton",
    age: 23,
    city: "Pennsylvania",
  },
  {
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSns3P0ddhqag0tCUb-UqdOMPpnDeIoCLHkQg&s",
    name: "Emma Adams",
    age: 22,
    city: "District of Columbia",
  },
  {
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX479vqWzMi9zRT-spJ2DYqM2MBfweIHgPAA&s",
    name: "Наталья Берникова",
    age: 18,
    city: "Саранск",
  },
];

export function PageSympathy() {
  return (
    <SectionWrapper>
      <section className={styles.section}>
        {cards.map(({ imgUrl, name, age, city }, index) => (
          <CardSympathy
            key={index}
            imgUrl={imgUrl}
            name={name}
            age={age}
            city={city}
          />
        ))}
      </section>
    </SectionWrapper>
  );
}
