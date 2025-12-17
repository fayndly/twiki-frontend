import styles from "./Placeholder.module.scss";
import type { PropsPlaceholderSticker } from "../types";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Placeholder } from "@telegram-apps/telegram-ui";

export function PlaceholderSticker({
  header,
  description,
  pathToSticker,
  actions,
}: PropsPlaceholderSticker) {
  return (
    <Placeholder description={description} header={header} action={actions}>
      <DotLottieReact
        className={styles.dot_lottie}
        src={pathToSticker}
        loop
        autoplay
      />
    </Placeholder>
  );
}
