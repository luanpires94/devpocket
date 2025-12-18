import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

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
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
