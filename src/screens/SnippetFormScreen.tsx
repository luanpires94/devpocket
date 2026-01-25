import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TagInput } from "../components/TagInput";
import { LimitReachedModal } from "../components/LimitReachedModal";
import { useSnippetStore } from "../store/snippetStore";
import { usePremiumStore } from "../store/premiumStore";
import { RootStackParamList } from "../navigation";
import { useTheme } from "../theme/ThemeProvider";
import { spacing, typography } from "../theme/tokens";
import { LanguageSelect } from "../components/LanguageSelect";
import { CodeEditor } from "../components/CodeEditor";
import { CodeLanguage } from "../constants/languages";
import { getSuggestedTagsByLanguage } from "../utils/getSuggestedTagsByLanguage";
import { showInterstitialAd } from "../utils/interstitialAd";

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
  const { isPremium } = usePremiumStore();

  const snippetId = route.params?.id;
  const snippet = snippets.find((item) => item.id === snippetId);

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<CodeLanguage>("javascript");
  const [tags, setTags] = useState<string[]>([]);
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    if (snippet) {
      setTitle(snippet.title);
      setLanguage(snippet.language);
      setCode(snippet.code);
      setTags(snippet.tags ?? []);
    } else {
      setTitle("");
      setCode("");
      setLanguage("javascript");
      setTags([]);
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
        tags,
      });
      navigation.goBack();
    } else {
      const result = addSnippet(
        {
          title,
          language,
          code,
          tags,
        },
        isPremium
      );

      if (result.success) {
        if (!isPremium) {
          showInterstitialAd();
        }
        navigation.goBack();
      } else if (result.error === "LIMIT_REACHED") {
        setShowLimitModal(true);
      }
    }
  }

  function handleUpgrade() {
    setShowLimitModal(false);
    navigation.navigate("Upgrade");
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

        <View style={{ marginBottom: spacing.md }}>
          <Input placeholder="Título" value={title} onChangeText={setTitle} />
        </View>

        <View style={{ marginBottom: spacing.md }}>
          <LanguageSelect value={language} onChange={setLanguage} />
        </View>

        <View style={{ marginBottom: spacing.md }}>
          <TagInput
            tags={tags}
            onChangeTags={setTags}
            suggestedTags={getSuggestedTagsByLanguage(language)}
            placeholder="Adicionar tag (ex: react, hooks, utils)..."
          />
        </View>

        <View style={{ marginBottom: spacing.md }}>
          <CodeEditor value={code} onChangeText={setCode} language={language} />
        </View>

        <Button
          title={snippet ? "Salvar alterações" : "Criar snippet"}
          onPress={handleSave}
        />

        <LimitReachedModal
          visible={showLimitModal}
          onClose={() => setShowLimitModal(false)}
          onUpgrade={handleUpgrade}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  field: {
    marginBottom: spacing.md,
  },
  codeInput: {
    height: 160,
    textAlignVertical: "top",
  },
});
