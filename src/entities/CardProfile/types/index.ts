export interface PropsCardProfile {
  imgUrl: string;
  name: string;
  age: number;
  city: string;
  description: string;
  buttonAppeal: React.ReactNode;
  buttonLike: React.ReactNode;
  buttonDislike: React.ReactNode;
  className?: string;
  onAnimationStart?: () => void;
}

export interface PropsDescriptionCard {
  name: string;
  age: number;
  city: string;
  description: string;
}
