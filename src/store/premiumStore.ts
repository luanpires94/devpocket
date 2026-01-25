import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PREMIUM_STORAGE_KEY = "@devpocket:isPremium";

type PremiumState = {
  isPremium: boolean;
  loadPremiumStatus: () => Promise<void>;
  setPremium: (isPremium: boolean) => Promise<void>;
};

export const usePremiumStore = create<PremiumState>((set) => ({
  isPremium: false,

  loadPremiumStatus: async () => {
    try {
      const stored = await AsyncStorage.getItem(PREMIUM_STORAGE_KEY);
      const isPremium = stored === "true";
      set({ isPremium });
    } catch (error) {
      console.error("Erro ao carregar status premium:", error);
      set({ isPremium: false });
    }
  },

  setPremium: async (isPremium: boolean) => {
    try {
      await AsyncStorage.setItem(PREMIUM_STORAGE_KEY, String(isPremium));
      set({ isPremium });
    } catch (error) {
      console.error("Erro ao salvar status premium:", error);
    }
  },
}));

export const FREE_SNIPPET_LIMIT = 5;
export const PREMIUM_SNIPPET_LIMIT = Infinity;
