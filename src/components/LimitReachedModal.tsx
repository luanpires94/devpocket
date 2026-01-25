import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Card } from "./Card";
import { Button } from "./Button";
import { useTheme } from "../theme/ThemeProvider";
import { spacing, typography } from "../theme/tokens";
import { FREE_SNIPPET_LIMIT } from "../store/premiumStore";

type Props = {
  visible: boolean;
  onClose: () => void;
  onUpgrade: () => void;
};

export function LimitReachedModal({ visible, onClose, onUpgrade }: Props) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Card style={styles.modal}>
          <View style={styles.header}>
            <View
              style={[styles.iconContainer, { backgroundColor: colors.background }]}
            >
              <MaterialIcons name="lock" size={32} color={colors.primary} />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>
              Limite Atingido
            </Text>
            <Text style={[styles.message, { color: colors.placeholder }]}>
              Você atingiu o limite de {FREE_SNIPPET_LIMIT} snippets na versão
              gratuita.
            </Text>
            <Text style={[styles.message, { color: colors.placeholder }]}>
              Faça upgrade para Premium e crie snippets ilimitados!
            </Text>
          </View>

          <View style={styles.actions}>
            <Button
              title="Fazer Upgrade"
              onPress={onUpgrade}
              style={styles.upgradeButton}
            />
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={[styles.cancelText, { color: colors.placeholder }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
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
    padding: spacing.lg,
  },
  modal: {
    width: "100%",
    maxWidth: 400,
    padding: spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  actions: {
    gap: spacing.sm,
  },
  upgradeButton: {
    marginBottom: 0,
  },
  cancelButton: {
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
