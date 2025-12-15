import { create } from "zustand";
import { Snippet } from "../types/snippet";
import { loadSnippets, saveSnippets } from "../storage/snippetStorage";
import { generateId } from "../utils/generateId";
import "react-native-get-random-values";

type SnippetState = {
  snippets: Snippet[];
  loadSnippets: () => Promise<void>;
  addSnippet: (data: Omit<Snippet, "id" | "createdAt" | "updatedAt">) => void;
  updateSnippet: (
    id: string,
    data: Omit<Snippet, "id" | "createdAt" | "updatedAt">
  ) => void;
  deleteSnippet: (id: string) => void;
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
      id: generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updatedSnippets = [...get().snippets, newSnippet];
    set({ snippets: updatedSnippets });
    saveSnippets(updatedSnippets);
  },

  updateSnippet: (id, data) => {
    const updatedSnippets = get().snippets.map((snippet) =>
      snippet.id === id
        ? { ...snippet, ...data, updatedAt: Date.now() }
        : snippet
    );

    set({ snippets: updatedSnippets });
    saveSnippets(updatedSnippets);
  },

  deleteSnippet: (id) => {
    const updatedSnippets = get().snippets.filter(
      (snippet) => snippet.id !== id
    );

    set({ snippets: updatedSnippets });
    saveSnippets(updatedSnippets);
  },
}));
