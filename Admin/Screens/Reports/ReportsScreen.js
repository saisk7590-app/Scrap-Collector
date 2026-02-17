import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

/* ---------- DATA ---------- */

const dailyStats = {
  date: "Jan 9, 2026",
  pickups: 45,
  revenue: 28500,
  collectors: 12,
  customers: 38,
};

const weeklyStats = {
  period: "Jan 3 - Jan 9, 2026",
  pickups: 287,
  revenue: 185600,
  avgPerPickup: 647,
  growth: "+12%",
};

const weeklyChartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [4200, 3800, 5100, 4600, 6200, 7100, 6800],
    },
  ],
};

const categoryBreakdown = [
  { category: "E-Waste", weight: 125, revenue: 18750, color: "#F59E0B" },
  { category: "Plastic", weight: 350, revenue: 28000, color: "#3B82F6" },
  { category: "Paper", weight: 420, revenue: 16800, color: "#9CA3AF" },
  { category: "Metal", weight: 280, revenue: 56000, color: "#4B5563" },
];

const screenWidth = Dimensions.get("window").width;

/* ---------- SCREEN ---------- */

export default function AdminReportsScreen({ navigation }) {
  const totalWeight = categoryBreakdown.reduce(
    (sum, i) => sum + i.weight,
    0
  );
  const totalRevenue = categoryBreakdown.reduce(
    (sum, i) => sum + i.revenue,
    0
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reports & Analytics</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* DAILY SUMMARY */}
        <Text style={styles.sectionTitle}>Daily Summary</Text>
        <Text style={styles.dateText}>{dailyStats.date}</Text>

        <View style={styles.grid}>
          <StatCard label="Pickups" value={dailyStats.pickups} />
          <StatCard
            label="Revenue"
            value={`₹${dailyStats.revenue.toLocaleString()}`}
          />
          <StatCard label="Collectors" value={dailyStats.collectors} />
          <StatCard label="Customers" value={dailyStats.customers} />
        </View>

        {/* WEEKLY SUMMARY */}
        <Text style={styles.sectionTitle}>Weekly Summary</Text>
        <Text style={styles.dateText}>{weeklyStats.period}</Text>

        <View style={styles.weeklyCard}>
          <View style={styles.weekRow}>
            <InfoBlock label="Total Pickups" value={weeklyStats.pickups} />
            <InfoBlock
              label="Revenue"
              value={`₹${weeklyStats.revenue.toLocaleString()}`}
            />
          </View>

          <View style={styles.weekFooter}>
            <Text style={styles.avgText}>
              Avg / Pickup: ₹{weeklyStats.avgPerPickup}
            </Text>
            <Text style={styles.growth}>{weeklyStats.growth}</Text>
          </View>
        </View>

        {/* WEEKLY CHART */}
        <Text style={styles.sectionTitle}>Weekly Revenue Trend</Text>

        <LineChart
          data={weeklyChartData}
          width={screenWidth - 32}
          height={220}
          yAxisLabel="₹"
          chartConfig={{
            backgroundColor: "#7C3AED",
            backgroundGradientFrom: "#7C3AED",
            backgroundGradientTo: "#6D28D9",
            decimalPlaces: 0,
            color: () => "#FFFFFF",
            labelColor: () => "#FFFFFF",
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#FFFFFF",
            },
          }}
          bezier
          style={styles.chart}
        />

        {/* CATEGORY BREAKDOWN */}
        <Text style={styles.sectionTitle}>Scrap by Category</Text>

        <View style={styles.categoryCard}>
          <View style={styles.summaryHeader}>
            <View style={styles.summaryBlock}>
              <Text style={styles.summaryLabel}>Total Weight</Text>
              <Text style={styles.summaryValue}>{totalWeight}</Text>
            </View>
            <View style={styles.summaryBlock}>
              <Text style={styles.summaryLabel}>Total Revenue</Text>
              <Text style={styles.summaryValuePurple}>
                ₹{totalRevenue.toLocaleString()}
              </Text>
            </View>
          </View>

          {categoryBreakdown.map((cat) => {
            const percent = (cat.weight / totalWeight) * 100;
            return (
              <View key={cat.category} style={{ marginBottom: 14 }}>
                <View style={styles.catRow}>
                  <View style={styles.catLeft}>
                    <View
                      style={[
                        styles.dot,
                        { backgroundColor: cat.color },
                      ]}
                    />
                    <Text>{cat.category}</Text>
                  </View>
                  <Text>{cat.weight} kg</Text>
                </View>

                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${percent}%`,
                        backgroundColor: cat.color,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- COMPONENTS ---------- */

const StatCard = ({ label, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const InfoBlock = ({ label, value }) => (
  <View>
    <Text style={styles.weekLabel}>{label}</Text>
    <Text style={styles.weekValue}>{value}</Text>
  </View>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9FAFB" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },

  container: { padding: 16 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
  },

  dateText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  statCard: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    padding: 14,
    borderRadius: 12,
  },

  statLabel: { fontSize: 12, color: "#6B7280" },
  statValue: { fontSize: 18, fontWeight: "700" },

  weeklyCard: {
    backgroundColor: "#7C3AED",
    borderRadius: 16,
    padding: 16,
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  weekLabel: { color: "#E9D5FF", fontSize: 12 },
  weekValue: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },

  weekFooter: {
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: "#8B5CF6",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  avgText: { color: "#E9D5FF" },
  growth: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    color: "#FFFFFF",
  },

  chart: {
    borderRadius: 16,
    marginVertical: 12,
  },

  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  catRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  catLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  progressBg: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
  },

  progressFill: {
    height: 6,
    borderRadius: 6,
  },
  summaryHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
},

summaryBlock: {
  flex: 1,
},

summaryLabel: {
  fontSize: 12,
  color: "#6B7280",
  marginBottom: 4,
},

summaryValue: {
  fontSize: 16,
  fontWeight: "700",
  color: "#111827",
},

summaryValuePurple: {
  fontSize: 16,
  fontWeight: "700",
  color: "#7C3AED",
  textAlign: "right",
},

});
