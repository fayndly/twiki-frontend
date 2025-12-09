import { MainLayout } from "../layouts/mainLayout/index"
import styles from "./app.module.scss"
import { SectionWrapper } from "../layouts/sectionWrapper"

export default function App() {
  return (
    <MainLayout>
      <SectionWrapper>
        <section className={styles.section}>
          <div className={styles.card}></div>
        </section>
      </SectionWrapper>
      <nav className={styles.navbar}>
        <div className={styles.list_wrapper}>
          <button className={styles.circle}>
          </button>
          <button className={styles.circle} >
          </button>
          <button className={styles.circle}>
          </button>
        </div>
      </nav>
    </MainLayout>
  )
}
