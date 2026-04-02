import { PlaceholderSticker } from "@/shared/Placeholder";
import styles from "./SectionNoContent.module.scss";

import { pathsToPublicSrc } from "@/shared/config";

export function SectionNoContent({ text }: { text: string }) {
  return (
    <section className={styles.sections_no_content}>
      <PlaceholderSticker
        description={text}
        pathToSticker={pathsToPublicSrc.stickers.noContent}
      />
    </section>
  );
}
