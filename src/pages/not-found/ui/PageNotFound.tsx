import { paths } from "@/app/routes";
import styles from "./PageNotFound.module.scss";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { PlaceholderSticker } from "@/shared/Placeholder";
import { pathsToPublicSrc } from "@/shared/config";

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
          pathToSticker={pathsToPublicSrc.stickers.notFound}
          actions={
            <Button
              onClick={() => {
                navigate(paths.pageProfileCardsView);
              }}
              mode="filled"
              size="l"
            >
              К просмотру анкет
            </Button>
          }
        />
      </section>
    </SectionWrapper>
  );
}
