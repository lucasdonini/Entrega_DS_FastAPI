import { useState, useEffect } from "react";
import api from "./api";

export function useGet<T>(url: string): {
  data: T | null;
  error: string | null;
  loading: boolean;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    api
      .get<T>(url, { signal: controller.signal })
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.name !== "CanceledError") {
          const message = err.response?.data?.error ?? err.message;
          setError(message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
}

export function usePost<T>(): {
  data: T | null;
  error: string | null;
  loading: boolean;
  post: (url: string, body: unknown) => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const post = async (url: string, body: unknown) => {
    setLoading(true);
    setError(null);

    await api
      .post<T>(url, body)
      .then((res) => setData(res.data))
      .catch((err) => {
        const message = err.response?.data?.error ?? err.message;
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  return { data, error, loading, post };
}

export function useDelete(): {
  error: string | null;
  loading: boolean;
  delete: (url: string) => Promise<void>;
} {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const deleteReq = async (url: string) => {
    setLoading(true);
    setError(null);

    await api
      .delete(url)
      .catch((err) => {
        const message = err.response?.data?.error ?? err.message;
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  return { error, loading, delete: deleteReq };
}

