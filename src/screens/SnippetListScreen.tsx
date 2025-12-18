import { useEffect, useState } from "react";
import { Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { SearchHeader } from "../components/SearchHeader";
import { useSnippetStore } from "../store/snippetStore";
import { RootStackParamList } from "../navigation";
import { useTheme } from "../theme/ThemeProvider";
import { spacing, typography } from "../theme/tokens";
import { Fab } from "../components/Fab";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "SnippetList"
>;

export function SnippetListScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { snippets, loadSnippets } = useSnippetStore();
  const { colors } = useTheme();

  const [search, setSearch] = useState("");

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
                <Text
                  style={[
                    typography.body,
                    { color: colors.text, fontWeight: "600" },
                  ]}
                >
                  {snippet.title}
                </Text>

                <Text style={{ color: colors.text }}>{snippet.language}</Text>
              </Card>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Fab onPress={() => navigation.navigate("SnippetForm", {})} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing.lg,
  },
});
