import Link from "next/link";
import {
  CheckSquare,
  ArrowRight,
  Play,
  Zap,
  Layers,
  CalendarClock,
  BarChart3,
  CheckCircle2,
  Circle,
  Clock,
  Star,
  LayoutDashboard,
  ListTodo,
  FolderKanban,
  Calendar,
  Settings,
  Bell,
  Search,
} from "lucide-react";

export const instant = false;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fdfaf6] text-zinc-900 selection:bg-amber-200 selection:text-zinc-900 relative overflow-x-hidden">
      {/* Subtle warm ambient blobs */}
      <div className="pointer-events-none fixed -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none fixed top-1/2 -left-32 h-[380px] w-[380px] rounded-full bg-orange-100/60 blur-3xl" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-amber-900/5 bg-[#fdfaf6]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm shadow-amber-500/30">
              <CheckSquare className="h-5 w-5" />
            </span>
            <span>TaskFlow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-500">
            <Link
              href="#home"
              className="text-zinc-900 font-semibold border-b-2 border-amber-500 pb-0.5"
            >
              Home
            </Link>
            <Link href="#features" className="hover:text-zinc-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-zinc-900 transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="hover:text-zinc-900 transition-colors">
              About
            </Link>
            <Link href="#faq" className="hover:text-zinc-900 transition-colors">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors shadow-xs"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition-colors shadow-sm shadow-amber-500/30"
            >
              Get Started <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative mx-auto max-w-6xl px-6 pt-14 pb-16 lg:pt-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 border border-amber-200 px-3.5 py-1 text-xs font-semibold text-amber-800">
                <Zap className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                Your Productivity Partner
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-zinc-900">
                Your Day. Your Priorities.{" "}
                <span className="text-amber-500">Under Control.</span>
              </h1>

              <p className="text-base text-zinc-600 leading-relaxed">
                TaskFlow helps you organize tasks, manage projects, and boost
                productivity — all in one place.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  href="/signup"
                  className="inline-flex items-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors shadow-md shadow-amber-500/25"
                >
                  Start for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-xs"
                >
                  <Play className="mr-2 h-3.5 w-3.5 fill-zinc-800 text-zinc-800" />{" "}
                  Watch Demo
                </Link>
              </div>

              <div className="flex items-center gap-3 pt-2 text-xs font-medium text-zinc-500">
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
                <span>Trusted by 100K+ happy users 🧡</span>
              </div>
            </div>

            {/* Right Light-Mode Dashboard Preview */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-zinc-200/80 bg-white p-4 shadow-2xl shadow-amber-900/10">
                {/* Window Bar */}
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-[11px] text-zinc-400">
                    <Search className="h-3 w-3" /> Search tasks...
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="h-6 w-6 rounded-full bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center">
                      A
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  {/* Mini Sidebar */}
                  <div className="hidden sm:flex col-span-4 flex-col justify-between rounded-2xl bg-[#fdfaf6] p-3 border border-zinc-100">
                    <div className="space-y-1">
                      {[
                        { icon: LayoutDashboard, label: "Overview", active: true },
                        { icon: ListTodo, label: "My Tasks", active: false },
                        { icon: FolderKanban, label: "Projects", active: false },
                        { icon: Calendar, label: "Calendar", active: false },
                        { icon: BarChart3, label: "Analytics", active: false },
                        { icon: Settings, label: "Settings", active: false },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-medium ${
                            item.active
                              ? "bg-amber-100 text-amber-800"
                              : "text-zinc-500"
                          }`}
                        >
                          <item.icon className="h-3.5 w-3.5" />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 p-2.5 text-center space-y-1">
                      <p className="text-[11px] font-semibold text-zinc-800">
                        Go Premium
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        Unlock more features
                      </p>
                      <span className="inline-block rounded-full bg-amber-500 px-3 py-0.5 text-[10px] font-semibold text-white">
                        Upgrade →
                      </span>
                    </div>
                  </div>

                  {/* Mini Main */}
                  <div className="col-span-12 sm:col-span-8 space-y-4">
                    <div>
                      <p className="text-sm font-bold text-zinc-900">
                        Good Morning! 👋
                      </p>
                      <p className="text-xs text-zinc-500">
                        Let&apos;s make today productive.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="rounded-xl border border-zinc-100 bg-[#fdfaf6] p-2.5">
                        <p className="text-[10px] text-zinc-500">Total Tasks</p>
                        <p className="text-lg font-bold text-zinc-900">24</p>
                        <p className="text-[10px] text-emerald-600">+12%</p>
                      </div>
                      <div className="rounded-xl border border-zinc-100 bg-[#fdfaf6] p-2.5">
                        <p className="text-[10px] text-zinc-500">Completed</p>
                        <p className="text-lg font-bold text-emerald-600">18</p>
                        <p className="text-[10px] text-emerald-600">+8%</p>
                      </div>
                      <div className="rounded-xl border border-zinc-100 bg-[#fdfaf6] p-2.5">
                        <p className="text-[10px] text-zinc-500">Pending</p>
                        <p className="text-lg font-bold text-amber-600">6</p>
                        <p className="text-[10px] text-zinc-400">Due today</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-zinc-800">
                          Today&apos;s Tasks
                        </span>
                        <span className="text-amber-600 font-medium">
                          View all →
                        </span>
                      </div>
                      {[
                        {
                          title: "Complete Next.js auth",
                          badge: "High",
                          badgeClass: "bg-rose-100 text-rose-700",
                          done: true,
                        },
                        {
                          title: "Finish Postgres schema",
                          badge: "Medium",
                          badgeClass: "bg-amber-100 text-amber-700",
                          done: false,
                        },
                        {
                          title: "Workout for 30 mins",
                          badge: "Low",
                          badgeClass: "bg-emerald-100 text-emerald-700",
                          done: false,
                        },
                      ].map((t, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-xl border border-zinc-100 bg-white px-3 py-2 text-xs shadow-2xs"
                        >
                          <div className="flex items-center gap-2">
                            {t.done ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <Circle className="h-3.5 w-3.5 text-zinc-300" />
                            )}
                            <span
                              className={
                                t.done
                                  ? "line-through text-zinc-400"
                                  : "text-zinc-700"
                              }
                            >
                              {t.title}
                            </span>
                          </div>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.badgeClass}`}
                          >
                            {t.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Floating 4-Feature Bar */}
          <div
            id="features"
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-lg shadow-amber-900/5"
          >
            {[
              {
                icon: Zap,
                title: "Smart Priority",
                desc: "Focus on what matters most",
              },
              {
                icon: Layers,
                title: "Project Management",
                desc: "Organize tasks into projects",
              },
              {
                icon: CalendarClock,
                title: "Deadline Management",
                desc: "Never miss a deadline",
              },
              {
                icon: BarChart3,
                title: "Productivity Insights",
                desc: "Track your progress",
              },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">{f.title}</h3>
                  <p className="text-xs text-zinc-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 border-t border-zinc-200/70">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Simple Pricing
            </span>
            <h2 className="text-3xl font-bold tracking-tight">
              Choose the plan that fits you
            </h2>
            <p className="text-sm text-zinc-500">Start free, upgrade anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "$0",
                desc: "Perfect for personal use",
                features: ["Basic task management", "Unlimited personal todos", "Secure auth"],
                popular: false,
              },
              {
                name: "Pro",
                price: "$9.99",
                desc: "For power users",
                features: ["Advanced Analytics", "Priority Support", "Unlimited Projects"],
                popular: true,
              },
              {
                name: "Business",
                price: "$19.99",
                desc: "For teams & organizations",
                features: ["Team Collaboration", "Admin Dashboard", "Dedicated Support"],
                popular: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-3xl border p-6 flex flex-col justify-between bg-white ${
                  plan.popular
                    ? "border-amber-500 shadow-xl shadow-amber-500/10"
                    : "border-zinc-200"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{plan.desc}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-sm text-zinc-500">/ month</span>
                  </div>
                  <ul className="mt-6 space-y-2.5 text-sm text-zinc-600">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/signup"
                  className={`mt-8 block w-full rounded-full py-2.5 text-center text-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="about" className="mx-auto max-w-6xl px-6 py-16 border-t border-zinc-200/70">
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
                className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-zinc-600">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="faq" className="border-t border-zinc-200/70 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2 font-semibold text-zinc-900">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-500 text-white">
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
