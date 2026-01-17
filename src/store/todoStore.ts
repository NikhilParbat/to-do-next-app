import { create } from "zustand"
import { Todo } from "@/lib/types"

type TodoStore = {
  todos: Todo[]
  fetchTodos: () => Promise<void>
  addTodo: (title: string) => Promise<void>
  toggleTodo: (id: number) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  fetchTodos: async () => {
  const res = await fetch("/api/todos");

  if (!res.ok) {
    console.log("Failed to fetch todos");
    return;
  }

  const text = await res.text();

  if (!text) {
    console.log("Empty response from /api/todos");
    return;
  }

  const data = JSON.parse(text);
  set({ todos: data });
},

addTodo: async (title) => {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    console.error("Failed to add todo");
    return;
  }

  const getRes = await fetch("/api/todos");

  if (!getRes.ok) {
    console.error("Failed to refetch todos");
    return;
  }

  const data = await getRes.json();
  set({ todos: data });
},


  toggleTodo: async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "PATCH",
    })

    const res = await fetch("/api/todos")
    const data = await res.json()
    set({ todos: data })
  },

  deleteTodo: async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })

    const res = await fetch("/api/todos")
    const data = await res.json()
    set({ todos: data })
  },
}))
