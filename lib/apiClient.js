// lib/apiClient.js
const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export async function apiFetch(path, { method = "GET", body, headers = {} } = {}) {
  const url = `${BASE}${path}`;
  const opts = { method, headers: { "Content-Type": "application/json", ...headers } };

  
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) opts.headers["Authorization"] = `Bearer ${token}`;
  }

  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const error = new Error(data?.message || res.statusText || "API Error");
    error.status = res.status;
    error.payload = data;
    throw error;
  }
  return data;
}
