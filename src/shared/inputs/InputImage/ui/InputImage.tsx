import styles from "./InputImage.module.scss";
import { type IPropsInputFile } from "../types/index.types";

import { SubtitleInput } from "@/shared/inputs/SubtitleInput";

import { FileInput, IconButton } from "@telegram-apps/telegram-ui";
import { X } from "lucide-react";

export function InputImage({
  errors,
  handleChange,
  label,
  id,
  name,
  subtitle,
  photoPreview,
  onChange,
  clearValue,
}: IPropsInputFile) {
  let photoUrlPreview = undefined;
  if (!errors && photoPreview) {
    if (typeof photoPreview === "string") {
      photoUrlPreview = photoPreview;
    } else {
      photoUrlPreview = URL.createObjectURL(photoPreview);
    }
  }

  return (
    <div className={styles.input_file}>
      <div
        className={`${styles.preview_container} ${
          photoUrlPreview && styles.preview_container_active
        }`}
      >
        {photoUrlPreview && (
          <div className={styles.preview_wrapper}>
            <IconButton
              onClick={clearValue}
              className={styles.preview_clear}
              mode="gray"
              size="s"
            >
              <X strokeWidth={2.5} size={20} className={styles.preview_icon} />
            </IconButton>
            <img
              className={styles.preview_photo}
              src={photoUrlPreview}
              alt="uploaded-file"
            />
          </div>
        )}
        <FileInput
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
      <SubtitleInput errors={errors} subtitle={subtitle} />
    </div>
  );
}
