import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import { Screen } from "../components/Screen";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { RootStackParamList } from "../navigation";
import { useTheme } from "../theme/ThemeProvider";
import { spacing, typography } from "../theme/tokens";
import { usePremiumStore, FREE_SNIPPET_LIMIT } from "../store/premiumStore";
import { useTranslation } from "../hooks/useTranslation";
import { getProducts, purchaseProduct, restorePurchases, productIds, isPurchasesAvailable } from "../utils/purchases";

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Upgrade"
>;

export function UpgradeScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { isPremium, setPremium } = usePremiumStore();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const purchasesAvailable = isPurchasesAvailable();

  useEffect(() => {
    if (purchasesAvailable) {
      loadProducts();
    }
  }, [purchasesAvailable]);

  async function loadProducts() {
    try {
      const availableProducts = await getProducts();
      setProducts(availableProducts);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  async function handlePurchase(productId: string) {
    setPurchasing(true);
    try {
      const success = await purchaseProduct(productId);
      if (success) {
        setTimeout(() => {
          setPurchasing(false);
          if (isPremium) {
            navigation.goBack();
          }
        }, 1000);
      } else {
        setPurchasing(false);
      }
    } catch (error) {
      console.error("Purchase error:", error);
      setPurchasing(false);
    }
  }

  async function handleRestore() {
    setLoading(true);
    try {
      await restorePurchases(setPremium);
    } catch (error) {
      console.error("Restore error:", error);
    } finally {
      setLoading(false);
    }
  }

  const features = [
    {
      icon: "code",
      title: t("premium.features.unlimited.title"),
      description: t("premium.features.unlimited.description"),
    },
    {
      icon: "star",
      title: t("premium.features.noAds.title"),
      description: t("premium.features.noAds.description"),
    },
    {
      icon: "cloud-sync",
      title: t("premium.features.cloudSync.title"),
      description: t("premium.features.cloudSync.description"),
    },
    {
      icon: "palette",
      title: t("premium.features.themes.title"),
      description: t("premium.features.themes.description"),
    },
    {
      icon: "support",
      title: t("premium.features.support.title"),
      description: t("premium.features.support.description"),
    },
  ];

  const monthlyProduct = products.find((p: any) => p.productId === productIds.monthly);
  const yearlyProduct = products.find((p: any) => p.productId === productIds.yearly);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <MaterialIcons name="workspace-premium" size={64} color="#FBBF24" />
          <Text style={[styles.title, { color: colors.text }]}>
            {t("premium.title")}
          </Text>
          <Text style={[styles.subtitle, { color: colors.placeholder }]}>
            {t("premium.subtitle")}
          </Text>
        </View>

        <Card>
          <View style={styles.currentPlan}>
            <Text style={[styles.planLabel, { color: colors.placeholder }]}>
              {t("premium.currentPlan")}
            </Text>
            <Text style={[styles.planName, { color: colors.text }]}>
              {isPremium ? t("premium.premium") : t("premium.free")}
            </Text>
            {!isPremium && (
              <Text style={[styles.planLimit, { color: colors.placeholder }]}>
                {t("premium.limit", { count: FREE_SNIPPET_LIMIT })}
              </Text>
            )}
          </View>
        </Card>

        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("premium.premiumFeatures")}
          </Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: colors.background },
                ]}
              >
                <MaterialIcons
                  name={feature.icon as any}
                  size={24}
                  color={colors.primary}
                />
              </View>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  {feature.title}
                </Text>
                <Text
                  style={[styles.featureDescription, { color: colors.placeholder }]}
                >
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </Card>

        {purchasesAvailable && products.length > 0 && (
          <Card>
            <View style={styles.pricing}>
              {monthlyProduct && (
                <View style={styles.priceRow}>
                  <Text style={[styles.price, { color: colors.text }]}>
                    {(monthlyProduct as any).localizedPrice}
                  </Text>
                  <Text style={[styles.pricePeriod, { color: colors.placeholder }]}>
                    {t("premium.pricing.monthlyPeriod")}
                  </Text>
                </View>
              )}
              {yearlyProduct && (
                <Text style={[styles.priceDescription, { color: colors.placeholder }]}>
                  {(yearlyProduct as any).localizedPrice} {t("premium.pricing.yearlyDiscount")}
                </Text>
              )}
            </View>
          </Card>
        )}

        {!purchasesAvailable && (
          <Card>
            <View style={styles.warningContainer}>
              <MaterialIcons name="info" size={24} color={colors.primary} />
              <Text style={[styles.warningText, { color: colors.text }]}>
                {t("purchase.buildRequired")}
              </Text>
              <Text style={[styles.warningSubtext, { color: colors.placeholder }]}>
                {t("purchase.buildCommand")}
              </Text>
            </View>
          </Card>
        )}

        {!isPremium && purchasesAvailable && (
          <>
            {monthlyProduct && (
              <Button
                title={purchasing ? t("purchase.purchasing") : t("premium.subscribe")}
                onPress={() => handlePurchase(productIds.monthly)}
                style={styles.purchaseButton}
                disabled={purchasing}
              />
            )}
            {yearlyProduct && (
              <Button
                title={purchasing ? t("purchase.purchasing") : t("premium.subscribe")}
                onPress={() => handlePurchase(productIds.yearly)}
                style={styles.purchaseButton}
                disabled={purchasing}
              />
            )}
            {purchasing && (
              <ActivityIndicator size="small" color={colors.primary} style={styles.loading} />
            )}
            <TouchableOpacity
              onPress={handleRestore}
              style={styles.restoreButton}
              disabled={loading}
            >
              <Text style={[styles.restoreText, { color: colors.primary }]}>
                {loading ? t("purchase.restoring") : t("purchase.restore")}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {isPremium && (
          <Card>
            <View style={styles.premiumBadge}>
              <MaterialIcons name="check-circle" size={24} color="#10B981" />
              <Text style={[styles.premiumText, { color: "#10B981" }]}>
                {t("premium.alreadyPremium")}
              </Text>
            </View>
          </Card>
        )}

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={[styles.backButtonText, { color: colors.placeholder }]}>
            {t("common.back")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    ...typography.title,
    fontSize: 28,
    fontWeight: "700",
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },
  currentPlan: {
    alignItems: "center",
  },
  planLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  planName: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  planLimit: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  pricing: {
    alignItems: "center",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: 36,
    fontWeight: "700",
  },
  pricePeriod: {
    fontSize: 18,
    marginLeft: spacing.xs,
  },
  priceDescription: {
    fontSize: 14,
  },
  purchaseButton: {
    marginTop: spacing.md,
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  premiumText: {
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    alignItems: "center",
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  backButtonText: {
    fontSize: 16,
  },
  loading: {
    marginTop: spacing.sm,
  },
  restoreButton: {
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  restoreText: {
    fontSize: 14,
    fontWeight: "500",
  },
  warningContainer: {
    alignItems: "center",
    gap: spacing.sm,
  },
  warningText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  warningSubtext: {
    fontSize: 12,
    textAlign: "center",
    marginTop: spacing.xs,
  },
});
