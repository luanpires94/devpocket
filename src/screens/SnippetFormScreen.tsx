import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useSnippetStore } from "../store/snippetStore";
import { RootStackParamList } from "../navigation";
import { useTheme } from "../theme/ThemeProvider";
import { spacing, typography } from "../theme/tokens";

type RouteProps = RouteProp<RootStackParamList, "SnippetForm">;
type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "SnippetForm"
>;

export function SnippetFormScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const { colors } = useTheme();

  const { snippets, addSnippet, updateSnippet } = useSnippetStore();

  const snippetId = route.params?.id;
  const snippet = snippets.find((item) => item.id === snippetId);

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (snippet) {
      setTitle(snippet.title);
      setLanguage(snippet.language);
      setCode(snippet.code);
    }
  }, [snippet]);

  function handleSave() {
    if (!title || !language) {
      return;
    }

    if (snippet) {
      updateSnippet(snippet.id, {
        title,
        language,
        code,
        tags: snippet.tags ?? [],
      });
    } else {
      addSnippet({
        title,
        language,
        code,
        tags: [],
      });
    }

    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Screen>
        <Text style={[typography.title, { color: colors.text }]}>
          {snippet ? "Editar Snippet" : "Novo Snippet"}
        </Text>

        <Input placeholder="Título" value={title} onChangeText={setTitle} />

        <Input
          placeholder="Linguagem"
          value={language}
          onChangeText={setLanguage}
        />

        <Input
          placeholder="Código"
          value={code}
          onChangeText={setCode}
          multiline
          style={styles.codeInput}
        />

        <Button
          title={snippet ? "Salvar alterações" : "Criar snippet"}
          onPress={handleSave}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  codeInput: {
    height: 160,
    textAlignVertical: "top",
  },
});
