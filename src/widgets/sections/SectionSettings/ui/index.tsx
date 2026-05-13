import styles from "./index.module.scss";
import { CellCustom } from "./CellCustom";
import { cellsData } from "../config";

import { useNavigate } from "react-router-dom";
import { Section } from "@telegram-apps/telegram-ui";

import { useIsBase } from "@/app/store";
import { ListSectionsWrapper } from "@/shared/ui/ListSectionsWrapper";

export function SectionSettings() {
  const navigate = useNavigate();
  const isBase = useIsBase();

  return (
    <ListSectionsWrapper>
      <Section
        header="Настройки"
        className={`${isBase ? styles.section_base : styles.section}`}
      >
        {cellsData.map((cell) => (
          <CellCustom
            title={cell.title}
            subtitle={cell.subtitle}
            moveTitle={cell.moveTitle}
            onClick={() => {
              navigate(cell.pathNavigateTo);
            }}
            beforeIcon={cell.beforeIcon}
          />
        ))}
      </Section>
    </ListSectionsWrapper>
  );
}
