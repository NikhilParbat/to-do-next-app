import { NextResponse } from "next/server";
import { db } from "@/db";
import { todos } from "@/db/schema";

export async function GET() {
  try {
    const allTodos = await db.select().from(todos);
    return NextResponse.json(allTodos);
  } catch (err) {
    console.error("GET /api/todos failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title required" },
        { status: 400 }
      );
    }

    await db.insert(todos).values({ title });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/todos failed:", err);
    return NextResponse.json(
      { error: "Failed to add todo" },
      { status: 500 }
    );
  }
}
