export interface PropsCardProfile {
  onDislike?: () => void;
  onLike?: () => void;
  imgUrl: string;
  name: string;
  age: number;
  city: string;
  description: string;
  isLiked: boolean;
  isDisliked: boolean;
  isAppealed?: boolean;
  canRemove: () => void;
  onAppeal?: () => void;
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
