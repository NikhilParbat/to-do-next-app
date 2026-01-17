"use client";

import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center pt-20">
      <div className="w-full max-w-md bg-blue p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Smart Todo App</h1>

        <TodoInput />
        <TodoList />

        <div className="mt-4 text-center">
          <Link href="/stats" className="text-purple-600 hover:underline">
            View Stats
          </Link>
        </div>
      </div>
    </main>
  );
}
