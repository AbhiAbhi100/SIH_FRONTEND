// app/soil/page.js
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth"; // adjust path if needed
import { getSoil } from "@/services/soil.service";
import { useRouter } from "next/navigation";

export default function SoilPage() {
  const { token, user, initialized } = useAuth(); // use initialized
  const router = useRouter();
  const [soil, setSoil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // coordinates (replace with dynamic input if needed)
  const lat = 26.7;
  const lon = 83.3;

  useEffect(() => {
    // wait until auth finishes reading localStorage
    if (!initialized) return;

    if (!token) {
      // truly not authenticated -> redirect
      router.push("/login");
      return;
    }

    const fetchSoil = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getSoil(lat, lon, token);
        // adapt depending on your backend response shape
        setSoil(res.data ?? res);
      } catch (err) {
        setError(err?.message || "Failed to fetch soil data");
      } finally {
        setLoading(false);
      }
    };

    fetchSoil();
  }, [initialized, token, router, lat, lon]);

  // while we are reading localStorage
  if (!initialized) return <div>Checking authentication…</div>;
  // if initialized but no token, the effect above already redirected; show fallback
  if (!token) return <div>Redirecting to login…</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Soil Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {soil && (
        <div className="mt-4">
          <p><strong>pH:</strong> {soil.pH ?? "N/A"}</p>
          <p><strong>Organic Carbon:</strong> {soil.organicCarbon ?? "N/A"}</p>
          <p><strong>Nitrogen:</strong> {soil.nitrogen ?? "N/A"}</p>
        </div>
      )}
    </div>
  );
}
