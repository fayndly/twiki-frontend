import type { PropsButtonReaction } from "../types";
import { reactionCardHandler } from "../model";
import { Button } from "./Button/Button";

export function ButtonReaction({ type, mutations, id }: PropsButtonReaction) {
  return (
    <Button
      onClick={() => reactionCardHandler(mutations, type, id)}
      borderColor={type === "like" ? "#1cce138c" : "#CE4E138c"}
      iconName={type === "like" ? "heart" : "heart-off"}
      iconColor={type === "like" ? "#1BCE13" : "#CE4E13"}
    />
  );
}
