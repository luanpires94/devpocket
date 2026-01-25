import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LANGUAGES } from "../constants/languages";
import { CodeLanguage } from "../constants/languages";
import { useTheme } from "../theme/ThemeProvider";
import { spacing } from "../theme/tokens";

type Props = {
  value: CodeLanguage;
  onChange: (language: CodeLanguage) => void;
};

export function LanguageSelect({ value, onChange }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
      ]}
    >
      <Text style={[styles.label, { color: colors.text }]}>Linguagem</Text>

      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={{ color: colors.text }}
        dropdownIconColor={colors.text}
      >
        {LANGUAGES.map((lang) => (
          <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: spacing.sm,
    marginLeft: spacing.sm,
  },
});
