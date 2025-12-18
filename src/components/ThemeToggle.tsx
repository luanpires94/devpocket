import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme, colors } = useTheme();

  function handleToggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <TouchableOpacity
      onPress={handleToggle}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={{ fontSize: 18 }}>{theme === "dark" ? "🌙" : "☀️"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: "100%",
    width: 48,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
