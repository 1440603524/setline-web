import { PwaInstall } from "@/features/pwa-install";
import { HomePage } from "@/pages/home";
import styles from "./App.module.scss";

export const App = () => (
  <div className={styles.shell}>
    <header className={styles.topbar}>
      <span className={styles.brand}>
        <img alt="" src="/icon-192.png" width={34} height={34} />
        Setline
      </span>
      <PwaInstall />
    </header>
    <HomePage />
  </div>
);
