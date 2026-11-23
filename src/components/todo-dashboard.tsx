"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { createTodo, toggleTodo, deleteTodo } from "@/app/actions/todos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckSquare,
  LogOut,
  Plus,
  Trash2,
  Loader2,
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
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [error, setError] = useState<string | null>(null);

  const totalCount = initialTodos.length;
  const completedCount = initialTodos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  const filteredTodos = initialTodos.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
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

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-zinc-100">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-[#0a0b0f]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-zinc-950">
              <CheckSquare className="h-5 w-5" />
            </span>
            <span>TaskFlow</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-zinc-400">
              {user.name}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
            >
              <LogOut className="mr-1.5 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, <span className="text-amber-400">{user.name}</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Here&apos;s an overview of your tasks today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-[#12141c] p-4">
            <p className="text-xs text-zinc-400">Total Tasks</p>
            <p className="mt-1 text-2xl font-bold">{totalCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#12141c] p-4">
            <p className="text-xs text-zinc-400">Completed</p>
            <p className="mt-1 text-2xl font-bold text-emerald-400">
              {completedCount}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#12141c] p-4">
            <p className="text-xs text-zinc-400">Pending</p>
            <p className="mt-1 text-2xl font-bold text-amber-400">
              {pendingCount}
            </p>
          </div>
        </div>

        {/* Add Task Form */}
        <form
          onSubmit={handleAdd}
          className="rounded-2xl border border-white/10 bg-[#12141c] p-4 space-y-3"
        >
          {error && (
            <p className="text-xs text-rose-400">{error}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border-white/10 bg-[#0a0b0f] text-zinc-100 placeholder:text-zinc-500"
            />
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "low" | "medium" | "high")
              }
              className="h-9 rounded-md border border-white/10 bg-[#0a0b0f] px-3 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-amber-500 text-zinc-950 hover:bg-amber-400 font-semibold"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Plus className="mr-1.5 h-4 w-4" /> Add Task
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          {(["all", "pending", "completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                filter === tab
                  ? "bg-amber-500 text-zinc-950"
                  : "bg-white/5 text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-2.5">
          {filteredTodos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#12141c]/50 p-10 text-center text-sm text-zinc-500">
              No tasks here yet. Add one above to get started!
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#12141c] px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={(checked) =>
                      startTransition(() => toggleTodo(todo.id, Boolean(checked)))
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
            ))
          )}
        </div>
      </main>
    </div>
  );
}
