// app/dashboard/page.js
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const router = useRouter();

  // all hooks at top (stable order)
  const { user, token, initialized, logout } = useAuth();

  // redirect to login if not authenticated (after initialized)
  useEffect(() => {
    if (!initialized) return;
    if (!token) {
      router.replace("/login");
    }
  }, [initialized, token, router]);

  if (!initialized) return <div className="p-6">Checking authentication…</div>;
  if (!token) return <div className="p-6">Redirecting to login…</div>;

  const displayName = user?.name || user?.email || "User";

  const handleLogout = () => {
    try {
      // call context logout (this should remove token/user from localStorage)
      logout?.();
    } catch (e) {
      // fallback: clear localStorage
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch {}
    }
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-2 text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          Welcome, {displayName}!
        </h1>
        {user?.email && (
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">
            {user.email}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>

          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-transparent px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
