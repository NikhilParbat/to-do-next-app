"use client";

import { createContext, useReducer, useContext, ReactNode } from "react";
import { Todo } from "@/lib/types";

type Action =
  | { type: "ADD"; payload: Todo }
  | { type: "TOGGLE"; payload: number }
  | { type: "DELETE"; payload: number };

type TodoContextType = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
};

const TodoContext = createContext<TodoContextType | null>(null);

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used inside TodoProvider");
  }
  return context;
}
