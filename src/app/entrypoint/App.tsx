import { MainLayout } from "../layouts/MainLayout/index"
import styles from "./app.module.scss"

import { AppRoutes } from "../routes"

export default function App() {
  return (
    <MainLayout>
      <AppRoutes />
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
