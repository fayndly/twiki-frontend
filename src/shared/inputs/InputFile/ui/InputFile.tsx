import { FileInput } from "@telegram-apps/telegram-ui";

import styles from "./InputFile.module.scss";

import { type IPropsInputFile } from "../types/index.types";
import { SubtitleInput } from "@/shared/inputs/SubtitleInput";

export function InputFile({
  errors,
  handleChange,
  label,
  id,
  name,
  subtitle,
  photoPreview,
  onChange,
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
          <img
            className={styles.preview_photo}
            src={photoUrlPreview}
            alt="uploaded-file"
          />
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
