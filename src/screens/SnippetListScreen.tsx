import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { ThemeToggle } from "../components/ThemeToggle";
import { ConfirmModal } from "../components/ConfirmModal";
import { ImportModal } from "../components/ImportModal";
import { CodePreview } from "../components/CodePreview";
import { TagFilter } from "../components/TagFilter";
import { TagBadge } from "../components/TagBadge";
import { useSnippetStore } from "../store/snippetStore";
import { usePremiumStore, FREE_SNIPPET_LIMIT } from "../store/premiumStore";
import { RootStackParamList } from "../navigation";
import { useTheme } from "../theme/ThemeProvider";
import { useTranslation } from "../hooks/useTranslation";
import { spacing, typography } from "../theme/tokens";
import { Fab } from "../components/Fab";
import { AdBanner } from "../components/AdBanner";
import { Snippet } from "../types/snippet";
import { exportSnippets, exportSingleSnippet } from "../utils/snippetExport";
import { pickImportFile, ImportMode } from "../utils/snippetImport";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "SnippetList"
>;

export function SnippetListScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { snippets, loadSnippets, deleteSnippet, toggleFavorite, replaceSnippets, mergeSnippets } = useSnippetStore();
  const { isPremium, loadPremiumStatus } = usePremiumStore();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState<Snippet | null>(null);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [importedSnippets, setImportedSnippets] = useState<Snippet[] | null>(null);

  useEffect(() => {
    loadSnippets();
    loadPremiumStatus();
  }, []);

  const availableTags = Array.from(
    new Set(snippets.flatMap((snippet) => snippet.tags || []))
  ).sort();

  const filteredSnippets = snippets
    .filter((snippet) => {
      const query = search.toLowerCase();

      const matchesSearch =
        search.length === 0 ||
        snippet.title.toLowerCase().includes(query) ||
        snippet.language.toLowerCase().includes(query) ||
        snippet.code.toLowerCase().includes(query) ||
        (snippet.tags || []).some((tag) => tag.toLowerCase().includes(query));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((selectedTag) =>
          (snippet.tags || []).includes(selectedTag)
        );

      const matchesFavorites =
        !showFavoritesOnly || (snippet.isFavorite ?? false);

      return matchesSearch && matchesTags && matchesFavorites;
    })
    .sort((a, b) => {
      const aIsFavorite = a.isFavorite ?? false;
      const bIsFavorite = b.isFavorite ?? false;
      
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      
      return b.updatedAt - a.updatedAt;
    });

  function handleTagToggle(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

  function handleClearTags() {
    setSelectedTags([]);
  }

  function handleDeletePress(snippet: Snippet) {
    setSnippetToDelete(snippet);
  }

  function handleConfirmDelete() {
    if (snippetToDelete) {
      deleteSnippet(snippetToDelete.id);
      setSnippetToDelete(null);
    }
  }

  function handleCancelDelete() {
    setSnippetToDelete(null);
  }

  async function handleExport() {
    try {
      if (snippets.length === 0) {
        Alert.alert("Nada para exportar", "Você não possui snippets para exportar.");
        return;
      }

      await exportSnippets(snippets);
    } catch (error) {
      Alert.alert(
        "Erro ao exportar",
        error instanceof Error ? error.message : "Não foi possível exportar os snippets."
      );
    }
  }

  async function handleExportSnippet(snippet: Snippet, e: any) {
    e.stopPropagation();
    try {
      await exportSingleSnippet(snippet);
    } catch (error) {
      Alert.alert(
        "Erro ao exportar",
        error instanceof Error ? error.message : "Não foi possível exportar o snippet."
      );
    }
  }

  async function handleImport() {
    try {
      const imported = await pickImportFile();
      
      if (!imported) {
        return; // Usuário cancelou
      }

      if (imported.length === 0) {
        Alert.alert("Arquivo vazio", "O arquivo selecionado não contém snippets.");
        return;
      }

      setImportedSnippets(imported);
      setImportModalVisible(true);
    } catch (error) {
      Alert.alert(
        "Erro ao importar",
        error instanceof Error ? error.message : "Não foi possível importar os snippets."
      );
    }
  }

  function handleImportConfirm(mode: ImportMode) {
    if (!importedSnippets) {
      return;
    }

    try {
      if (mode === "replace") {
        replaceSnippets(importedSnippets);
      } else {
        mergeSnippets(importedSnippets);
      }

      setImportModalVisible(false);
      setImportedSnippets(null);
      
      Alert.alert(
        "Importação concluída",
        mode === "replace"
          ? `${importedSnippets.length} snippets foram importados.`
          : `Snippets importados com sucesso.`
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível importar os snippets."
      );
    }
  }

  function handleImportCancel() {
    setImportModalVisible(false);
    setImportedSnippets(null);
  }

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <View style={styles.searchWrapper}>
          <Input
            placeholder={t("common.search")}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={handleImport}
            style={[styles.headerActionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <MaterialIcons name="file-upload" size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleExport}
            style={[styles.headerActionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
            disabled={snippets.length === 0}
          >
            <MaterialIcons 
              name="file-download" 
              size={20} 
              color={snippets.length === 0 ? colors.placeholder : colors.primary} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Statistics")}
            style={[styles.headerActionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <MaterialIcons name="bar-chart" size={20} color={colors.primary} />
          </TouchableOpacity>
          <ThemeToggle />
        </View>
      </View>

      {!isPremium && (
        <Card style={styles.limitCard}>
          <View style={styles.limitContent}>
            <View style={styles.limitHeader}>
              <MaterialIcons name="info" size={20} color={colors.primary} />
              <Text style={[styles.limitTitle, { color: colors.text }]}>
                {t("premium.snippetLimit")}
              </Text>
            </View>
            <View style={styles.limitProgress}>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${Math.min((snippets.length / FREE_SNIPPET_LIMIT) * 100, 100)}%`,
                      backgroundColor: snippets.length >= FREE_SNIPPET_LIMIT
                        ? "#EF4444"
                        : colors.primary,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.limitText, { color: colors.placeholder }]}>
                {t("premium.snippetsUsed", { used: snippets.length, limit: FREE_SNIPPET_LIMIT })}
              </Text>
            </View>
            {snippets.length >= FREE_SNIPPET_LIMIT && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Upgrade")}
                style={[styles.upgradeButton, { backgroundColor: colors.primary }]}
                activeOpacity={0.7}
              >
                <MaterialIcons name="workspace-premium" size={16} color="#FFFFFF" />
                <Text style={styles.upgradeButtonText}>{t("premium.upgrade")}</Text>
              </TouchableOpacity>
            )}
            {snippets.length < FREE_SNIPPET_LIMIT && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Upgrade")}
                style={styles.upgradeLink}
                activeOpacity={0.7}
              >
                <Text style={[styles.upgradeLinkText, { color: colors.primary }]}>
                  {t("premium.upgradeLink")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Card>
      )}

      <View style={[styles.favoritesFilter, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
          style={styles.favoritesButton}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={showFavoritesOnly ? "star" : "star-border"}
            size={20}
            color={showFavoritesOnly ? "#FBBF24" : colors.text}
          />
          <Text style={[styles.favoritesText, { color: colors.text }]}>
            {showFavoritesOnly ? t("filters.showAll") : t("filters.favoritesOnly")}
          </Text>
        </TouchableOpacity>
      </View>

      {availableTags.length > 0 && (
        <TagFilter
          selectedTags={selectedTags}
          availableTags={availableTags}
          onTagToggle={handleTagToggle}
          onClear={handleClearTags}
        />
      )}

      <ScrollView
        contentContainerStyle={[
          styles.list,
          availableTags.length > 0 && styles.listWithFilter,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {search.length > 0 && filteredSnippets.length === 0 && (
          <Card>
            <Text style={{ color: colors.text }}>
              Nenhum resultado encontrado
            </Text>
          </Card>
        )}

        {filteredSnippets.length === 0 && search.length === 0 && (
          <Card>
            <Text style={{ color: colors.text }}>Nenhum snippet ainda</Text>
          </Card>
        )}

        {filteredSnippets.map((snippet) => {
          return (
            <TouchableOpacity
              key={snippet.id}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("SnippetForm", { id: snippet.id })
              }
            >
              <Card>
                <View style={styles.snippetHeader}>
                  <View style={styles.snippetInfo}>
                    <Text
                      style={[
                        typography.body,
                        { color: colors.text, fontWeight: "600" },
                      ]}
                    >
                      {snippet.title}
                    </Text>

                    <Text style={[styles.languageLabel, { color: colors.placeholder }]}>
                      {snippet.language}
                    </Text>

                    {snippet.tags && snippet.tags.length > 0 && (
                      <View style={styles.tagsContainer}>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={styles.tagsScrollContent}
                        >
                          {snippet.tags.slice(0, 5).map((tag) => (
                            <TagBadge key={tag} tag={tag} variant="default" />
                          ))}
                          {snippet.tags.length > 5 && (
                            <Text style={[styles.moreTags, { color: colors.placeholder }]}>
                              +{snippet.tags.length - 5}
                            </Text>
                          )}
                        </ScrollView>
                      </View>
                    )}
                  </View>

                  <View style={styles.snippetActions}>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleFavorite(snippet.id);
                      }}
                      style={styles.actionButton}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons
                        name={snippet.isFavorite ? "star" : "star-border"}
                        size={20}
                        color={snippet.isFavorite ? "#FBBF24" : colors.placeholder}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={(e) => handleExportSnippet(snippet, e)}
                      style={styles.actionButton}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons name="share" size={20} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        handleDeletePress(snippet);
                      }}
                      style={styles.deleteButton}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons name="delete" size={20} color="#B91C1C" />
                    </TouchableOpacity>
                  </View>
                </View>

                <CodePreview
                  code={snippet.code}
                  language={snippet.language}
                  maxHeight={150}
                  showScrollbars={false}
                />
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <AdBanner style={styles.adBanner} />

      <Fab onPress={() => navigation.navigate("SnippetForm", {})} />

      <ConfirmModal
        visible={snippetToDelete !== null}
        title="Deletar snippet"
        message={`Tem certeza que deseja deletar o snippet "${snippetToDelete?.title}"? Esta ação não pode ser desfeita.`}
        confirmText="Deletar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <ImportModal
        visible={importModalVisible}
        importedCount={importedSnippets?.length || 0}
        existingCount={snippets.length}
        onConfirm={handleImportConfirm}
        onCancel={handleImportCancel}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: spacing.sm,
    width: "100%",
  },
  searchWrapper: {
    flex: 1,
    minWidth: 0, // Permite que o flex funcione corretamente
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    height: 48,
    flexShrink: 0, // Impede que os botões encolham
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  limitCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    marginTop: 0,
  },
  limitContent: {
    gap: spacing.sm,
  },
  limitHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  limitTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  limitProgress: {
    gap: spacing.xs,
  },
  progressBarContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  limitText: {
    fontSize: 12,
    textAlign: "right",
  },
  upgradeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  upgradeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  upgradeLink: {
    paddingVertical: spacing.xs,
    alignItems: "center",
  },
  upgradeLinkText: {
    fontSize: 12,
    fontWeight: "500",
  },
  list: {
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
  },
  listWithFilter: {
    paddingTop: spacing.sm,
  },
  snippetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  snippetInfo: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 12,
    marginTop: spacing.xs,
    textTransform: "capitalize",
  },
  favoritesFilter: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    marginBottom: spacing.xs,
  },
  favoritesButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  favoritesText: {
    fontSize: 14,
    fontWeight: "500",
  },
  snippetActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  actionButton: {
    padding: spacing.xs,
  },
  deleteButton: {
    padding: spacing.xs,
  },
  tagsContainer: {
    marginTop: spacing.xs,
    flexDirection: "row",
  },
  tagsScrollContent: {
    paddingRight: spacing.md,
  },
  moreTags: {
    fontSize: 12,
    alignSelf: "center",
    marginLeft: spacing.xs,
    fontStyle: "italic",
  },
  adBanner: {
    paddingVertical: spacing.sm,
    backgroundColor: "transparent",
  },
});
