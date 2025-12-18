import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { spacing } from "../theme/tokens";

export function ThemeToggleButton() {
  const { theme, setTheme, colors } = useTheme();

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, { borderColor: colors.border }]}
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: colors.text }]}>
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
});
