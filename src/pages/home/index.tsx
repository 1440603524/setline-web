import { ConnectionStatus } from "@/features/connection-status";
import styles from "./HomePage.module.scss";

export const HomePage = () => (
  <main className={styles.workspace}>
    <section className={styles.intro} aria-labelledby="page-title">
      <img className={styles.heroMark} src="/icon-512.png" alt="" width={108} height={108} />
      <h1 id="page-title">个人训练工作台</h1>
    </section>
    <ConnectionStatus />
  </main>
);
