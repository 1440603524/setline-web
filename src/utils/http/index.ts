import type { GetOptions, RequestResult } from "./model";

const get = async <Data = unknown>(
  url: string,
  options?: GetOptions,
): Promise<RequestResult<Data>> => {
  const headers = new Headers(options?.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const response = await fetch(url, {
    cache: "no-store",
    ...options,
    method: "GET",
    headers,
  });
  if (!response.ok) return { ok: false, reason: "http", status: response.status };

  try {
    const data: unknown = await response.json();
    return { ok: true, data: data as Data };
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    return { ok: false, reason: "invalid-response" };
  }
};

export const http = { get };
