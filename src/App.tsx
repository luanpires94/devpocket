import { useEffect } from "react";
import { AppNavigation } from "./navigation";
import { ThemeProvider } from "./theme/ThemeProvider";
import { usePremiumStore } from "./store/premiumStore";
import { initPurchases, disconnectPurchases } from "./utils/purchases";
import { initializeAdMob } from "./utils/adMob";
import { initializeInterstitialAd } from "./utils/interstitialAd";
import "./i18n";

function AppContent() {
  const { loadPremiumStatus, setPremium } = usePremiumStore();

  useEffect(() => {
    loadPremiumStatus();
    initPurchases(setPremium);
    initializeAdMob();
    initializeInterstitialAd();

    return () => {
      disconnectPurchases();
    };
  }, []);

  return <AppNavigation />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
