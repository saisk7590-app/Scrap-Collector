import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Clock, CheckCircle } from "lucide-react-native";

import Header from "../../components/Header";
import PickupCard from "../../components/PickupCard";
import SectionHeader from "../../components/SectionHeader";
import WalletInfoCard from "../../components/WalletInfoCard";

// Import constants directly (Snack-friendly)
import { COLORS } from "../../constants/colors";
import { SPACING } from "../../constants/spacing";

/* TEMP DATA */
const pickups = [
  { id: "1", scrapType: "Plastic Bottles", quantity: 15, date: "Dec 14, 2024", status: "completed", amount: 450 },
  { id: "2", scrapType: "Paper & Cardboard", quantity: 25, date: "Dec 12, 2024", status: "completed", amount: 750 },
  { id: "3", scrapType: "E-Waste", quantity: 8, date: "Dec 10, 2024", status: "completed", amount: 800 },
  { id: "4", scrapType: "Metal Cans", quantity: 12, date: "Dec 15, 2024", status: "pending" },
  { id: "5", scrapType: "Glass Bottles", quantity: 10, date: "Dec 18, 2024", status: "completed", amount: 300 },
];

/* CALCULATIONS */
const completedPickups = pickups.filter(p => p.status === "completed");
const pendingPickups = pickups.filter(p => p.status === "pending");

const totalEarnings = completedPickups.reduce((sum, p) => sum + (p.amount || 0), 0);
const totalScrap = completedPickups.reduce((sum, p) => sum + p.quantity, 0);

export default function HistoryScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* HEADER */}
      <SafeAreaView style={{ backgroundColor: COLORS.primary }}>
        <Header
          variant="main" // rectangle type
          title="Pickup History"
          showBack
        />

        {/* Reusable WalletInfoCard */}
        <WalletInfoCard
          balance={totalEarnings}
          totalScrap={totalScrap}
          variant="history"
          style={{ 
            marginHorizontal: SPACING.md, 
            marginTop: SPACING.md, 
            marginBottom: SPACING.md
          }}
        />
      </SafeAreaView>

      {/* LIST */}
      <ScrollView contentContainerStyle={{ padding: SPACING.md }}>
        {pendingPickups.length > 0 && (
          <>
            <SectionHeader icon={Clock} title="Pending Pickups" color={COLORS.warning} />
            {pendingPickups.map(item => (
              <PickupCard key={item.id} data={item} />
            ))}
          </>
        )}

        <SectionHeader icon={CheckCircle} title="Completed Pickups" color={COLORS.success} />
        {completedPickups.map(item => (
          <PickupCard key={item.id} data={item} />
        ))}
      </ScrollView>
    </View>
  );
}
