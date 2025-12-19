import styles from "./InputImage.module.scss";
import { type IPropsInputFile } from "../types/index.types";

import { SubtitleInput } from "@/shared/inputs/SubtitleInput";
import { ClearButton } from "@/shared/inputs/ClearButton";

import { FileInput } from "@telegram-apps/telegram-ui";

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
    photoUrlPreview = URL.createObjectURL(photoPreview);
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
            <ClearButton
              onClick={clearValue}
              className={styles.preview_clear}
            />
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
