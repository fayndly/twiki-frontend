import { PlaceholderSticker } from "@/shared/Placeholder";
import styles from "./SectionNoContent.module.scss";

export function SectionNoContent({ text }: { text: string }) {
  return (
    <section className={styles.sections_no_content}>
      <PlaceholderSticker
        description={text}
        pathToSticker="/stickers/duck_nothing.json"
      />
    </section>
  );
}
