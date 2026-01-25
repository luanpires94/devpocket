import { Platform, Alert } from "react-native";
import Constants from "expo-constants";
import { t } from "../i18n";

const isExpoGo = Constants.executionEnvironment === "storeClient";

let RNIap: any = null;
if (!isExpoGo) {
  try {
    RNIap = require("react-native-iap");
  } catch (error) {
    console.warn("react-native-iap não disponível:", error);
  }
}

const productIds = {
  monthly: Platform.select({
    ios: "com.devpocket.premium.monthly",
    android: "com.devpocket.premium.monthly",
    default: "com.devpocket.premium.monthly",
  })!,
  yearly: Platform.select({
    ios: "com.devpocket.premium.yearly",
    android: "com.devpocket.premium.yearly",
    default: "com.devpocket.premium.yearly",
  })!,
};

let purchaseUpdateSubscription: any = null;
let purchaseErrorSubscription: any = null;
let isInitialized = false;

export function isPurchasesAvailable(): boolean {
  return !isExpoGo && RNIap !== null;
}

export async function initPurchases(
  setPremium: (isPremium: boolean) => Promise<void>
): Promise<boolean> {
  if (isExpoGo || !RNIap) {
    console.log("Compras in-app não disponíveis (Expo Go ou módulo não encontrado)");
    return false;
  }

  try {
    if (isInitialized) {
      return true;
    }

    const result = await RNIap.initConnection();
    console.log("In-app purchases initialized:", result);

    purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async (purchase: RNIap.Purchase) => {
        console.log("Purchase updated:", purchase);
        
        if (purchase.transactionReceipt) {
          await setPremium(true);
          
          try {
            await RNIap.finishTransaction(purchase);
            console.log("Transaction finished successfully");
          } catch (error) {
            console.error("Error finishing transaction:", error);
          }
        }
      }
    );

    purchaseErrorSubscription = RNIap.purchaseErrorListener(
      (error: RNIap.PurchaseError) => {
        console.error("Purchase error:", error);
        if (error.code !== "E_USER_CANCELLED") {
          Alert.alert(
            t("purchase.error"),
            error.message || t("purchase.error")
          );
        }
      }
    );

    isInitialized = true;
    return result;
  } catch (error) {
    console.error("Error initializing purchases:", error);
    return false;
  }
}

export async function getProducts(): Promise<any[]> {
  if (!isPurchasesAvailable()) {
    return [];
  }

  try {
    const products = await RNIap.getProducts(Object.values(productIds));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function purchaseProduct(productId: string): Promise<boolean> {
  if (!isPurchasesAvailable()) {
    Alert.alert(
      t("purchase.error"),
      "Compras não disponíveis. Use um build de desenvolvimento para testar compras."
    );
    return false;
  }

  try {
    if (!isInitialized) {
      Alert.alert(
        t("purchase.error"),
        "Sistema de compras não inicializado"
      );
      return false;
    }

    await RNIap.requestPurchase({ sku: productId });
    return true;
  } catch (error: any) {
    console.error("Error purchasing product:", error);
    
    if (error.code !== "E_USER_CANCELLED") {
      Alert.alert(
        t("purchase.error"),
        error.message || t("purchase.error")
      );
    }
    return false;
  }
}

export async function restorePurchases(
  setPremium: (isPremium: boolean) => Promise<void>
): Promise<boolean> {
  if (!isPurchasesAvailable()) {
    Alert.alert(
      t("purchase.error"),
      "Compras não disponíveis. Use um build de desenvolvimento para testar compras."
    );
    return false;
  }

  try {
    if (!isInitialized) {
      Alert.alert(
        t("purchase.error"),
        "Sistema de compras não inicializado"
      );
      return false;
    }

    const purchases = await RNIap.getAvailablePurchases();
    
    if (purchases.length === 0) {
      Alert.alert(
        t("purchase.restore"),
        t("purchase.noPurchases")
      );
      return false;
    }

    await setPremium(true);
    
    for (const purchase of purchases) {
      try {
        await RNIap.finishTransaction(purchase);
      } catch (error) {
        console.error("Error finishing restored purchase:", error);
      }
    }
    
    Alert.alert(
      t("purchase.restoreSuccess"),
      t("purchase.restoreSuccess")
    );
    
    return true;
  } catch (error: any) {
    console.error("Error restoring purchases:", error);
    Alert.alert(
      t("purchase.restoreError"),
      error.message || t("purchase.restoreError")
    );
    return false;
  }
}

export function cleanupPurchases() {
  if (purchaseUpdateSubscription) {
    purchaseUpdateSubscription.remove();
    purchaseUpdateSubscription = null;
  }
  if (purchaseErrorSubscription) {
    purchaseErrorSubscription.remove();
    purchaseErrorSubscription = null;
  }
}

export async function disconnectPurchases() {
  cleanupPurchases();
  if (RNIap) {
    try {
      await RNIap.endConnection();
    } catch (error) {
      console.error("Error disconnecting purchases:", error);
    }
  }
}

export { productIds };
