import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Snippet } from "../types/snippet";

export async function exportSnippets(snippets: Snippet[]): Promise<void> {
  try {
    const exportData = {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      count: snippets.length,
      snippets,
    };

    const jsonData = JSON.stringify(exportData, null, 2);

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
    const fileName = `devpocket-snippets-${timestamp}.json`;

    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.writeAsStringAsync(fileUri, jsonData);

    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      throw new Error("Compartilhamento não disponível neste dispositivo");
    }

    await Sharing.shareAsync(fileUri, {
      mimeType: "application/json",
      dialogTitle: "Exportar snippets",
      UTI: "public.json",
    });
  } catch (error) {
    console.error("Erro ao exportar snippets:", error);
    throw error;
  }
}

export async function exportSingleSnippet(snippet: Snippet): Promise<void> {
  await exportSnippets([snippet]);
}

export function validateExportFile(data: any): data is {
  version: string;
  exportedAt: string;
  count: number;
  snippets: Snippet[];
} {
  if (!data || typeof data !== "object") {
    return false;
  }

  if (!Array.isArray(data.snippets)) {
    return false;
  }

  return data.snippets.every((snippet: any) => {
    return (
      snippet &&
      typeof snippet === "object" &&
      typeof snippet.id === "string" &&
      typeof snippet.title === "string" &&
      typeof snippet.code === "string" &&
      typeof snippet.language === "string" &&
      Array.isArray(snippet.tags) &&
      (snippet.isFavorite === undefined || typeof snippet.isFavorite === "boolean") &&
      typeof snippet.createdAt === "number" &&
      typeof snippet.updatedAt === "number"
    );
  });
}
