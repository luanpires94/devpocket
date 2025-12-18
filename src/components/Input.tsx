import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { spacing } from "../theme/tokens";

type Props = TextInputProps;

export function Input(props: Props) {
  const { colors } = useTheme();

  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.placeholder}
      style={[
        styles.input,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          color: colors.text,
        },
      ]}
      selectionColor={colors.primary}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: spacing.md,
    fontSize: 16,
  },
});
