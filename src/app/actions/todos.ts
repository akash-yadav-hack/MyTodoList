"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { todos } from "@/db/schema";

const createTodoSchema = z.object({
  title: z.string().trim().min(1, "Task title is required").max(200),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

const updateTodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1, "Task title is required").max(200),
  priority: z.enum(["low", "medium", "high"]),
});

async function requireUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function createTodo(formData: FormData) {
  const user = await requireUser();
  const parsed = createTodoSchema.safeParse({
    title: formData.get("title"),
    priority: formData.get("priority") || "medium",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await db.insert(todos).values({
    title: parsed.data.title,
    priority: parsed.data.priority,
    userId: user.id,
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function toggleTodo(id: string, completed: boolean) {
  const user = await requireUser();
  await db
    .update(todos)
    .set({ completed })
    .where(and(eq(todos.id, id), eq(todos.userId, user.id)));

  revalidatePath("/dashboard");
}

export async function updateTodo(id: string, title: string, priority: "low" | "medium" | "high") {
  const user = await requireUser();
  const parsed = updateTodoSchema.safeParse({ id, title, priority });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await db
    .update(todos)
    .set({ title: parsed.data.title, priority: parsed.data.priority })
    .where(and(eq(todos.id, parsed.data.id), eq(todos.userId, user.id)));

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteTodo(id: string) {
  const user = await requireUser();
  await db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, user.id)));

  revalidatePath("/dashboard");
}
