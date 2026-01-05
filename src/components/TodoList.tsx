"use client";

import { useTodoStore } from "@/store/todoStore";
import TodoItem from "./TodoItem";
import { useEffect } from "react";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const fetchTodos = useTodoStore((state) => state.fetchTodos);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (todos.length === 0) {
    return <p className="text-gray-500 text-center">No todos yet</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
