import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useSnippetStore } from "../store/snippetStore";
import { RootStackParamList } from "../navigation";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "SnippetList"
>;

export function SnippetListScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { snippets, loadSnippets } = useSnippetStore();

  useEffect(() => {
    loadSnippets();
  }, []);

  return (
    <Screen>
      {snippets.length === 0 && (
        <Card>
          <Text>Nenhum snippet ainda</Text>
        </Card>
      )}

      {snippets.map((snippet) => (
        <TouchableOpacity
          key={snippet.id}
          onPress={() => navigation.navigate("SnippetForm", { id: snippet.id })}
        >
          <Card>
            <Text>{snippet.title}</Text>
            <Text>{snippet.language}</Text>
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
