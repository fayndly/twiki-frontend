import styles from "./ImageWithStatus.module.scss";
import type { PropsImageWithStatus } from "../types";

import { Skeleton, Text } from "@telegram-apps/telegram-ui";
import { useState } from "react";

export const ImageWithStatus = ({ src, alt }: PropsImageWithStatus) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={styles.img_container}>
      {error && (
        <div className={styles.error_container}>
          <Text weight="1">Ошибка</Text>
          <Text weight="3">Не удалось загрузить изображение</Text>
        </div>
      )}

      {!error && (
        <Skeleton
          visible={loading && !error}
          className={styles.skeleton}
          withoutAnimation={false}
        >
          <img
            src={src}
            alt={alt}
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
