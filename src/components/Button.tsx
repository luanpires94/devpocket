import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type Props = {
  title: string;
  onPress: () => void;
};

export function Button({ title, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: "#FFF" }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
