import { create } from "zustand";
import { Snippet } from "../types/snippet";

type SnippetState = {
  snippets: Snippet[];
  addSnippet: (data: Omit<Snippet, "id" | "createdAt" | "updatedAt">) => void;
};

export const useSnippetStore = create<SnippetState>((set) => ({
  snippets: [],

  addSnippet: (data) =>
    set((state) => ({
      snippets: [
        ...state.snippets,
        {
          ...data,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
    })),
}));
