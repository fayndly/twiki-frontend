import defaultStyles from "./index.module.scss";
import type { PropsImageWithStatus, StatusImage } from "../types";

import { Skeleton } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { ImageOff } from "lucide-react";

import { imageStatusStore } from "@/app/store";

export const ImageWithStatus = ({
  src,
  alt,
  stylesContainerImg,
  stylesImg,
}: PropsImageWithStatus) => {
  const initialStatus = imageStatusStore.get(src) ?? "loading";

  const [status, setStatus] = useState<StatusImage>(initialStatus);

  const handleLoad = () => {
    imageStatusStore.set(src, "loaded");
    setStatus("loaded");
  };

  const handleError = () => {
    imageStatusStore.set(src, "error");
    setStatus("error");
  };

  return (
    <div className={`${defaultStyles.img_container} ${stylesContainerImg}`}>
      {status === "error" && (
        <ImageOff size={48} className={defaultStyles.icon_error} />
      )}

      {status !== "error" && (
        <Skeleton
          visible={status === "loading"}
          className={defaultStyles.skeleton}
        >
          <img
            src={src}
            alt={alt}
            className={`${defaultStyles.img} ${stylesImg}`}
            style={{ display: status === "loaded" ? "block" : "none" }}
            onLoad={handleLoad}
            onError={handleError}
          />
        </Skeleton>
      )}
    </div>
  );
};
