import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightColors, darkColors } from "./colors";
import { ThemeColors } from "./theme";

type Theme = "light" | "dark" | "system";

type ThemeContextData = {
  theme: Theme;
  colors: ThemeColors;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const STORAGE_KEY = "@devpocket:theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((storedTheme) => {
      if (storedTheme === "light" || storedTheme === "dark") {
        setThemeState(storedTheme);
      }
    });
  }, []);

  function setTheme(theme: Theme) {
    setThemeState(theme);
    AsyncStorage.setItem(STORAGE_KEY, theme);
  }

  const isDark =
    theme === "dark" || (theme === "system" && systemScheme === "dark");

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
