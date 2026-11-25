export type GetOptions = Omit<RequestInit, "method" | "body">;

export type RequestResult<Data = unknown> =
  | { ok: true; data: Data }
  | { ok: false; reason: "http"; status: number }
  | { ok: false; reason: "invalid-response" };
