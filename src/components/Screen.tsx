import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../theme/useTheme";

type Props = {
  children: ReactNode;
};

export function Screen({ children }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
