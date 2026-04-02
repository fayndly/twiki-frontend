export interface PropsCustomCell {
  title: string;
  moveTitle: string;
  subtitle: string;
  onClick: () => void;
  beforeIconConfig: {
    colorIconContainer: string;
    Icon: React.ReactNode;
  };
}
