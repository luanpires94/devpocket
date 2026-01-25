import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { spacing, typography } from "../theme/tokens";

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export function Button({ title, onPress, style, disabled = false }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.placeholder : colors.primary },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
    >
      <Text style={[typography.title, { color: "#FFF" }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    borderRadius: 10,
    alignItems: "center",
    marginTop: spacing.md,
  },
});
