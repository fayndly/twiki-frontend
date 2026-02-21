export interface PropsPostReaction {
  reaction: "like" | "dislike" | "appeal";
  cardId: number;
  appealData?: {
    type: string;
    description: string;
  };
}
