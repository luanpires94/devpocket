import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { spacing, typography } from "../theme/tokens";

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
      activeOpacity={0.85}
    >
      <Text style={[typography.title, { color: "#FFF" }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.lg,
  },
});
