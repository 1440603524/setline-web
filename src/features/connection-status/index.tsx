import { connectionPath } from "@/api/connection";
import { useConnectionStatus } from "@/features/connection-status/hooks/useConnectionStatus";
import styles from "./ConnectionStatus.module.scss";
import { statusLabels } from "./data";

export const ConnectionStatus = () => {
  const { connection, retry } = useConnectionStatus();

  return (
    <section className={styles.card} aria-labelledby="connection-heading">
      <div className={styles.heading}>
        <h2 id="connection-heading">服务连接</h2>
        <span className={styles.status} data-state={connection.state} role="status">
          {statusLabels[connection.state]}
        </span>
      </div>

      <div className={styles.result}>
        <p>{connection.state === "loading" ? "正在检查 Go 接口…" : connection.message}</p>
        <code>
          {connection.state === "ok" && <>{connection.service} · </>}
          GET {connectionPath}
        </code>
      </div>

      <button
        type="button"
        className={styles.checkButton}
        disabled={connection.state === "loading"}
        onClick={retry}
      >
        {connection.state === "error" ? "重试" : "检查连接"}
      </button>
    </section>
  );
};
