export interface PropsSnackbar {
  before: any;
  after: any;
  description: string;
  header: string;
  onClose: () => void;
}
