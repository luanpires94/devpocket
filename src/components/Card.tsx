import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type Props = {
  children: ReactNode;
};

export function Card({ children }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
});
