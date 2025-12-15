import { create } from "zustand";
import { Snippet } from "../types/snippet";
import { loadSnippets, saveSnippets } from "../storage/snippetStorage";

type SnippetState = {
  snippets: Snippet[];
  loadSnippets: () => Promise<void>;
  addSnippet: (data: Omit<Snippet, "id" | "createdAt" | "updatedAt">) => void;
};

export const useSnippetStore = create<SnippetState>((set, get) => ({
  snippets: [],

  loadSnippets: async () => {
    const storedSnippets = await loadSnippets();
    set({ snippets: storedSnippets });
  },

  addSnippet: (data) => {
    const newSnippet: Snippet = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updatedSnippets = [...get().snippets, newSnippet];

    set({ snippets: updatedSnippets });
    saveSnippets(updatedSnippets);
  },
}));
