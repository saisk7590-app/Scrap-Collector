import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* ===== SCREENS ===== */
import SignUpScreen from "./Screens/Auth/SignUpScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";
import CollectorDashboardScreen from "./Screens/Dashboard/CollectorDashboardScreen";
import PickupDetailsScreen from "./Screens/Pickups/PickupDetailsScreen";
import PickupActionScreen from "./Screens/Pickups/PickupActionScreen"; // ✅ ADD THIS
import PickupHistoryScreen from "./Screens/Pickups/PickupHistoryScreen"
import InvoiceScreen from "./Screens/Invoice/InvoiceScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          {/* Dashboard */}
          <Stack.Screen
            name="CollectorDashboard"
            component={CollectorDashboardScreen}
          />

          <Stack.Screen
            name="PickupDetails"
            component={PickupDetailsScreen}
          />

          <Stack.Screen
            name="PickupAction"
            component={PickupActionScreen}
          />
          <Stack.Screen
            name="PickupHistory"
            component={PickupHistoryScreen}
          />

          {/* Invoice */}
          <Stack.Screen
            name="Invoice"
            component={InvoiceScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
