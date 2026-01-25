import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";
import { useTranslation } from "../hooks/useTranslation";
import { spacing } from "../theme/tokens";
import { TagBadge } from "./TagBadge";

type Props = {
  selectedTags: string[];
  availableTags: string[];
  onTagToggle: (tag: string) => void;
  onClear: () => void;
};

export function TagFilter({
  selectedTags,
  availableTags,
  onTagToggle,
  onClear,
}: Props) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  if (availableTags.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="filter-list" size={18} color={colors.text} />
          <Text style={[styles.title, { color: colors.text }]}>{t("tags.filterByTags")}</Text>
        </View>
        {selectedTags.length > 0 && (
          <TouchableOpacity onPress={onClear} activeOpacity={0.7}>
            <Text style={[styles.clearButton, { color: colors.primary }]}>
              {t("tags.clearTags")}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsContainer}
      >
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <TouchableOpacity
              key={tag}
              onPress={() => onTagToggle(tag)}
              activeOpacity={0.7}
            >
              <TagBadge
                tag={tag}
                variant={isSelected ? "selected" : "default"}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {selectedTags.length > 0 && (
        <View style={styles.selectedInfo}>
          <Text style={[styles.selectedText, { color: colors.placeholder }]}>
            {t("tags.selectedTags", { count: selectedTags.length })}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    marginBottom: spacing.xs,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: spacing.xs,
  },
  clearButton: {
    fontSize: 12,
    fontWeight: "600",
  },
  tagsContainer: {
    paddingRight: spacing.md,
  },
  selectedInfo: {
    marginTop: spacing.xs,
  },
  selectedText: {
    fontSize: 11,
    fontStyle: "italic",
  },
});
