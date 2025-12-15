import { useState, useEffect } from "react";
import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useSnippetStore } from "../store/snippetStore";
import { useNavigation, useRoute } from "@react-navigation/native";

type RouteParams = {
  id?: string;
};

export function SnippetFormScreen() {
  const { id } = useRoute<RouteParams>();
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");

  const { addSnippet, snippets, updateSnippet } = useSnippetStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      const snippet = snippets.find((s) => s.id === id);
      if (snippet) {
        setTitle(snippet.title);
        setLanguage(snippet.language);
        setCode(snippet.code);
      }
    }
  }, [id, snippets]);

  function handleSave() {
    if (!title || !language || !code) return;

    if (id) {
      updateSnippet(id, { title, language, code });
    } else {
      addSnippet({ title, language, code, tags: [] });
    }

    navigation.goBack();
  }

  return (
    <Screen>
      <Input placeholder="Título" value={title} onChangeText={setTitle} />
      <Input
        placeholder="Linguagem"
        value={language}
        onChangeText={setLanguage}
      />
      <Input placeholder="Código" value={code} onChangeText={setCode} />

      <Button title="Salvar Snippet" onPress={handleSave} />
    </Screen>
  );
}
