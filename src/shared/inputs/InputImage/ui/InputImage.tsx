import styles from "./InputImage.module.scss";
import type { PropsInputFile } from "../types/index.types";

import { FileInput } from "@telegram-apps/telegram-ui";

import { ClearButton } from "@/shared/inputs/ClearButton";

export function InputImage({
  hasErrors,
  handleChange,
  label,
  id,
  name,
  photoPreview,
  onChange,
  clearValue,
}: PropsInputFile) {
  let photoUrlPreview = undefined;
  if (!hasErrors && photoPreview) {
    if (typeof photoPreview === "string") {
      photoUrlPreview = photoPreview;
    } else {
      photoUrlPreview = URL.createObjectURL(photoPreview);
    }
  }

  return (
    <div
      className={`${styles.preview_container} ${
        photoUrlPreview && styles.preview_container_active
      }`}
    >
      {photoUrlPreview && (
        <div className={styles.preview_wrapper}>
          <div className={styles.button_clear_wrapper}>
            <ClearButton onClick={clearValue} />
          </div>
          <img
            className={styles.preview_photo}
            src={photoUrlPreview}
            alt="uploaded-file"
          />
        </div>
      )}
      <FileInput
        className={styles.input}
        id={id}
        name={name}
        type="file"
        label={label}
        onChange={(e) => {
          onChange?.();
          handleChange(e);
        }}
      />
    </div>
  );
}
