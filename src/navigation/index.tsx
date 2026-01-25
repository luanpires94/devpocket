import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SnippetListScreen } from "../screens/SnippetListScreen";
import { SnippetFormScreen } from "../screens/SnippetFormScreen";
import { StatisticsScreen } from "../screens/StatisticsScreen";
import { UpgradeScreen } from "../screens/UpgradeScreen";

export type RootStackParamList = {
  SnippetList: undefined;
  SnippetForm: { id?: string };
  Statistics: undefined;
  Upgrade: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SnippetList"
          component={SnippetListScreen}
          options={{ title: "DevPocket" }}
        />

        <Stack.Screen
          name="SnippetForm"
          component={SnippetFormScreen}
          options={{ title: "Novo Snippet" }}
        />

        <Stack.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{ title: "Estatísticas" }}
        />

        <Stack.Screen
          name="Upgrade"
          component={UpgradeScreen}
          options={{ title: "Upgrade para Premium" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
