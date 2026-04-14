import styles from "./PageSettings.module.scss";
import type { PropsCustomCell } from "../types";

import { useNavigate } from "react-router-dom";
import {
  Cell,
  IconContainer,
  Navigation,
  Section,
} from "@telegram-apps/telegram-ui";
import { Funnel, UserRoundPen } from "lucide-react";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { useIsBase } from "@/shared/usePlatform";
import { ListSectionsWrapper } from "@/shared/ListSectionsWrapper";
import { paths } from "@/app/routes";

export function PageSettings() {
  const navigate = useNavigate();
  const isBase = useIsBase();

  return (
    <SectionWrapper>
      <ListSectionsWrapper>
        <Section
          header="Настройки"
          className={`${isBase ? styles.section_base : styles.section}`}
        >
          <CustomCell
            title="Фильтры"
            subtitle="Возраст, пол, город"
            moveTitle="Изменить"
            onClick={() => {
              navigate(paths.pageFiltersEdit);
            }}
            beforeIconConfig={{
              colorIconContainer: "#007AFE",
              Icon: <Funnel />,
            }}
          />
          <CustomCell
            title="Анкета"
            subtitle="Имя, возраст, описание, пол, фото, город"
            moveTitle="Редактировать"
            onClick={() => {
              navigate(paths.pageProfileCardEdit);
            }}
            beforeIconConfig={{
              colorIconContainer: "#B45ED5",
              Icon: <UserRoundPen />,
            }}
          />
        </Section>
      </ListSectionsWrapper>
    </SectionWrapper>
  );
}

const CustomCell = ({
  title,
  moveTitle,
  subtitle,
  onClick,
  beforeIconConfig,
}: PropsCustomCell) => {
  const isBase = useIsBase();

  return (
    <Cell
      className={`${isBase ? styles.cell_base : styles.cell}`}
      interactiveAnimation="background"
      onClick={onClick}
      subtitle={isBase && subtitle}
      after={!isBase && <Navigation>{moveTitle}</Navigation>}
      before={
        <IconContainer
          className={styles.icon_container}
          style={{
            backgroundColor: beforeIconConfig.colorIconContainer,
          }}
        >
          {beforeIconConfig.Icon}
        </IconContainer>
      }
    >
      {title}
    </Cell>
  );
};
