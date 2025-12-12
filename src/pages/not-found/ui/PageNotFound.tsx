import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageNotFound.module.scss";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button, Title } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";

export function PageNotFound() {
  const navigate = useNavigate();

  return (
    <SectionWrapper>
      <section className={styles.section}>
        <DotLottieReact src="/stickers/duck_thinking.json" loop autoplay />
        <Title className={styles.title} level="3" weight="3">
          Страница не найдена
        </Title>
        <Button
          onClick={() => {
            navigate("/viewing");
          }}
          mode="filled"
          size="s"
        >
          Вернуться
        </Button>
      </section>
    </SectionWrapper>
  );
}
