import { Text } from "react-native";
import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

export function SnippetListScreen() {
  return (
    <Screen>
      <Card>
        <Text>Nenhum snippet ainda</Text>
      </Card>

      <Button title="Novo Snippet" onPress={() => {}} />
    </Screen>
  );
}
