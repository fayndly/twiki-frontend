import styles from "./index.module.scss";

import { Button } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";

import { paths } from "@/app/routes";
import { pathsToPublicSrc } from "@/app/config";
import { PlaceholderSticker } from "@/shared/ui/Placeholder";

export function SectionNotFound() {
  const navigate = useNavigate();

  return (
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
  );
}
