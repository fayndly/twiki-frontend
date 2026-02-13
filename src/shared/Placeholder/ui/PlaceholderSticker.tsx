import type { PropsPlaceholderSticker } from "../types";
import styles from "./Placeholder.module.scss";

import { Placeholder } from "@telegram-apps/telegram-ui";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { getLottie } from "@/app/helpers";

export function PlaceholderSticker({
  header,
  description,
  pathToSticker,
  actions,
}: PropsPlaceholderSticker) {
  const src = getLottie(pathToSticker);

  return (
    <Placeholder description={description} header={header} action={actions}>
      <div className={styles.dot_lottie_wrapper}>
        {src && (
          <DotLottieReact
            className={styles.dot_lottie}
            src={src}
            loop
            autoplay
          />
        )}
      </div>
    </Placeholder>
  );
}
