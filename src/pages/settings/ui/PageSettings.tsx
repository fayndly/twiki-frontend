import { SectionWrapper } from "@/app/layouts/SectionWrapper";

import styles from "./PageSettings.module.scss";
import { useNavigate } from "react-router-dom";
import {
  Cell,
  Divider,
  IconContainer,
  Subheadline,
  Text,
} from "@telegram-apps/telegram-ui";

import { type ICell } from "../types/index.types";

const MoveIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="10"
      height="17"
      viewBox="0 0 10 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 1.5L7.79289 7.79289C8.18342 8.18342 8.18342 8.81658 7.79289 9.20711L1.5 15.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export function PageSettings() {
  const navigate = useNavigate();

  return (
    <SectionWrapper>
      <section className={styles.section}>
        <div className={styles.section_settings}>
          <Subheadline className={styles.header} plain weight="3">
            НАСТРОЙКИ
          </Subheadline>
          <div className={styles.wrapper_settings}>
            <CustomCell
              title="Фильтры"
              moveTitle="Изменить"
              onClick={() => {
                navigate("/filters");
              }}
            />
            <Divider className={styles.divider} />
            <CustomCell
              title="Анкета"
              moveTitle="Редактировать"
              onClick={() => {
                navigate("/profile/update");
              }}
            />
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

const CustomCell = ({ title, moveTitle, onClick }: ICell) => {
  return (
    <Cell
      onClick={onClick}
      className={styles.cell}
      after={
        <div className={styles.cell_move}>
          <Text className={styles.cell_move_title} weight="3">
            {moveTitle}
          </Text>
          <IconContainer>
            <MoveIcon className={styles.cell_move_icon} />
          </IconContainer>
        </div>
      }
    >
      {title}
    </Cell>
  );
};
