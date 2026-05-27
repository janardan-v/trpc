"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Github } from "lucide-react";

import { useLogin } from "~/hooks/api/auth";

export default function LoginPage() {
  const router = useRouter();

  const { loginWithEmailAndPasswordAsync } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await loginWithEmailAndPasswordAsync({
        email,
        password,
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(
        err?.message ||
        err?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['DM_Sans',sans-serif] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Welcome back
          </h1>

          <p className="text-zinc-400">
            Sign in to continue building forms
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0d0d14] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl">

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>

              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900/50
                  px-4
                  py-3
                  text-white
                  placeholder:text-zinc-600
                  focus:border-indigo-500
                  focus:outline-none
                  focus:ring-1
                  focus:ring-indigo-500/50
                "
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-300">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="
                    text-xs
                    font-medium
                    text-indigo-400
                    hover:text-indigo-300
                  "
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-800
                  bg-zinc-900/50
                  px-4
                  py-3
                  text-white
                  placeholder:text-zinc-600
                  focus:border-indigo-500
                  focus:outline-none
                  focus:ring-1
                  focus:ring-indigo-500/50
                "
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-4
                py-3.5
                font-semibold
                text-white
                shadow-lg
                shadow-indigo-500/20
                transition-all
                hover:bg-indigo-500
                disabled:opacity-50
              "
            >
              {isLoading && (
                <Loader2
                  className="h-5 w-5 animate-spin"
                />
              )}

              {isLoading
                ? "Signing in..."
                : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-zinc-800" />

            <span
              className="
                px-4
                text-xs
                uppercase
                tracking-wider
                text-zinc-500
              "
            >
              OR
            </span>

            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          {/* OAuth */}
          <div className="space-y-3">

            <button
              type="button"
              disabled
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900/50
                px-4
                py-3
                text-zinc-500
                cursor-not-allowed
              "
            >
              Continue with Google
            </button>

            <button
              type="button"
              disabled
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-zinc-800
                bg-zinc-900/50
                px-4
                py-3
                text-zinc-500
                cursor-not-allowed
              "
            >
              <Github className="h-5 w-5" />

              Continue with GitHub
            </button>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-zinc-500">
          New user?{" "}
          <Link
            href="/register"
            className="
              font-medium
              text-indigo-400
              hover:text-indigo-300
            "
          >
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}