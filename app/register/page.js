"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export default function SignupFormDemo() {
  const router = useRouter();

  // IMPORTANT: declare ALL hooks at the top so hook order never changes
  const { token, initialized } = useAuth();        // custom hook
  // form state hooks
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ui state hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // we will redirect to the dashboard if already logged in
  useEffect(() => {
    if (!initialized) return;
    if (token) {
      router.replace("/dashboard");
    }
  }, [initialized, token, router]);

  // what we will show while checking and redirecting
  if (!initialized) return <div>Checking authentication</div>;
  if (token) return <div>Redirecting to dashboard</div>;

  // Backend register endpoint (adjust if different)
  const registerUrl =
    (process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "") +
    "/auth/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // client validation
    if (!firstname.trim() || !lastname.trim() || !email.trim() || !password) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    // compose single `name` field expected by backend
    const name = `${firstname.trim()} ${lastname.trim()}`.trim();

    try {
      const res = await fetch(registerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, // send single name field to match your user.model.js
          email: email.trim(),
          password,
        }),
      });

      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text || "" };
      }

      if (res.status === 401) {
        setError("Unauthorized. Please try again.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const msg =
          data?.message || data?.error || `Registration failed (${res.status}).`;
        setError(msg);
        setLoading(false);
        return;
      }

      // success: backend should return token & user (adapt names if different)
      const token = data?.token || data?.accessToken;
      const user = data?.user || data;

      if (token) {
        try {
          localStorage.setItem("token", token);
        } catch {}
      }
      if (user) {
        try {
          localStorage.setItem("user", JSON.stringify(user));
        } catch {}
      }

      setSuccess("Registration successful. Redirecting to dashboard...");
      setLoading(false);

      // short delay so user sees success message
      setTimeout(() => router.push("/dashboard"), 400);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Network error. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
          Welcome to Smart Krishi
        </h2>

        {error && (
          <div className="my-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </div>
        )}
        {success && (
          <div className="my-4 rounded border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-800">
            {success}
          </div>
        )}

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Khusi"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Khan"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="smartkrishi@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
            disabled={loading}
            aria-busy={loading ? "true" : "false"}
          >
            {loading ? "Creating account..." : "Sign up →"}
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-col space-y-4">
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button"
              onClick={() => setError("Social signup not implemented.")}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                Google
              </span>
              <BottomGradient />
            </button>

            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button"
              onClick={() => setError("Social signup not implemented.")}
            >
              <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                OnlyFans
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
