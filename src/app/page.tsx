import Link from "next/link";

export const instant = false;
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  CheckSquare,
  ArrowRight,
  Play,
  Sparkles,
  FolderKanban,
  CalendarClock,
  BarChart3,
  CheckCircle2,
  Circle,
  Clock,
  Star,
} from "lucide-react";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Ambient top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.14),transparent_65%)]" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0b0f]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-zinc-950">
              <CheckSquare className="h-5 w-5" />
            </span>
            <span>TaskFlow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <Link href="#home" className="text-amber-400 font-medium">
              Home
            </Link>
            <Link href="#features" className="hover:text-zinc-100 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-zinc-100 transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="hover:text-zinc-100 transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              asChild
              className="text-zinc-300 hover:text-white hover:bg-white/5"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-amber-500 text-zinc-950 hover:bg-amber-400 font-semibold"
            >
              <Link href="/signup">
                Get Started <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 lg:pt-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                Your Productivity Partner
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Your Day. Your Priorities.{" "}
                <span className="text-amber-400">Under Control.</span>
              </h1>

              <p className="max-w-lg text-base sm:text-lg text-zinc-400 leading-relaxed">
                TaskFlow helps you organize tasks, manage projects, and boost
                productivity — all in one clean, distraction-free workspace.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  size="lg"
                  asChild
                  className="bg-amber-500 text-zinc-950 hover:bg-amber-400 font-semibold h-12 px-6"
                >
                  <Link href="/signup">
                    Start for Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white/15 bg-white/5 text-zinc-100 hover:bg-white/10 h-12 px-6"
                >
                  <Link href="#features">
                    <Play className="mr-2 h-4 w-4 fill-current" /> Watch Demo
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-3 pt-3 text-sm text-zinc-400">
                <div className="flex -space-x-2">
                  {["bg-amber-500", "bg-emerald-500", "bg-sky-500", "bg-rose-500"].map(
                    (color, i) => (
                      <div
                        key={i}
                        className={`h-7 w-7 rounded-full border-2 border-[#0a0b0f] ${color} flex items-center justify-center text-[10px] font-bold text-zinc-950`}
                      >
                        {["A", "S", "R", "P"][i]}
                      </div>
                    )
                  )}
                </div>
                <span>Trusted by 100K+ happy users</span>
              </div>
            </div>

            {/* Right Dashboard Mockup */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl border border-white/10 bg-[#12141c] p-4 shadow-2xl shadow-amber-500/10">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs text-zinc-500">TaskFlow Workspace</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">
                      Good Morning! 👋
                    </p>
                    <p className="text-xs text-zinc-400">
                      Let&apos;s complete your tasks today.
                    </p>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[11px] text-zinc-400">Total Tasks</p>
                      <p className="mt-1 text-xl font-bold text-zinc-100">24</p>
                      <p className="text-[10px] text-emerald-400">+12% this week</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[11px] text-zinc-400">Completed</p>
                      <p className="mt-1 text-xl font-bold text-emerald-400">18</p>
                      <p className="text-[10px] text-emerald-400">75% done</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[11px] text-zinc-400">Pending</p>
                      <p className="mt-1 text-xl font-bold text-amber-400">6</p>
                      <p className="text-[10px] text-zinc-400">Due today</p>
                    </div>
                  </div>

                  {/* Today's Tasks */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-200">Today&apos;s Tasks</span>
                      <span className="text-amber-400">View all →</span>
                    </div>

                    {[
                      {
                        title: "Complete Next.js authentication",
                        badge: "High",
                        badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
                        done: true,
                      },
                      {
                        title: "Finish Postgres schema & Drizzle",
                        badge: "Medium",
                        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
                        done: false,
                      },
                      {
                        title: "Workout for 30 mins",
                        badge: "Low",
                        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                        done: false,
                      },
                    ].map((task, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-[#0d0f15] px-3 py-2 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          {task.done ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Circle className="h-4 w-4 text-zinc-500" />
                          )}
                          <span className={task.done ? "line-through text-zinc-500" : "text-zinc-200"}>
                            {task.title}
                          </span>
                        </div>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${task.badgeColor}`}
                        >
                          {task.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-20 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
              Powerful Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything you need to stay productive
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              From simple daily to-dos to organized projects — TaskFlow keeps your
              workflow effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Sparkles,
                title: "Smart Priority",
                desc: "Focus on what matters with High, Medium & Low priority levels.",
              },
              {
                icon: FolderKanban,
                title: "Project Management",
                desc: "Organize tasks into clean lists for a smoother daily workflow.",
              },
              {
                icon: CalendarClock,
                title: "Deadline Tracking",
                desc: "Never miss a deadline with clear due dates and reminders.",
              },
              {
                icon: BarChart3,
                title: "Productivity Insights",
                desc: "Track your completed tasks and daily momentum at a glance.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#12141c] p-6 hover:border-amber-500/40 transition-colors"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-zinc-100 mb-1.5">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Section */}
        <section id="about" className="mx-auto max-w-6xl px-6 py-20 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Kanban Preview */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-[#12141c] p-4">
              {[
                {
                  col: "To Do",
                  dot: "bg-amber-400",
                  items: ["Build auth system", "Design dashboard", "Write tests"],
                },
                {
                  col: "In Progress",
                  dot: "bg-sky-400",
                  items: ["API integration", "UI polish"],
                },
                {
                  col: "Done",
                  dot: "bg-emerald-400",
                  items: ["Setup database", "Deploy staging"],
                },
              ].map((col, idx) => (
                <div key={idx} className="rounded-xl bg-[#0b0c10] p-3 space-y-2.5 border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                    {col.col}
                  </div>
                  {col.items.map((item, j) => (
                    <div
                      key={j}
                      className="rounded-lg border border-white/10 bg-[#151822] p-2.5 text-[11px] text-zinc-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Right Copy */}
            <div className="space-y-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                Why Choose TaskFlow?
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Built for Productivity, Designed for You
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                A modern, intuitive platform that adapts to your workflow. Whether
                you&apos;re a student, developer, or creator — TaskFlow helps you
                get more done.
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-300">
                {[
                  "Clean & Modern UI",
                  "Fast Server-Backed Sync",
                  "Secure & Private by Default",
                  "Free Forever Personal Plan",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
              Simple &amp; Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Choose the plan that fits you
            </h2>
            <p className="text-zinc-400 text-sm">Start free, upgrade anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                subtitle: "Perfect for personal use",
                price: "$0",
                features: ["Basic task management", "Unlimited personal todos", "Secure auth"],
                cta: "Get Started Free",
                popular: false,
              },
              {
                name: "Pro",
                subtitle: "For power users",
                price: "$9.99",
                features: ["Advanced Analytics", "Priority Support", "Unlimited Projects"],
                cta: "Upgrade to Pro",
                popular: true,
              },
              {
                name: "Business",
                subtitle: "For teams & organizations",
                price: "$19.99",
                features: ["Team Collaboration", "Admin Dashboard", "Dedicated Support"],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border p-6 flex flex-col justify-between ${
                  plan.popular
                    ? "border-amber-500 bg-[#14161f] shadow-lg shadow-amber-500/10"
                    : "border-white/10 bg-[#12141c]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-semibold text-zinc-950">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{plan.subtitle}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-sm text-zinc-400">/ month</span>
                  </div>
                  <ul className="mt-6 space-y-2.5 text-sm text-zinc-300">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  asChild
                  className={`mt-8 w-full ${
                    plan.popular
                      ? "bg-amber-500 text-zinc-950 hover:bg-amber-400 font-semibold"
                      : "bg-white/10 text-zinc-100 hover:bg-white/15"
                  }`}
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-6xl px-6 py-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Khan",
                role: "Student",
                quote: "TaskFlow has completely changed the way I manage my study tasks!",
              },
              {
                name: "Rohan Mehta",
                role: "Developer",
                quote: "Clean UI, powerful features, and super easy to use every day.",
              },
              {
                name: "Priya Sharma",
                role: "Creator",
                quote: "Finally, a to-do app that actually helps me stay organized!",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#12141c] p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-zinc-400">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-zinc-300">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#08090c] py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-2 font-semibold text-zinc-200">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-500 text-zinc-950">
              <Clock className="h-3.5 w-3.5" />
            </span>
            TaskFlow
          </div>
          <p>© {new Date().getFullYear()} TaskFlow. Plan Better. Achieve More.</p>
        </div>
      </footer>
    </div>
  );
}
