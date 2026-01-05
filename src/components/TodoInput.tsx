"use client";

import { useState } from "react";
import { useTodoStore } from "@/store/todoStore";

export default function TodoInput() {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    await addTodo(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  );
}
