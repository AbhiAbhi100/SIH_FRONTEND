// lib/apiClient.js
const BASE = process.env.NEXT_PUBLIC_BACKEND_URL; // Ensure this is set in .env.local

export async function apiClient(path, { method = "GET", body, headers = {} } = {}) {
  const url = `${BASE}${path}`;

  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Attach token from localStorage (only if running in browser)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) opts.headers["Authorization"] = `Bearer ${token}`;
  }

  // Stringify body if needed
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);

  // Try to parse JSON safely
  let data;
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  // Handle expired/invalid token
  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // or use Next.js router.push if in component
    }
    throw new Error("Unauthorized – please login again.");
  }

  // Handle general API errors
  if (!res.ok) {
    const error = new Error(data?.message || res.statusText || "API Error");
    error.status = res.status;
    error.payload = data;
    throw error;
  }

  return data;
}
