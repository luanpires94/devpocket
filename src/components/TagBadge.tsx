import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";
import { spacing } from "../theme/tokens";

type Props = {
  tag: string;
  onRemove?: () => void;
  variant?: "default" | "selected" | "filter";
};

export function TagBadge({ tag, onRemove, variant = "default" }: Props) {
  const { colors } = useTheme();

  const isRemovable = variant === "default" && onRemove;
  const isSelected = variant === "selected" || variant === "filter";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isSelected
            ? colors.primary
            : variant === "default"
            ? colors.card
            : colors.border,
          borderColor: isSelected ? colors.primary : colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: isSelected ? "#FFFFFF" : colors.text,
          },
        ]}
      >
        {tag}
      </Text>
      {isRemovable && (
        <TouchableOpacity
          onPress={onRemove}
          style={styles.removeButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons
            name="close"
            size={14}
            color={colors.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
  removeButton: {
    marginLeft: spacing.xs,
    padding: 2,
  },
});
