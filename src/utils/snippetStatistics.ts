import { Snippet } from "../types/snippet";
import { CodeLanguage } from "../constants/languages";

export type SnippetStatistics = {
  total: number;
  favorites: number;
  byLanguage: Record<CodeLanguage, number>;
  byTag: Record<string, number>;
  recentCount: number;
  oldestSnippet: Snippet | null;
  newestSnippet: Snippet | null;
  totalTags: number;
  averageTagsPerSnippet: number;
};

export function calculateStatistics(snippets: Snippet[]): SnippetStatistics {
  const total = snippets.length;
  const favorites = snippets.filter((s) => s.isFavorite ?? false).length;

  const byLanguage: Record<CodeLanguage, number> = {} as Record<CodeLanguage, number>;
  snippets.forEach((snippet) => {
    byLanguage[snippet.language] = (byLanguage[snippet.language] || 0) + 1;
  });

  const byTag: Record<string, number> = {};
  snippets.forEach((snippet) => {
    (snippet.tags || []).forEach((tag) => {
      byTag[tag] = (byTag[tag] || 0) + 1;
    });
  });

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentCount = snippets.filter(
    (s) => s.createdAt >= thirtyDaysAgo
  ).length;

  const sortedByDate = [...snippets].sort((a, b) => a.createdAt - b.createdAt);
  const oldestSnippet = sortedByDate[0] || null;
  const newestSnippet = sortedByDate[sortedByDate.length - 1] || null;

  const allTags = snippets.flatMap((s) => s.tags || []);
  const totalTags = new Set(allTags).size;
  const averageTagsPerSnippet =
    total > 0 ? allTags.length / total : 0;

  return {
    total,
    favorites,
    byLanguage,
    byTag,
    recentCount,
    oldestSnippet,
    newestSnippet,
    totalTags,
    averageTagsPerSnippet: Math.round(averageTagsPerSnippet * 10) / 10,
  };
}

export function getTopLanguages(
  stats: SnippetStatistics,
  limit: number = 5
): Array<{ language: CodeLanguage; count: number }> {
  return Object.entries(stats.byLanguage)
    .map(([language, count]) => ({
      language: language as CodeLanguage,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getTopTags(
  stats: SnippetStatistics,
  limit: number = 10
): Array<{ tag: string; count: number }> {
  return Object.entries(stats.byTag)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
