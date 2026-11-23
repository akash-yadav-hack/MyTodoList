"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signUp } from "@/lib/auth-client";
import {
  CheckSquare,
  Loader2,
  Zap,
  CheckCircle2,
  CalendarClock,
  BarChart3,
  FolderKanban,
  User,
  Mail,
  Lock,
  ArrowRight,
  UserPlus,
  LogIn,
} from "lucide-react";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = signupSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    const { error: authError } = await signUp.email({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setLoading(false);

    if (authError) {
      setError(authError.message || "Could not create account");
      return;
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-zinc-900 relative overflow-x-hidden flex flex-col">
      <div className="pointer-events-none fixed -top-32 -right-32 h-[460px] w-[460px] rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 -left-32 h-[380px] w-[380px] rounded-full bg-orange-100/60 blur-3xl" />

      {/* Top Bar */}
      <header className="relative z-10 mx-auto w-full max-w-6xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm shadow-amber-500/30">
            <CheckSquare className="h-5 w-5" />
          </span>
          <span>TaskFlow</span>
        </Link>

        <div className="flex items-center gap-3 text-sm">
          <span className="hidden sm:inline text-zinc-500">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-1.5 font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors shadow-2xs"
          >
            Sign In <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Split Content */}
      <main className="relative z-10 flex-1 mx-auto w-full max-w-6xl px-6 py-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Marketing Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 border border-amber-200 px-3.5 py-1 text-xs font-semibold text-amber-800">
              <Zap className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              Plan • Organize • Achieve
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
              Your Day. Your Priorities.{" "}
              <span className="text-amber-500">Under Control.</span>
            </h1>

            <p className="text-base text-zinc-600 max-w-md leading-relaxed">
              TaskFlow helps you manage tasks, projects, and boost productivity
              — all in one place.
            </p>

            <ul className="space-y-3 text-sm text-zinc-700 pt-1">
              {[
                { icon: CheckCircle2, label: "Smart Task Management" },
                { icon: CalendarClock, label: "Deadline Reminders" },
                { icon: BarChart3, label: "Productivity Insights" },
                { icon: FolderKanban, label: "Project Organization" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{item.label}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 pt-3 text-xs font-medium text-zinc-500">
              <div className="flex -space-x-2">
                {["bg-amber-500", "bg-emerald-500", "bg-sky-500", "bg-rose-500"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className={`h-7 w-7 rounded-full border-2 border-[#fdfaf6] ${color} flex items-center justify-center text-[10px] font-bold text-white`}
                    >
                      {["A", "S", "R", "P"][i]}
                    </div>
                  )
                )}
              </div>
              <span>Trusted by 100K+ happy users</span>
            </div>
          </div>

          {/* Right Auth Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-3xl border border-zinc-200/80 bg-white p-7 shadow-2xl shadow-amber-900/10 space-y-6">
              {/* Toggle Pill */}
              <div className="grid grid-cols-2 rounded-full bg-zinc-100 p-1 text-xs font-semibold">
                <span className="flex items-center justify-center gap-1.5 rounded-full bg-amber-500 py-2 text-white shadow-xs">
                  <UserPlus className="h-3.5 w-3.5" /> Create Account
                </span>
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-1.5 rounded-full py-2 text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  <LogIn className="h-3.5 w-3.5" /> Sign In
                </Link>
              </div>

              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold text-zinc-900">
                  Create an account
                </h2>
                <p className="text-xs text-zinc-500">
                  Start your productivity journey with TaskFlow
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-700">
                    {error}
                  </div>
                )}

                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Password (min. 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center rounded-full bg-amber-500 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors shadow-md shadow-amber-500/25 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                    </>
                  ) : (
                    <>
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-[11px] text-center text-zinc-400">
                By creating an account, you agree to our{" "}
                <span className="text-amber-600">Terms of Service</span> and{" "}
                <span className="text-amber-600">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
