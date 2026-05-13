type TypesSectionFeedback =
  | "loadingCards"
  | "loadingFormData"
  | "errorLoadingCards"
  | "errorLoadingFormData"
  | "noContent";

export interface PropsSectionLoad {
  header?: string;
  description?: string;
  actions?: React.ReactNode;
  onClickButtonReload?: () => void;
  type: TypesSectionFeedback;
}

export type ObjectsSectionFeedback = Record<
  PropsSectionLoad["type"],
  string | undefined
>;
