export interface PropsSectionInput {
  showSubtitle?: boolean;
  errors?: Array<string | undefined>;
  subtitle?: string;
  children: React.ReactNode;
  header?: string;
  showHeader?: boolean;
}
