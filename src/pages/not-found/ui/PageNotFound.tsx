import styles from "./PageNotFound.module.scss";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { PlaceholderSticker } from "@/shared/Placeholder";

import { Button } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";

export function PageNotFound() {
  const navigate = useNavigate();

  return (
    <SectionWrapper>
      <section className={styles.section}>
        <PlaceholderSticker
          header="Страница не найдена"
          description="Возможно, ссылка устарела или была введена неверно"
          pathToSticker="/stickers/duck_thinking.json"
          actions={
            <>
              <Button
                onClick={() => {
                  navigate("/viewing");
                }}
                mode="filled"
                size="l"
              >
                На главную
              </Button>
              <Button
                onClick={() => {
                  navigate("/profile/create");
                }}
                mode="filled"
                size="s"
              >
                Создать профиль
              </Button>
            </>
          }
        />
      </section>
    </SectionWrapper>
  );
}
