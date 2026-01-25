import mobileAds from "react-native-google-mobile-ads";
import Constants from "expo-constants";
import { Platform } from "react-native";

const isExpoGo = Constants.executionEnvironment === "storeClient";

export async function initializeAdMob(): Promise<boolean> {
  if (isExpoGo) {
    console.log("AdMob não disponível em Expo Go");
    return false;
  }

  try {
    await mobileAds().initialize();
    console.log("AdMob inicializado com sucesso");
    return true;
  } catch (error) {
    console.error("Erro ao inicializar AdMob:", error);
    return false;
  }
}

export const AdUnitIds = {
  banner: Platform.select({
    android: "ca-app-pub-3940256099942544/6300978111",
    ios: "ca-app-pub-3940256099942544/2934735716",
    default: "ca-app-pub-3940256099942544/6300978111",
  })!,

  interstitial: Platform.select({
    android: "ca-app-pub-3940256099942544/1033173712",
    ios: "ca-app-pub-3940256099942544/4411468910",
    default: "ca-app-pub-3940256099942544/1033173712",
  })!,

  rewarded: Platform.select({
    android: "ca-app-pub-3940256099942544/5224354917",
    ios: "ca-app-pub-3940256099942544/1712485313",
    default: "ca-app-pub-3940256099942544/5224354917",
  })!,
};

export function isAdMobAvailable(): boolean {
  return !isExpoGo;
}
