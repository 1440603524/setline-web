import type { ConnectionResponse } from "@/api/connection/model";

export type ConnectionState =
  | { state: "loading" }
  | ({ state: "ok" } & Pick<ConnectionResponse, "service" | "message">)
  | { state: "error"; message: string };
