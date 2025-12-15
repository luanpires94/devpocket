import { Text } from "react-native";
import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useSnippetStore } from "../store/snippetStore";

export function SnippetListScreen() {
  const snippets = useSnippetStore((state) => state.snippets);

  return (
    <Screen>
      {snippets.length === 0 ? (
        <Card>
          <Text>Nenhum snippet ainda</Text>
        </Card>
      ) : (
        snippets.map((snippet) => (
          <Card key={snippet.id}>
            <Text>{snippet.title}</Text>
            <Text>{snippet.language}</Text>
          </Card>
        ))
      )}

      <Button title="Novo Snippet" onPress={() => {}} />
    </Screen>
  );
}
