import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useSnippetStore } from "../store/snippetStore";
import { RootStackParamList } from "../navigation";
import { useTheme } from "../theme/useTheme";

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
      <Input
        placeholder="Buscar por título ou linguagem"
        value={search}
        onChangeText={setSearch}
      />

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

      {filteredSnippets.map((snippet) => (
        <TouchableOpacity
          key={snippet.id}
          onPress={() => navigation.navigate("SnippetForm", { id: snippet.id })}
        >
          <Card>
            <Text style={{ color: colors.text, fontWeight: "600" }}>
              {snippet.title}
            </Text>
            <Text style={{ color: colors.text }}>{snippet.language}</Text>
          </Card>
        </TouchableOpacity>
      ))}

      <Button
        title="Novo Snippet"
        onPress={() => navigation.navigate("SnippetForm", {})}
      />
    </Screen>
  );
}
