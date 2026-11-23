"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { createTodo, toggleTodo, deleteTodo } from "@/app/actions/todos";
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
  high: "bg-rose-100 text-rose-700 border-rose-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
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
    <div className="min-h-screen bg-[#fdfaf6] text-zinc-900 flex relative overflow-x-hidden">
      {/* Subtle warm ambient glow */}
      <div className="pointer-events-none fixed -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-amber-200/35 blur-3xl" />

      {/* Left Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col justify-between border-r border-zinc-200/80 bg-white p-5">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight px-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm shadow-amber-500/30">
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
                    ? "bg-amber-100/90 text-amber-800 border border-amber-200"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/70"
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
          <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-center space-y-2.5">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Crown className="h-4 w-4" />
            </div>
            <p className="text-sm font-bold text-zinc-900">Go Premium</p>
            <p className="text-xs text-zinc-500">
              Unlock advanced features and boost productivity.
            </p>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center rounded-full bg-amber-500 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors shadow-xs"
            >
              Upgrade Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </button>
          </div>

          {/* User Profile + Sign Out */}
          <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-[#fdfaf6] p-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-zinc-900">
                  {user.name}
                </p>
                <p className="text-[11px] text-zinc-500">Free Plan</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Bar */}
        <header className="h-16 border-b border-zinc-200/80 bg-[#fdfaf6]/85 backdrop-blur-md px-6 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 shadow-2xs"
            >
              <Bell className="h-4 w-4" />
              {pendingCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={handleSignOut}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 hover:text-rose-600"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-8 space-y-7">
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Projects &amp; Priorities</h1>
                <p className="text-sm text-zinc-500 mt-1">Your tasks organized by priority level.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(["high", "medium", "low"] as const).map((level) => {
                  const items = filteredTodos.filter((t) => t.priority === level);
                  return (
                    <div key={level} className="rounded-2xl border border-zinc-200 bg-white p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold capitalize">{level} Priority</span>
                        <span className="text-xs font-semibold text-zinc-400">{items.length}</span>
                      </div>
                      <div className="space-y-2">
                        {items.length === 0 ? (
                          <p className="text-xs text-zinc-400 py-4 text-center">No tasks</p>
                        ) : (
                          items.map((t) => (
                            <div key={t.id} className="rounded-xl border border-zinc-100 bg-[#fdfaf6] p-3 text-xs flex items-center justify-between gap-2">
                              <span className={t.completed ? "line-through text-zinc-400" : "text-zinc-800 font-medium"}>{t.title}</span>
                              <Checkbox
                                checked={t.completed}
                                onCheckedChange={(checked) => startTransition(() => toggleTodo(t.id, Boolean(checked)))}
                                className="border-zinc-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
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
                <p className="text-sm text-zinc-500 mt-1">{todayFormatted}</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3 shadow-xs">
                <h2 className="text-sm font-bold text-amber-600">Scheduled Tasks ({filteredTodos.length})</h2>
                {filteredTodos.length === 0 ? (
                  <p className="text-xs text-zinc-400">No tasks scheduled.</p>
                ) : (
                  filteredTodos.map((t) => (
                    <div key={t.id} className="flex items-center justify-between rounded-xl border border-zinc-100 bg-[#fdfaf6] px-4 py-2.5 text-sm">
                      <span className={t.completed ? "line-through text-zinc-400" : "text-zinc-800 font-medium"}>{t.title}</span>
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
                <p className="text-sm text-zinc-500 mt-1">Your productivity breakdown.</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-700 font-semibold">Completion Rate</span>
                  <span className="font-bold text-amber-600">
                    {totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-zinc-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all"
                    style={{ width: `${totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2 text-center">
                  <div className="rounded-xl bg-[#fdfaf6] p-3 border border-zinc-100">
                    <p className="text-xs text-zinc-500">Total</p>
                    <p className="text-xl font-bold mt-1">{totalCount}</p>
                  </div>
                  <div className="rounded-xl bg-[#fdfaf6] p-3 border border-zinc-100">
                    <p className="text-xs text-zinc-500">Completed</p>
                    <p className="text-xl font-bold text-emerald-600 mt-1">{completedCount}</p>
                  </div>
                  <div className="rounded-xl bg-[#fdfaf6] p-3 border border-zinc-100">
                    <p className="text-xs text-zinc-500">Pending</p>
                    <p className="text-xl font-bold text-amber-600 mt-1">{pendingCount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6 max-w-lg">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-sm text-zinc-500 mt-1">Manage your account details.</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4 shadow-xs">
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
                  <p className="text-sm font-semibold text-amber-600 mt-0.5">Free Plan</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" /> Sign Out
                </button>
              </div>
            </div>
          )}

          {(activeTab === "overview" || activeTab === "tasks") && (
            <>
              {activeTab === "overview" && (
                <>
                  {/* Greeting + Date Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
                        👋 Welcome back,{" "}
                        <span className="text-amber-500">{user.name}!</span>
                      </h1>
                      <p className="text-sm text-zinc-500 mt-1">
                        Let&apos;s get things done today. You&apos;re doing great! 🚀
                      </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-2.5 self-start sm:self-auto shadow-2xs">
                      <Calendar className="h-5 w-5 text-amber-500" />
                      <div>
                        <p className="text-xs font-bold text-zinc-900">
                          {todayFormatted}
                        </p>
                        <p className="text-[11px] text-zinc-500">Stay productive!</p>
                      </div>
                    </div>
                  </div>

                  {/* 4 Stat Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 flex items-center gap-3.5 shadow-xs">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Total Tasks</p>
                        <p className="text-2xl font-bold text-zinc-900">{totalCount}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 flex items-center gap-3.5 shadow-xs">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Completed</p>
                        <p className="text-2xl font-bold text-emerald-600">
                          {completedCount}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 flex items-center gap-3.5 shadow-xs">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Pending</p>
                        <p className="text-2xl font-bold text-amber-600">
                          {pendingCount}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 flex items-center gap-3.5 shadow-xs">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <Flame className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">High Priority</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {highPriorityCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Add Task Bar */}
              <form
                onSubmit={handleAdd}
                className="rounded-2xl border border-amber-300 bg-white p-2.5 shadow-md shadow-amber-900/5 space-y-2"
              >
                {error && <p className="px-2 text-xs text-rose-600">{error}</p>}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="flex flex-1 items-center gap-3 px-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
                      <Plus className="h-4 w-4" />
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Add a new task..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2.5">
                    <select
                      value={priority}
                      onChange={(e) =>
                        setPriority(e.target.value as "low" | "medium" | "high")
                      }
                      className="h-9 rounded-xl border border-zinc-200 bg-[#fdfaf6] px-3 text-xs font-semibold text-zinc-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors shadow-xs disabled:opacity-60"
                    >
                      {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Add Task <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    filter === "all"
                      ? "bg-amber-500 text-white shadow-xs"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  All ({totalCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("pending")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    filter === "pending"
                      ? "bg-amber-500 text-white shadow-xs"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("completed")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    filter === "completed"
                      ? "bg-amber-500 text-white shadow-xs"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  Completed ({completedCount})
                </button>
              </div>

              {/* Empty State or Task List */}
              {filteredTodos.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 py-16 px-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                    <ClipboardList className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">
                    No tasks yet!
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                    Add your first task and start being productive.
                  </p>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.focus()}
                    className="mt-2 inline-flex items-center rounded-full bg-amber-500 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-600 transition-colors shadow-sm shadow-amber-500/25"
                  >
                    <Plus className="mr-1.5 h-4 w-4" /> Add Your First Task
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 shadow-2xs hover:border-amber-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={(checked) =>
                            startTransition(() =>
                              toggleTodo(todo.id, Boolean(checked))
                            )
                          }
                          className="border-zinc-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                        />
                        <span
                          className={`truncate text-sm font-medium ${
                            todo.completed
                              ? "line-through text-zinc-400"
                              : "text-zinc-800"
                          }`}
                        >
                          {todo.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
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
                          className="text-zinc-400 hover:text-rose-600 transition-colors"
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
