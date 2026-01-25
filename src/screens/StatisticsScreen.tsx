import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { useSnippetStore } from "../store/snippetStore";
import { useTheme } from "../theme/ThemeProvider";
import { spacing } from "../theme/tokens";
import {
  calculateStatistics,
  getTopLanguages,
  getTopTags,
} from "../utils/snippetStatistics";
import { LANGUAGES } from "../constants/languages";

export function StatisticsScreen() {
  const { snippets, loadSnippets } = useSnippetStore();
  const { colors } = useTheme();

  const [stats, setStats] = useState(calculateStatistics(snippets));

  useEffect(() => {
    loadSnippets();
  }, []);

  useEffect(() => {
    setStats(calculateStatistics(snippets));
  }, [snippets]);

  const topLanguages = getTopLanguages(stats, 5);
  const topTags = getTopTags(stats, 10);

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryRow}>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryContent}>
              <MaterialIcons name="code" size={32} color={colors.primary} />
              <Text style={[styles.summaryNumber, { color: colors.text }]}>
                {stats.total}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.placeholder }]}>
                Total de Snippets
              </Text>
            </View>
          </Card>

          <Card style={styles.summaryCard}>
            <View style={styles.summaryContent}>
              <MaterialIcons name="star" size={32} color="#FBBF24" />
              <Text style={[styles.summaryNumber, { color: colors.text }]}>
                {stats.favorites}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.placeholder }]}>
                Favoritos
              </Text>
            </View>
          </Card>
        </View>

        <View style={styles.summaryRow}>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryContent}>
              <MaterialIcons name="local-offer" size={32} color={colors.primary} />
              <Text style={[styles.summaryNumber, { color: colors.text }]}>
                {stats.totalTags}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.placeholder }]}>
                Tags Únicas
              </Text>
            </View>
          </Card>

          <Card style={styles.summaryCard}>
            <View style={styles.summaryContent}>
              <MaterialIcons name="schedule" size={32} color={colors.primary} />
              <Text style={[styles.summaryNumber, { color: colors.text }]}>
                {stats.recentCount}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.placeholder }]}>
                Últimos 30 dias
              </Text>
            </View>
          </Card>
        </View>

        {topLanguages.length > 0 && (
          <Card>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="language" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Linguagens Mais Usadas
              </Text>
            </View>

            {topLanguages.map((item, index) => {
              const language = LANGUAGES.find((l) => l.value === item.language);
              const percentage = stats.total > 0 
                ? Math.round((item.count / stats.total) * 100) 
                : 0;

              return (
                <View key={item.language} style={styles.statRow}>
                  <View style={styles.statLeft}>
                    <Text style={[styles.statRank, { color: colors.placeholder }]}>
                      #{index + 1}
                    </Text>
                    <Text style={[styles.statLabel, { color: colors.text }]}>
                      {language?.label || item.language}
                    </Text>
                  </View>
                  <View style={styles.statRight}>
                    <View style={styles.progressBarContainer}>
                      <View
                        style={[
                          styles.progressBar,
                          {
                            width: `${percentage}%`,
                            backgroundColor: colors.primary,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.statValue, { color: colors.text }]}>
                      {item.count} ({percentage}%)
                    </Text>
                  </View>
                </View>
              );
            })}
          </Card>
        )}

        {topTags.length > 0 && (
          <Card>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="local-offer" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Tags Mais Usadas
              </Text>
            </View>

            <View style={styles.tagsContainer}>
              {topTags.map((item, index) => (
                <View
                  key={item.tag}
                  style={[
                    styles.tagItem,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.tagText, { color: colors.text }]}>
                    {item.tag}
                  </Text>
                  <Text style={[styles.tagCount, { color: colors.placeholder }]}>
                    {item.count}x
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        <Card>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="info" size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Informações
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.placeholder }]}>
              Média de tags por snippet:
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {stats.averageTagsPerSnippet}
            </Text>
          </View>

          {stats.oldestSnippet && (
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.placeholder }]}>
                Snippet mais antigo:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {stats.oldestSnippet.title} ({formatDate(stats.oldestSnippet.createdAt)})
              </Text>
            </View>
          )}

          {stats.newestSnippet && (
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.placeholder }]}>
                Snippet mais recente:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {stats.newestSnippet.title} ({formatDate(stats.newestSnippet.createdAt)})
              </Text>
            </View>
          )}
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  summaryCard: {
    flex: 1,
    minWidth: 0,
    marginBottom: 0,
  },
  summaryContent: {
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  statLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: spacing.sm,
  },
  statRank: {
    fontSize: 12,
    fontWeight: "600",
    width: 30,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  statRight: {
    alignItems: "flex-end",
    minWidth: 100,
  },
  progressBarContainer: {
    width: 100,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  statValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tagItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    borderWidth: 1,
    gap: spacing.xs,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  tagCount: {
    fontSize: 11,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
    flexWrap: "wrap",
  },
  infoLabel: {
    fontSize: 14,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
  },
});
