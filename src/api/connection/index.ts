import { http } from "@/utils/http";
import type { ConnectionResponse } from "./model";

export const connectionPath = "/api/hello";

export const checkConnection = (signal: AbortSignal) =>
  http.get<ConnectionResponse>(connectionPath, { signal });
