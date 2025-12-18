import { View, StyleSheet } from "react-native";
import { Input } from "./Input";
import { ThemeToggle } from "./ThemeToggle";
import { spacing } from "../theme/tokens";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchHeader({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Input
          placeholder="Buscar..."
          value={value}
          onChangeText={onChangeText}
        />
      </View>

      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.md,
    marginBottom: spacing.xl,
    height: 48,
  },
  inputWrapper: {
    flex: 1,
  },
});
