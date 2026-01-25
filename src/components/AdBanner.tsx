import { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { usePremiumStore } from "../store/premiumStore";
import Constants from "expo-constants";

const isExpoGo = Constants.executionEnvironment === "storeClient";

const TEST_BANNER_ID = TestIds.BANNER;

const BANNER_ID = Platform.select({
  android: "ca-app-pub-3940256099942544/6300978111",
  ios: "ca-app-pub-3940256099942544/2934735716",
  default: "ca-app-pub-3940256099942544/6300978111",
})!;

type Props = {
  style?: any;
};

export function AdBanner({ style }: Props) {
  const { isPremium } = usePremiumStore();
  const [adUnitId, setAdUnitId] = useState<string>(TEST_BANNER_ID);

  useEffect(() => {
    if (!isExpoGo) {
      setAdUnitId(BANNER_ID);
    }
  }, []);

  if (isPremium) {
    return null;
  }

  if (isExpoGo) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
