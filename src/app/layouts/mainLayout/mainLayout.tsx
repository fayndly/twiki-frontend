import styles from "./MainLayout.module.scss"

import { type ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function MainLayout({ children }: Props) {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}