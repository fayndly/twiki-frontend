export interface IPropsCardProfile {
  onDislike?: () => void;
  onLike?: () => void;
  imgUrl: string;
  name: string;
  age: number;
  city: string;
  description: string;
  isLiked: boolean;
  isDisliked: boolean;
}
