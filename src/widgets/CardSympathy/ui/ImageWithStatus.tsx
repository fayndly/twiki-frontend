import styles from "./ImageWithStatus.module.scss";
import type { PropsImageWithStatus } from "../types/index.types";

import { Skeleton } from "@telegram-apps/telegram-ui";
import { ImageOff } from "lucide-react";
import { useState } from "react";

export const ImageWithStatus = ({ src }: PropsImageWithStatus) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={styles.img_container}>
      {error && <ImageOff size={48} />}

      {!error && (
        <Skeleton
          visible={loading && !error}
          className={styles.skeleton}
          withoutAnimation={false}
        >
          <img
            src={src}
            alt="img_sympathy"
            style={{
              display: loading || error ? "none" : "block",
            }}
            className={styles.img}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        </Skeleton>
      )}
    </div>
  );
};
