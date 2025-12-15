import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SnippetListScreen } from "../screens/SnippetListScreen";
import { SnippetFormScreen } from "../screens/SnippetFormScreen";

export type RootStackParamList = {
  SnippetList: undefined;
  SnippetForm: { id?: string };
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
