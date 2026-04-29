export interface PropsImageWithStatus {
  src: string;
  alt: string;
  stylesContainerImg: string;
  stylesImg: string;
}

export type StatusImage = "loading" | "loaded" | "error";
