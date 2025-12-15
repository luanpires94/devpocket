import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snippet } from "../types/snippet";

const STORAGE_KEY = "@devpocket:snippets";

export async function saveSnippets(snippets: Snippet[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

export async function loadSnippets(): Promise<Snippet[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
