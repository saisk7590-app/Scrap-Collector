import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminDashboardScreen from "./Screens/Dashboard/AdminDashboardScreen";
import PickupManagementScreen from "./Screens/Pickups/PickupManagementScreen";
import CollectorManagementScreen from "./Screens/Collectors/CollectorManagementScreen";
import InvoiceListScreen from "./Screens/Invoices/InvoiceListScreen";
import InvoicePreviewscreen from "./Screens/Invoices/InvoicePreviewScreen";
import ReportsScreen from "./Screens/Reports/ReportsScreen";
import ComingSoonScreen from "./Screens/ComingSoonScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="PickupManagement" component={PickupManagementScreen} />
        <Stack.Screen name="CollectorManagement" component={CollectorManagementScreen} />
        <Stack.Screen name="Invoices" component={InvoiceListScreen} />
        <Stack.Screen name="InvoicePreview" component={InvoicePreviewscreen}/>
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
