import {
  hapticFeedback,
  type ImpactHapticFeedbackStyle,
  type NotificationHapticFeedbackType,
} from "@tma.js/sdk-react";

type Style =
  | ImpactHapticFeedbackStyle
  | NotificationHapticFeedbackType
  | "changed";

const impactStyles = ["light", "medium", "heavy", "rigid", "soft"];
const notificationStyles = ["error", "success", "warning"];

export const supportHapticFeedback = (style: Style) => {
  if (!hapticFeedback.isSupported()) {
    return;
  }

  if (impactStyles.includes(style)) {
    hapticFeedback.impactOccurred(style as ImpactHapticFeedbackStyle);
  } else if (notificationStyles.includes(style)) {
    hapticFeedback.notificationOccurred(
      style as NotificationHapticFeedbackType,
    );
  } else if (style === "changed") {
    hapticFeedback.selectionChanged();
  }
};
