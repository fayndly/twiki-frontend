import type { PropsButtonAppeal } from "../../types";

import { ShieldAlert } from "lucide-react";
import { IconButton } from "@telegram-apps/telegram-ui";

import { supportHapticFeedback } from "@/shared/helpers";
import { useOpenAppealModal } from "../../model";

export const ButtonAppeal = ({ cardId, from }: PropsButtonAppeal) => {
  const openAppealModal = useOpenAppealModal();

  return (
    <IconButton
      onClick={() => {
        supportHapticFeedback("soft");
        openAppealModal(cardId, from);
      }}
      mode="plain"
      size="s"
    >
      <ShieldAlert color="rgba(255, 255, 255, 0.7)" />
    </IconButton>
  );
};
