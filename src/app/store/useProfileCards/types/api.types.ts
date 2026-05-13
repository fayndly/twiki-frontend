export type TypesReactions = "like" | "dislike" | "appeal";

export interface PropsPostReaction {
  reaction: TypesReactions;
  cardId: number;
  appealData?: {
    type: string;
    description: string;
  };
}

export interface DTOProfileCard {
  id: number;
  imgUrl: string;
  name: string;
  age: number;
  city: string;
  description: string;
}
