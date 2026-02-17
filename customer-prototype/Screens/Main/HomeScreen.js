import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Recycle, FileText, Cpu, Coins, GlassWater } from "lucide-react-native";

import Header from "../../components/Header";
import WalletInfoCard from "../../components/WalletInfoCard";
import CategoryCard from "../../components/CategoryCard";
import CustomButton from "../../components/CustomButton";

import { COLORS, SPACING, ROUTES } from "../../constants";

/* SHARED PICKUP DATA */
const pickups = [
  { id: "1", scrapType: "Plastic Bottles", quantity: 15, date: "Dec 14, 2024", status: "completed", amount: 450 },
  { id: "2", scrapType: "Paper & Cardboard", quantity: 25, date: "Dec 12, 2024", status: "completed", amount: 750 },
  { id: "3", scrapType: "E-Waste", quantity: 8, date: "Dec 10, 2024", status: "completed", amount: 800 },
  { id: "4", scrapType: "Metal Cans", quantity: 12, date: "Dec 15, 2024", status: "pending" },
  { id: "5", scrapType: "Glass Bottles", quantity: 10, date: "Dec 18, 2024", status: "completed", amount: 300 },
];

/* CALCULATIONS (same as HistoryScreen) */
const completedPickups = pickups.filter(p => p.status === "completed");
const walletBalance = completedPickups.reduce((sum, p) => sum + (p.amount || 0), 0);
const totalScrap = completedPickups.reduce((sum, p) => sum + p.quantity, 0);

const CATEGORY_DATA = [
  { name: "Plastic", icon: Recycle, iconBg: "#3B82F6", bg: "#EFF6FF" },
  { name: "E-Waste", icon: Cpu, iconBg: "#EAB308", bg: "#FEFCE8" },
  { name: "Paper", icon: FileText, iconBg: "#9CA3AF", bg: "#F9FAFB" },
  { name: "Metal", icon: Coins, iconBg: "#94A3B8", bg: "#F8FAFC" },
  { name: "Glass", icon: GlassWater, iconBg: "#0EA5E9", bg: "#F0F9FF" },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Header */}
        <Header
          variant="home"
          onNotificationPress={() => navigation.navigate(ROUTES.NOTIFICATIONS)}
        />

        {/* Wallet - now dynamic from completedPickups */}
        <WalletInfoCard
          balance={walletBalance}
          totalScrap={totalScrap}
          onPress={() => navigation.navigate(ROUTES.HISTORY)}
          variant="home"
          style={{ marginHorizontal: SPACING.md, marginTop: -28 }}
        />

        {/* Categories */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: SPACING.md,
            marginTop: SPACING.lg,
          }}
        >
          {CATEGORY_DATA.map((item) => (
            <CategoryCard
              key={item.name}
              title={item.name}
              icon={item.icon}
              iconBg={item.iconBg}
              cardBg={item.bg}
              onPress={() =>
                navigation.navigate(ROUTES.SELL_SCRAP, { category: item.name })
              }
            />
          ))}
        </View>
      </ScrollView>

      {/* Request Pickup Button */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: SPACING.md,
          borderTopWidth: 1,
          borderColor: COLORS.border,
          backgroundColor: COLORS.white,
        }}
      >
        <CustomButton
          title="Request Pickup"
          onPress={() => navigation.navigate(ROUTES.SELL_SCRAP)}
          variant="primary"
        />
      </View>
    </SafeAreaView>
  );
}
