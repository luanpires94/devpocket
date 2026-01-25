import { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { spacing } from "../theme/tokens";

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Card({ children, style }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: spacing.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
});
