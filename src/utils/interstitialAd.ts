import { InterstitialAd, AdEventType, TestIds } from "react-native-google-mobile-ads";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { AdUnitIds, isAdMobAvailable } from "./adMob";

const isExpoGo = Constants.executionEnvironment === "storeClient";

const TEST_INTERSTITIAL_ID = TestIds.INTERSTITIAL;

const INTERSTITIAL_ID = AdUnitIds.interstitial;

let interstitial: InterstitialAd | null = null;

export function loadInterstitialAd(): void {
  if (!isAdMobAvailable() || isExpoGo) {
    return;
  }

  try {
    interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_ID, {
      requestNonPersonalizedAdsOnly: true,
    });

    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log("Anúncio intersticial carregado");
    });

    interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error("Erro ao carregar anúncio intersticial:", error);
    });

    interstitial.load();
  } catch (error) {
    console.error("Erro ao criar anúncio intersticial:", error);
  }
}

export async function showInterstitialAd(): Promise<boolean> {
  if (!isAdMobAvailable() || isExpoGo || !interstitial) {
    return false;
  }

  try {
    const isLoaded = await interstitial.loaded();
    if (isLoaded) {
      await interstitial.show();
      loadInterstitialAd();
      return true;
    } else {
      loadInterstitialAd();
      return false;
    }
  } catch (error) {
    console.error("Erro ao mostrar anúncio intersticial:", error);
    return false;
  }
}

export function initializeInterstitialAd(): void {
  if (isAdMobAvailable() && !isExpoGo) {
    loadInterstitialAd();
  }
}
