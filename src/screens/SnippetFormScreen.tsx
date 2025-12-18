import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useSnippetStore } from "../store/snippetStore";

type RouteParams = {
  id?: string;
};

export function SnippetFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const id = (route.params as RouteParams | undefined)?.id;

  const { snippets, addSnippet, updateSnippet, deleteSnippet } =
    useSnippetStore();

  const editingSnippet = snippets.find((s) => s.id === id);

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (editingSnippet) {
      setTitle(editingSnippet.title);
      setLanguage(editingSnippet.language);
      setCode(editingSnippet.code);
    }
  }, [editingSnippet]);

  function handleSave() {
    if (!title || !language || !code) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }

    if (editingSnippet) {
      updateSnippet(editingSnippet.id, {
        title,
        language,
        code,
        tags: [],
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

  function handleDelete() {
    if (!editingSnippet) return;

    deleteSnippet(editingSnippet.id);
    navigation.goBack()
  }

  return (
    <Screen>
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
        style={{ height: 120 }}
      />

      <Button
        title={editingSnippet ? "Salvar alterações" : "Criar Snippet"}
        onPress={handleSave}
      />

      {editingSnippet && (
        <View style={{ marginTop: 10 }}>
          <Button title="Excluir Snippet" onPress={handleDelete} />
        </View>
      )}
    </Screen>
  );
}
