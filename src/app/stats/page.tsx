"use client";

import { useTodoStore } from "@/store/todoStore";
import Link from "next/link";

export default function StatsPage() {
  const todos = useTodoStore((state) => state.todos);

  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.length - completed;

  return (
    <main className="flex justify-center pt-20">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Todo Statistics</h2>

        <div className="space-y-2">
          <p>Total: {todos.length}</p>
          <p>Completed: {completed}</p>
          <p>Pending: {pending}</p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
