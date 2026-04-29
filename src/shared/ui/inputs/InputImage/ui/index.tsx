import styles from "./index.module.scss";
import type { PropsInputFile } from "../types";

import { FileInput } from "@telegram-apps/telegram-ui";

import { ButtonClear } from "@/shared/ui/buttons/ButtonClear";

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
            <ButtonClear onClick={clearValue} />
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
