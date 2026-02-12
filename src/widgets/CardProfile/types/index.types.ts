export interface PropsCardProfile {
  onClickButtonDislike?: () => void;
  onClickButtonLike?: () => void;
  imgUrl: string;
  name: string;
  age: number;
  city: string;
  description: string;
  isLiked: boolean;
  isDisliked: boolean;
  isAppealed?: boolean;
  canRemove: () => void;
  onClickButtonAppeal?: () => void;
}

export interface PropsDescriptionCard {
  name: string;
  age: number;
  city: string;
  description: string;
}

export interface PropsButtonAppeal {
  onClick: () => void;
}

export interface PropsButtonReaction {
  onClick: () => void;
  type: "like" | "dislike";
}

export interface PropsImageWithStatus {
  src: string;
}
