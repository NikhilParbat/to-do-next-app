"use client";

import { Todo } from "@/lib/types";
import { useTodoStore } from "@/store/TodoStore";

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <li className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`cursor-pointer flex-1 ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.title}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        ❌
      </button>
    </li>
  );
}
