export interface PropsCardSympathy extends PropsInfo {
  onClick?: () => void;
  imgUrl: string;
}

export interface PropsInfo {
  name: string;
  age: number;
  city: string;
}
