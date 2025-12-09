import styles from "./sectionWrapper.module.scss"

import { type ReactNode } from "react";

interface IProps {
    children: ReactNode;
    hasMarginBottom?: boolean
};

export function SectionWrapper({ children, hasMarginBottom = true }: IProps) {
    return (
        <section className={`${styles.section_wrapper} ${hasMarginBottom ? styles.has_margin_bottom : ""}`}>
            {children} {hasMarginBottom}
        </section>
    )
}