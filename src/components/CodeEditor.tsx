import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import SyntaxHighlighter from "react-native-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/styles/hljs";

import { useTheme } from "../theme/ThemeProvider";
import { spacing } from "../theme/tokens";
import { CodeLanguage } from "../constants/languages";
import { languageMap } from "../utils/languageMap";

type Props = {
  value: string;
  language: CodeLanguage;
  onChangeText: (text: string) => void;
};

export function CodeEditor({ value, language, onChangeText }: Props) {
  const { colors, isDark } = useTheme();
  const [copied, setCopied] = useState(false);

  // Função para copiar o código
  async function handleCopy() {
    if (!value) return;
    await Clipboard.setStringAsync(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.label, { color: colors.text }]}>
          Código ({language})
        </Text>

        <TouchableOpacity onPress={handleCopy} activeOpacity={0.7}>
          <MaterialIcons
            name={copied ? "check" : "content-copy"}
            size={18}
            color={copied ? "#10b981" : colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Editor */}
      <View style={styles.editorContainer}>
        {/* Syntax Highlight */}
        <SyntaxHighlighter
          language={languageMap[language]}
          style={isDark ? atomOneDark : atomOneLight}
          customStyle={styles.highlight}
        >
          {value || ""}
        </SyntaxHighlighter>

        {/* TextInput invisível sobre o highlight */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          multiline
          style={styles.inputOverlay}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          caretHidden={false}
          selectionColor={colors.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  editorContainer: {
    position: "relative",
    minHeight: 180,
  },
  highlight: {
    padding: spacing.md,
    minHeight: 180,
    backgroundColor: "transparent",
  },
  inputOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.md,
    color: "transparent",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
  },
});
