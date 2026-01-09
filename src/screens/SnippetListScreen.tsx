import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { SearchHeader } from "../components/SearchHeader";
import { ConfirmModal } from "../components/ConfirmModal";
import { useSnippetStore } from "../store/snippetStore";
import { RootStackParamList } from "../navigation";
import { useTheme } from "../theme/ThemeProvider";
import { spacing, typography } from "../theme/tokens";
import { Fab } from "../components/Fab";
import { Snippet } from "../types/snippet";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "SnippetList"
>;

export function SnippetListScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { snippets, loadSnippets, deleteSnippet } = useSnippetStore();
  const { colors } = useTheme();

  const [search, setSearch] = useState("");
  const [snippetToDelete, setSnippetToDelete] = useState<Snippet | null>(null);

  useEffect(() => {
    loadSnippets();
  }, []);

  const filteredSnippets = snippets.filter((snippet) => {
    const query = search.toLowerCase();

    return (
      snippet.title.toLowerCase().includes(query) ||
      snippet.language.toLowerCase().includes(query)
    );
  });

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

  return (
    <Screen>
      <SearchHeader value={search} onChangeText={setSearch} />

      <ScrollView
        contentContainerStyle={styles.list}
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
                <View style={styles.snippetContent}>
                  <View style={styles.snippetInfo}>
                    <Text
                      style={[
                        typography.body,
                        { color: colors.text, fontWeight: "600" },
                      ]}
                    >
                      {snippet.title}
                    </Text>

                    <Text style={{ color: colors.text }}>
                      {snippet.language}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDeletePress(snippet);
                    }}
                    style={styles.deleteButton}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="delete" size={24} color="#B91C1C" />
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing.lg,
  },
  snippetContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  snippetInfo: {
    flex: 1,
  },
  deleteButton: {
    padding: spacing.sm,
    marginLeft: spacing.md,
  },
});
