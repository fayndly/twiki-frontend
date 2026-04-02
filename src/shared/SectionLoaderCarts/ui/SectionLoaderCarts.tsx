import { PlaceholderSticker } from "@/shared/Placeholder";
import styles from "./SectionLoaderCarts.module.scss";

import { pathsToPublicSrc } from "@/shared/config";

interface PropsSectionLoaderCarts {
  header?: string;
  description?: string;
}

export function SectionLoaderCarts({
  header,
  description,
}: PropsSectionLoaderCarts) {
  return (
    <section className={styles.section_loader_form}>
      <PlaceholderSticker
        header={header}
        description={description}
        pathToSticker={pathsToPublicSrc.stickers.loadingCarts}
      />
    </section>
  );
}
