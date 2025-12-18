import { AppNavigation } from "./navigation";
import { ThemeProvider } from "./theme/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}
