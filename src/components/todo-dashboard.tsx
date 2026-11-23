"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { createTodo, toggleTodo, deleteTodo } from "@/app/actions/todos";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckSquare,
  LayoutDashboard,
  ListTodo,
  FolderKanban,
  Calendar,
  BarChart3,
  Settings,
  Crown,
  Search,
  Bell,
  LogOut,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  Clock,
  Flame,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
};

type User = {
  id: string;
  name: string;
  email: string;
};

const priorityStyles: Record<Todo["priority"], string> = {
  high: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  low: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export function TodoDashboard({
  user,
  initialTodos,
}: {
  user: User;
  initialTodos: Todo[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<
    "overview" | "tasks" | "projects" | "calendar" | "analytics" | "settings"
  >("overview");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [error, setError] = useState<string | null>(null);

  const totalCount = initialTodos.length;
  const completedCount = initialTodos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const highPriorityCount = initialTodos.filter(
    (t) => t.priority === "high" && !t.completed
  ).length;

  const filteredTodos = initialTodos.filter((t) => {
    const matchesFilter =
      filter === "pending"
        ? !t.completed
        : filter === "completed"
          ? t.completed
          : true;
    const matchesSearch = t.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Please enter a task title");
      return;
    }

    const formData = new FormData();
    formData.set("title", title.trim());
    formData.set("priority", priority);

    startTransition(async () => {
      const res = await createTodo(formData);
      if (res?.error) {
        setError(res.error);
        return;
      }
      setTitle("");
      setPriority("medium");
    });
  }

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  const navItems = [
    { id: "overview", icon: LayoutDashboard, label: "Overview" },
    { id: "tasks", icon: ListTodo, label: "My Tasks" },
    { id: "projects", icon: FolderKanban, label: "Projects" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-zinc-100 flex">
      {/* Ambient top-right glow */}
      <div className="pointer-events-none fixed right-0 top-0 h-[420px] w-[520px] bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.12),transparent_65%)]" />

      {/* Left Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col justify-between border-r border-white/10 bg-[#0d0f15] p-5">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight px-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-zinc-950">
              <CheckSquare className="h-5 w-5" />
            </span>
            <span>TaskFlow</span>
          </Link>

          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300 border border-amber-500/30"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          {/* Go Premium Card */}
          <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/10 to-[#12141c] p-4 text-center space-y-2.5">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
              <Crown className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold">Go Premium</p>
            <p className="text-xs text-zinc-400">
              Unlock advanced features and boost productivity.
            </p>
            <Button
              size="sm"
              className="w-full bg-amber-500 text-zinc-950 hover:bg-amber-400 font-semibold text-xs"
            >
              Upgrade Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* User Profile + Sign Out */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#12141c] p-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-zinc-950">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-zinc-100">
                  {user.name}
                </p>
                <p className="text-[11px] text-zinc-400">Free Plan</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-rose-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/10 bg-[#0a0b0f]/80 backdrop-blur-md px-6 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#12141c] py-2 pl-9 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/50 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#12141c] text-zinc-400 hover:text-zinc-100"
            >
              <Bell className="h-4 w-4" />
              {pendingCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {pendingCount}
                </span>
              )}
            </button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="lg:hidden border-white/10 bg-[#12141c] text-zinc-200 hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-8 space-y-7">
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Projects &amp; Priorities</h1>
                <p className="text-sm text-zinc-400 mt-1">Your tasks organized by priority level.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(["high", "medium", "low"] as const).map((level) => {
                  const items = filteredTodos.filter((t) => t.priority === level);
                  return (
                    <div key={level} className="rounded-2xl border border-white/10 bg-[#12141c] p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold capitalize">{level} Priority</span>
                        <span className="text-xs text-zinc-400">{items.length}</span>
                      </div>
                      <div className="space-y-2">
                        {items.length === 0 ? (
                          <p className="text-xs text-zinc-500 py-4 text-center">No tasks</p>
                        ) : (
                          items.map((t) => (
                            <div key={t.id} className="rounded-xl border border-white/10 bg-[#0a0b0f] p-3 text-xs flex items-center justify-between gap-2">
                              <span className={t.completed ? "line-through text-zinc-500" : "text-zinc-200"}>{t.title}</span>
                              <Checkbox
                                checked={t.completed}
                                onCheckedChange={(checked) => startTransition(() => toggleTodo(t.id, Boolean(checked)))}
                                className="border-white/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                              />
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
                <p className="text-sm text-zinc-400 mt-1">{todayFormatted}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#12141c] p-5 space-y-3">
                <h2 className="text-sm font-semibold text-amber-400">Scheduled Tasks ({filteredTodos.length})</h2>
                {filteredTodos.length === 0 ? (
                  <p className="text-xs text-zinc-500">No tasks scheduled.</p>
                ) : (
                  filteredTodos.map((t) => (
                    <div key={t.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0b0f] px-4 py-2.5 text-sm">
                      <span className={t.completed ? "line-through text-zinc-500" : "text-zinc-100"}>{t.title}</span>
                      <span className="text-xs text-zinc-400">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                <p className="text-sm text-zinc-400 mt-1">Your productivity breakdown.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#12141c] p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-300 font-medium">Completion Rate</span>
                  <span className="font-bold text-amber-400">
                    {totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all"
                    style={{ width: `${totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                  <div className="rounded-xl bg-[#0a0b0f] p-3 border border-white/10">
                    <p className="text-xs text-zinc-400">Total</p>
                    <p className="text-xl font-bold mt-1">{totalCount}</p>
                  </div>
                  <div className="rounded-xl bg-[#0a0b0f] p-3 border border-white/10">
                    <p className="text-xs text-zinc-400">Completed</p>
                    <p className="text-xl font-bold text-emerald-400 mt-1">{completedCount}</p>
                  </div>
                  <div className="rounded-xl bg-[#0a0b0f] p-3 border border-white/10">
                    <p className="text-xs text-zinc-400">Pending</p>
                    <p className="text-xl font-bold text-amber-400 mt-1">{pendingCount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6 max-w-lg">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-sm text-zinc-400 mt-1">Manage your account details.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#12141c] p-6 space-y-4">
                <div>
                  <p className="text-xs text-zinc-400">Name</p>
                  <p className="text-sm font-semibold mt-0.5">{user.name}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Email</p>
                  <p className="text-sm font-semibold mt-0.5">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Plan</p>
                  <p className="text-sm font-semibold text-amber-400 mt-0.5">Free Plan</p>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            </div>
          )}

          {(activeTab === "overview" || activeTab === "tasks") && (
            <>
          {/* Greeting + Date Card */}
          {activeTab === "overview" && (
          <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                👋 Welcome back,{" "}
                <span className="text-amber-400">{user.name}!</span>
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Let&apos;s get things done today. You&apos;re doing great! 🚀
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-[#12141c] px-4 py-2.5 self-start sm:self-auto">
              <Calendar className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-xs font-semibold text-zinc-100">
                  {todayFormatted}
                </p>
                <p className="text-[11px] text-zinc-400">Stay productive!</p>
              </div>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/10 to-[#12141c] p-4 flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Total Tasks</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-[#12141c] p-4 flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Completed</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {completedCount}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-[#12141c] p-4 flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Pending</p>
                <p className="text-2xl font-bold text-amber-400">
                  {pendingCount}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-[#12141c] p-4 flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-zinc-400">High Priority</p>
                <p className="text-2xl font-bold text-purple-400">
                  {highPriorityCount}
                </p>
              </div>
            </div>
          </div>

          {/* Glowing Add Task Bar */}
          </>
          )}
          <form
            onSubmit={handleAdd}
            className="rounded-2xl border border-amber-500/40 bg-[#12141c] p-2.5 shadow-lg shadow-amber-500/5 space-y-2"
          >
            {error && <p className="px-2 text-xs text-rose-400">{error}</p>}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="flex flex-1 items-center gap-3 px-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-zinc-950">
                  <Plus className="h-4 w-4" />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Add a new task..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as "low" | "medium" | "high")
                  }
                  className="h-9 rounded-xl border border-white/10 bg-[#0a0b0f] px-3 text-xs font-medium text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-amber-500 text-zinc-950 hover:bg-amber-400 font-semibold px-4"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Add Task <ArrowRight className="ml-1.5 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === "all"
                  ? "bg-amber-500 text-zinc-950"
                  : "border border-white/10 bg-[#12141c] text-zinc-400 hover:text-zinc-100"
              }`}
            >
              All ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("pending")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === "pending"
                  ? "bg-amber-500 text-zinc-950"
                  : "border border-white/10 bg-[#12141c] text-zinc-400 hover:text-zinc-100"
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("completed")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === "completed"
                  ? "bg-amber-500 text-zinc-950"
                  : "border border-white/10 bg-[#12141c] text-zinc-400 hover:text-zinc-100"
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          {/* Empty State or Task List */}
          {filteredTodos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-[#12141c]/50 py-16 px-6 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100">
                No tasks yet!
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Add your first task and start being productive.
              </p>
              <Button
                type="button"
                onClick={() => inputRef.current?.focus()}
                className="mt-2 rounded-xl bg-amber-500 text-zinc-950 hover:bg-amber-400 font-semibold"
              >
                <Plus className="mr-1.5 h-4 w-4" /> Add Your First Task
              </Button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#12141c] px-4 py-3 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={(checked) =>
                        startTransition(() =>
                          toggleTodo(todo.id, Boolean(checked))
                        )
                      }
                      className="border-white/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <span
                      className={`truncate text-sm ${
                        todo.completed
                          ? "line-through text-zinc-500"
                          : "text-zinc-100"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize ${
                        priorityStyles[todo.priority]
                      }`}
                    >
                      {todo.priority}
                    </span>
                    <button
                      onClick={() =>
                        startTransition(() => deleteTodo(todo.id))
                      }
                      aria-label="Delete task"
                      className="text-zinc-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
