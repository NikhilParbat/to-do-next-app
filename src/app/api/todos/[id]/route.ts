import { NextResponse } from "next/server";
import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const todoId = Number(id);

  const [todo] = await db
    .select({ completed: todos.completed })
    .from(todos)
    .where(eq(todos.id, todoId));

  if (!todo) {
    return NextResponse.json(
      { error: "Todo not found" },
      { status: 404 }
    );
  }

  await db
    .update(todos)
    .set({ completed: !todo.completed })
    .where(eq(todos.id, todoId));

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const todoId = Number(id);

  await db.delete(todos).where(eq(todos.id, todoId));

  return NextResponse.json({ success: true });
}

