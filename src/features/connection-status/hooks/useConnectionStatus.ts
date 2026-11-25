import { useEffect, useState } from "react";
import { checkConnection } from "@/api/connection";
import { requestTimeoutMs } from "@/features/connection-status/data";
import type { ConnectionState } from "@/features/connection-status/model";

export const useConnectionStatus = () => {
  const [attempt, setAttempt] = useState(0);
  const [connection, setConnection] = useState<ConnectionState>({ state: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMs);
    let active = true;

    const refresh = async () => {
      try {
        const result = await checkConnection(controller.signal);
        if (!active) return;

        if (result.ok) {
          const { service, message } = result.data;
          setConnection({ state: "ok", service, message });
          return;
        }

        setConnection({
          state: "error",
          message: result.reason === "http"
            ? `服务返回 HTTP ${result.status}。`
            : "接口返回了无法识别的结果。",
        });
      } catch {
        if (active) {
          setConnection({
            state: "error",
            message: controller.signal.aborted
              ? "请求超时。请检查网络后重试。"
              : "暂时无法访问服务。请检查网络后重试。",
          });
        }
      } finally {
        window.clearTimeout(timeout);
      }
    };

    void refresh();

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  const retry = () => {
    setConnection({ state: "loading" });
    setAttempt((previous) => previous + 1);
  };

  return { connection, retry };
};
