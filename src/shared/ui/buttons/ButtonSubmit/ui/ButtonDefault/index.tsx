import type { PropsButtonDefault } from "../../types";

import { Button } from "@telegram-apps/telegram-ui";

export function ButtonDefault({
  isLoading,
  backgroundColor,
  color,
  onClick,
  text,
}: PropsButtonDefault) {
  return (
    <Button
      loading={isLoading}
      mode="filled"
      size="l"
      stretched
      style={{
        backgroundColor,
        color,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
