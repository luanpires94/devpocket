import { create } from "zustand";
import { Snippet } from "../types/snippet";
import { loadSnippets, saveSnippets } from "../storage/snippetStorage";
import { generateId } from "../utils/generateId";
import "react-native-get-random-values";
import { LANGUAGES } from "../constants/languages";
import { FREE_SNIPPET_LIMIT } from "./premiumStore";

type SnippetState = {
  snippets: Snippet[];
  loadSnippets: () => Promise<void>;
  addSnippet: (
    data: Omit<Snippet, "id" | "createdAt" | "updatedAt">,
    isPremium: boolean
  ) => { success: boolean; error?: "LIMIT_REACHED" };
  updateSnippet: (
    id: string,
    data: Omit<Snippet, "id" | "createdAt" | "updatedAt">
  ) => void;
  deleteSnippet: (id: string) => void;
  toggleFavorite: (id: string) => void;
  replaceSnippets: (snippets: Snippet[]) => void;
  mergeSnippets: (snippets: Snippet[]) => void;
};

export const useSnippetStore = create<SnippetState>((set, get) => ({
  snippets: [],

  loadSnippets: async () => {
    const storedSnippets = await loadSnippets();

    const normalized = storedSnippets.map((snippet) => {
      const isValid = LANGUAGES.some((l) => l.value === snippet.language);

      return {
        ...snippet,
        language: isValid ? snippet.language : "javascript",
        isFavorite: snippet.isFavorite ?? false, // Garante que sempre tenha o campo
      };
    });

    set({ snippets: normalized });
  },

  addSnippet: (data, isPremium) => {
    if (!isPremium) {
      const currentCount = get().snippets.length;
      if (currentCount >= FREE_SNIPPET_LIMIT) {
        return { success: false, error: "LIMIT_REACHED" };
      }
    }

    const newSnippet: Snippet = {
      ...data,
      id: generateId(),
      isFavorite: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updatedSnippets = [...get().snippets, newSnippet];
    set({ snippets: updatedSnippets });
    saveSnippets(updatedSnippets);
    return { success: true };
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

  toggleFavorite: (id) => {
    const updatedSnippets = get().snippets.map((snippet) =>
      snippet.id === id
        ? { ...snippet, isFavorite: !(snippet.isFavorite ?? false), updatedAt: Date.now() }
        : snippet
    );

    set({ snippets: updatedSnippets });
    saveSnippets(updatedSnippets);
  },

  replaceSnippets: (snippets) => {
    set({ snippets });
    saveSnippets(snippets);
  },

  mergeSnippets: (newSnippets) => {
    const existingSnippets = get().snippets;
    const existingIds = new Set(existingSnippets.map((s) => s.id));
    const uniqueNewSnippets = newSnippets.filter(
      (s) => !existingIds.has(s.id)
    );
    const mergedSnippets = [...existingSnippets, ...uniqueNewSnippets];

    set({ snippets: mergedSnippets });
    saveSnippets(mergedSnippets);
  },
}));
