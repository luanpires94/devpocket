import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";
import { spacing, typography } from "../theme/tokens";
import { ImportMode } from "../utils/snippetImport";

type Props = {
  visible: boolean;
  importedCount: number;
  existingCount: number;
  onConfirm: (mode: ImportMode) => void;
  onCancel: () => void;
};

export function ImportModal({
  visible,
  importedCount,
  existingCount,
  onConfirm,
  onCancel,
}: Props) {
  const { colors } = useTheme();

  function handleReplace() {
    Alert.alert(
      "Confirmar substituição",
      `Todos os ${existingCount} snippets existentes serão removidos e substituídos por ${importedCount} snippets importados. Esta ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Substituir",
          style: "destructive",
          onPress: () => onConfirm("replace"),
        },
      ]
    );
  }

  function handleMerge() {
    onConfirm("merge");
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.header}>
            <MaterialIcons name="file-upload" size={24} color={colors.primary} />
            <Text style={[styles.title, { color: colors.text }]}>
              Importar Snippets
            </Text>
          </View>

          <Text style={[styles.description, { color: colors.text }]}>
            {importedCount} snippet{importedCount !== 1 ? "s" : ""} encontrado
            {importedCount !== 1 ? "s" : ""} no arquivo.
          </Text>

          {existingCount > 0 && (
            <Text style={[styles.warning, { color: colors.placeholder }]}>
              Você já possui {existingCount} snippet{existingCount !== 1 ? "s" : ""} salvo
              {existingCount !== 1 ? "s" : ""}.
            </Text>
          )}

          <View style={styles.options}>
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                },
              ]}
              onPress={handleMerge}
              activeOpacity={0.7}
            >
              <MaterialIcons name="merge-type" size={20} color={colors.primary} />
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>
                  Mesclar
                </Text>
                <Text style={[styles.optionDescription, { color: colors.placeholder }]}>
                  Mantém os snippets existentes e adiciona apenas os novos
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                },
              ]}
              onPress={handleReplace}
              activeOpacity={0.7}
            >
              <MaterialIcons name="refresh" size={20} color="#DC2626" />
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>
                  Substituir
                </Text>
                <Text style={[styles.optionDescription, { color: colors.placeholder }]}>
                  Remove todos os snippets existentes e substitui pelos importados
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.cancelButton, { borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.cancelText, { color: colors.text }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title,
    fontSize: 20,
    marginLeft: spacing.sm,
  },
  description: {
    fontSize: 14,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  warning: {
    fontSize: 12,
    marginBottom: spacing.md,
    fontStyle: "italic",
  },
  options: {
    marginBottom: spacing.md,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  optionContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  actions: {
    marginTop: spacing.sm,
  },
  cancelButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
