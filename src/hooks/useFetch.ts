import { useEffect, useState } from "react";
import { z, type ZodType } from "zod";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type UseFetchOptions<T> = {
  schema?: ZodType<T>;
  method?: HttpMethod;
};

type FetchResult<T> = {
  url: string;
  data: T | null;
  error: string | null;
};

export const useFetch = <T>(
  url: string | null,
  options: UseFetchOptions<T> = {},
) => {
  const { schema, method = "GET" } = options;

  const [result, setResult] = useState<FetchResult<T> | null>(null);

  useEffect(() => {
    // A null url means there is nothing to ask for yet, so keep the last result
    if (!url) return;

    // Captured so the null check above still narrows inside the closure
    const requestUrl = url;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(requestUrl, {
          method: method,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const body = await response.json();

        if (!schema) {
          setResult({ url: requestUrl, data: body as T, error: null });
          return;
        }

        const parsed = schema.safeParse(body);

        if (!parsed.success) {
          throw new Error(z.prettifyError(parsed.error));
        }

        setResult({ url: requestUrl, data: parsed.data, error: null });
      } catch (caught) {
        // An aborted request was replaced by a newer one, so it owns the state
        if (controller.signal.aborted) return;

        setResult({
          url: requestUrl,
          data: null,
          error: caught instanceof Error ? caught.message : "Unknown error",
        });
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, method, schema]);

  // Derived rather than stored, so no state is set synchronously in the effect
  const loading = url !== null && result?.url !== url;

  return { data: result?.data ?? null, error: result?.error ?? null, loading };
};
