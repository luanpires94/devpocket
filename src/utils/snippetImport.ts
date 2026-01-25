import * as FileSystem from "expo-file-system/legacy";
import * as DocumentPicker from "expo-document-picker";
import { Snippet } from "../types/snippet";
import { validateExportFile } from "./snippetExport";

export type ImportMode = "replace" | "merge";

export async function pickImportFile(): Promise<Snippet[] | null> {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return null;
    }

    const fileUri = result.assets[0].uri;

    const fileContent = await FileSystem.readAsStringAsync(fileUri);

    const data = JSON.parse(fileContent);

    if (!validateExportFile(data)) {
      throw new Error("Arquivo inválido. Formato não reconhecido.");
    }

    return data.snippets;
  } catch (error) {
    console.error("Erro ao importar snippets:", error);
    throw error;
  }
}

export function mergeSnippets(
  existingSnippets: Snippet[],
  importedSnippets: Snippet[]
): Snippet[] {
  const existingIds = new Set(existingSnippets.map((s) => s.id));
  const newSnippets = importedSnippets.filter((s) => !existingIds.has(s.id));

  return [...existingSnippets, ...newSnippets];
}

export function replaceSnippets(importedSnippets: Snippet[]): Snippet[] {
  return importedSnippets;
}
