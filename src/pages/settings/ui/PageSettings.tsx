import styles from "./PageSettings.module.scss";
import type { PropsCustomCell } from "../types";

import { useNavigate } from "react-router-dom";
import {
  Cell,
  Divider,
  IconContainer,
  List,
  Section,
  Text,
} from "@telegram-apps/telegram-ui";
import { ChevronRight, Funnel, UserRoundPen } from "lucide-react";

import { SectionWrapper } from "@/app/layouts/SectionWrapper";
import { useIsBase } from "@/shared/usePlatform";

export function PageSettings() {
  const navigate = useNavigate();
  const isBase = useIsBase();

  return (
    <SectionWrapper>
      <List className={styles.list}>
        <Section
          header="Настройки"
          className={`${isBase ? styles.section_base : styles.section}`}
        >
          <CustomCell
            title="Фильтры"
            subtitle="Возраст, пол, город"
            moveTitle="Изменить"
            onClick={() => {
              navigate("/filters");
            }}
            beforeIconConfig={{
              colorIconContainer: "#007AFE",
              Icon: <Funnel />,
            }}
          />
          <Divider />
          <CustomCell
            title="Анкета"
            subtitle="Имя, возраст, описание, пол, фото, город"
            moveTitle="Редактировать"
            onClick={() => {
              navigate("/profile/update");
            }}
            beforeIconConfig={{
              colorIconContainer: "#B45ED5",
              Icon: <UserRoundPen />,
            }}
          />
        </Section>
      </List>
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
      after={
        !isBase && (
          <div className={styles.move_container}>
            <Text className={styles.move_title} weight="3">
              {moveTitle}
            </Text>
            <IconContainer style={{ maxHeight: 20 }}>
              <ChevronRight size={20} color="var(--tg-theme-hint-color)" />
            </IconContainer>
          </div>
        )
      }
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
