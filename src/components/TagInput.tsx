import { useState } from "react";
import { View, TextInput, ViewStyle, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";
import { spacing } from "../theme/tokens";
import { TagBadge } from "./TagBadge";

type Props = {
  tags: string[];
  onChangeTags: (tags: string[]) => void;
  suggestedTags?: string[];
  placeholder?: string;
  style?: ViewStyle;
};

export function TagInput({
  tags,
  onChangeTags,
  suggestedTags = [],
  placeholder = "Adicionar tag...",
  style,
}: Props) {
  const { colors } = useTheme();
  const [inputValue, setInputValue] = useState("");

  const availableSuggestions = suggestedTags.filter(
    (tag) => !tags.includes(tag.toLowerCase())
  );

  function handleAddTag(tag: string) {
    const normalizedTag = tag.trim().toLowerCase();

    if (!normalizedTag || normalizedTag.length < 2) {
      return;
    }

    if (tags.includes(normalizedTag)) {
      return;
    }

    if (normalizedTag.includes(" ")) {
      return;
    }

    onChangeTags([...tags, normalizedTag]);
    setInputValue("");
  }

  function handleRemoveTag(tagToRemove: string) {
    onChangeTags(tags.filter((tag) => tag !== tagToRemove));
  }

  function handleInputSubmit() {
    if (inputValue.trim()) {
      handleAddTag(inputValue);
    }
  }

  function handleSuggestionPress(suggestion: string) {
    handleAddTag(suggestion);
  }

  return (
    <View style={[styles.container, style]}>
      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsScrollContent}
          >
            {tags.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                onRemove={() => handleRemoveTag(tag)}
                variant="default"
              />
            ))}
          </ScrollView>
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <MaterialIcons
          name="local-offer"
          size={18}
          color={colors.placeholder}
          style={styles.icon}
        />
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleInputSubmit}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          style={[styles.input, { color: colors.text }]}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
        />
      </View>

      {availableSuggestions.length > 0 && tags.length < 10 && (
        <View style={styles.suggestionsContainer}>
          <Text style={[styles.suggestionsLabel, { color: colors.placeholder }]}>
            Sugeridas:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsScrollContent}
          >
            {availableSuggestions.slice(0, 10).map((suggestion) => (
              <TouchableOpacity
                key={suggestion}
                onPress={() => handleSuggestionPress(suggestion)}
                activeOpacity={0.7}
              >
                <TagBadge tag={suggestion} variant="default" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  tagsContainer: {
    marginBottom: spacing.sm,
  },
  tagsScrollContent: {
    paddingRight: spacing.md,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  suggestionsContainer: {
    marginTop: spacing.sm,
  },
  suggestionsLabel: {
    fontSize: 12,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  suggestionsScrollContent: {
    paddingRight: spacing.md,
  },
});
