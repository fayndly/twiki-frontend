import type { IconName } from "lucide-react/dynamic";

interface BeforeIcon {
  colorContainer: string;
  name: IconName;
}

export interface CellsData {
  title: string;
  subtitle: string;
  moveTitle: string;
  beforeIcon: BeforeIcon;
  pathNavigateTo: string;
}

export interface PropsCellCustom {
  title: CellsData["title"];
  moveTitle: CellsData["moveTitle"];
  subtitle: CellsData["subtitle"];
  onClick: () => void;
  beforeIcon: CellsData["beforeIcon"];
}
