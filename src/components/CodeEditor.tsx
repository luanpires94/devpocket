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

      <View style={styles.editorContainer}>
        {value && value.trim().length > 0 && (
          <View style={styles.highlightContainer}>
            <SyntaxHighlighter
              language={languageMap[language]}
              style={isDark ? atomOneDark : atomOneLight}
              customStyle={styles.highlight}
              CodeTag={Text}
              PreTag={View}
            >
              {value}
            </SyntaxHighlighter>
          </View>
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          multiline
          placeholder={value && value.trim().length > 0 ? undefined : "Digite seu código aqui..."}
          placeholderTextColor={colors.placeholder}
          style={[
            styles.inputOverlay,
            {
              opacity: value && value.trim().length > 0 ? 0 : 1,
            },
          ]}
          textContentType="none"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          selectionColor={value && value.trim().length > 0 ? "transparent" : colors.primary}
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
  highlightContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  highlight: {
    padding: spacing.md,
    minHeight: 180,
    backgroundColor: "transparent",
    margin: 0,
  },
  inputOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.md,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
    zIndex: 2,
    color: "transparent",
  },
});
