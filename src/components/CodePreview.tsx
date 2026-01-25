import { View, StyleSheet, ScrollView, Platform, Text } from "react-native";
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
  code: string;
  language: CodeLanguage;
  maxHeight?: number;
  showScrollbars?: boolean;
};

export function CodePreview({
  code,
  language,
  maxHeight = 200,
  showScrollbars = true,
}: Props) {
  const { colors, isDark } = useTheme();

  if (!code || code.trim().length === 0) {
    return null;
  }

  const hljsLanguage = languageMap[language] || "javascript";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          maxHeight,
        },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={showScrollbars}
        nestedScrollEnabled
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <ScrollView
          showsVerticalScrollIndicator={showScrollbars}
          nestedScrollEnabled
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <SyntaxHighlighter
            language={hljsLanguage}
            style={isDark ? atomOneDark : atomOneLight}
            customStyle={styles.highlight}
            CodeTag={Text}
            PreTag={View}
          >
            {code}
          </SyntaxHighlighter>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: spacing.sm,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  highlight: {
    padding: spacing.md,
    margin: 0,
    backgroundColor: "transparent",
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
    fontSize: 13,
    lineHeight: 18,
  },
});
