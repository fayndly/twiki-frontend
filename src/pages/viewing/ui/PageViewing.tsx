import { SectionWrapper } from "@/app/layouts/SectionWrapper"

import styles from "./PageViewing.module.scss"


export function PageViewing() {
    return (
        <SectionWrapper>
            <section className={styles.section}>
                <div className={styles.card} />
            </section>
        </SectionWrapper>
    )
}