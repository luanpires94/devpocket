import { create } from "zustand";
import { Snippet } from "../types/snippet";
import { loadSnippets, saveSnippets } from "../storage/snippetStorage";
import { generateId } from "../utils/generateId";

type SnippetState = {
  snippets: Snippet[];
  loadSnippets: () => Promise<void>;
  addSnippet: (data: Omit<Snippet, "id" | "createdAt" | "updatedAt">) => void;
  updateSnippet: (
    id: string,
    updatedData: Omit<Snippet, "id" | "createdAt" | "updatedAt">
  ) => void;
};

export const useSnippetStore = create<SnippetState>((set, get) => ({
  snippets: [],

  loadSnippets: async () => {
    const storedSnippets = await loadSnippets();
    set({ snippets: storedSnippets });
  },

  addSnippet: (data) => {
    const newSnippet = {
      ...data,
      id: generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updatedSnippets = [...get().snippets, newSnippet];
    set({ snippets: updatedSnippets });
    saveSnippets(updatedSnippets);
  },

  updateSnippet: (id, updatedData) => {
    const updatedSnippets = get().snippets.map((snippet) =>
      snippet.id === id
        ? { ...snippet, ...updatedData, updatedAt: Date.now() }
        : snippet
    );
    set({ snippets: updatedSnippets });
    saveSnippets(updatedSnippets);
  },
}));
