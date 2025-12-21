import styles from "./Placeholder.module.scss";
import type { PropsPlaceholderSticker } from "../types";

import { Placeholder } from "@telegram-apps/telegram-ui";
import { lazy, Suspense, useState, useEffect } from "react";

const BgAnimation = lazy(() =>
  import("@lottiefiles/dotlottie-react").then((m) => ({
    default: m.DotLottieReact,
  }))
);

export function PlaceholderSticker({
  header,
  description,
  pathToSticker,
  actions,
}: PropsPlaceholderSticker) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(id);
  }, []);

  return (
    <Placeholder description={description} header={header} action={actions}>
      <div
        className={styles.dot_lottie_wrapper}
        style={{
          opacity: visible ? 1 : 0,
        }}
      >
        <Suspense fallback={null}>
          <BgAnimation
            className={styles.dot_lottie}
            src={pathToSticker}
            loop
            autoplay
          />
        </Suspense>
      </div>
    </Placeholder>
  );
}
