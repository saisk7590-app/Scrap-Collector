import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CheckCircle,
  Clock,
  Wallet,
  Menu,
  Bell,
  History,
} from "lucide-react-native";

export default function CollectorDashboardScreen({ navigation }) {
  const stats = {
    todayPickups: 4,
    pending: 2,
    completed: 2,
    todayEarnings: 1250,
  };

  /* ✅ FIXED MOCK DATA (same keys everywhere) */
  const todayPickups = [
    {
      id: 1,
      customerName: "Priya Sharma",
      wasteType: "Plastic & Paper",
      time: "10:00 AM - 11:00 AM",
      status: "pending",
    },
    {
      id: 2,
      customerName: "Sai Kiran",
      wasteType: "E-Waste",
      time: "08:00 AM - 09:00 AM",
      status: "completed",
    },
    {
      id: 3,
      customerName: "Anjali Reddy",
      wasteType: "Plastic",
      time: "02:00 PM - 03:00 PM",
      status: "pending",
    },
    {
      id: 4,
      customerName: "Vikram Patel",
      wasteType: "Metal",
      time: "04:00 PM - 05:00 PM",
      status: "completed",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcome}>Welcome Back,</Text>
              <Text style={styles.username}>Ramesh Kumar</Text>
            </View>

            <View style={styles.headerIcons}>
              <View style={styles.iconCircle}>
                <Bell color="#FFF" size={20} />
              </View>
              <View style={styles.iconCircle}>
                <Menu color="#FFF" size={20} />
              </View>
            </View>
          </View>

          <View style={styles.headerStats}>
            <View style={styles.statCard}>
              <Clock color="#E0F2FE" size={20} />
              <Text style={styles.statLabel}>Today’s Pickups</Text>
              <Text style={styles.statValue}>{stats.todayPickups}</Text>
            </View>

            <View style={styles.statCard}>
              <Wallet color="#E0F2FE" size={20} />
              <Text style={styles.statLabel}>Today’s Earnings</Text>
              <Text style={styles.statValue}>₹{stats.todayEarnings}</Text>
            </View>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* QUICK STATS */}
          <View style={styles.row}>
            <View style={styles.whiteCard}>
              <Clock color="#F97316" size={20} />
              <Text style={styles.cardLabel}>Pending</Text>
              <Text style={styles.cardValue}>{stats.pending} pickups</Text>
            </View>

            <View style={styles.whiteCard}>
              <CheckCircle color="#22C55E" size={20} />
              <Text style={styles.cardLabel}>Completed</Text>
              <Text style={styles.cardValue}>{stats.completed} pickups</Text>
            </View>
          </View>

          {/* ✅ ONLY BUTTON TO KEEP */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("PickupHistory")}
          >
            <History color="#2563EB" size={20} />
            <Text style={styles.secondaryButtonText}>
              View Pickup History
            </Text>
          </TouchableOpacity>

          {/* TODAY SCHEDULE */}
          <Text style={styles.sectionTitle}>Today’s Schedule</Text>

          {todayPickups.map((pickup) => (
            <TouchableOpacity
              key={pickup.id}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("PickupDetails", { pickup })
              }
            >
              <View
                style={[
                  styles.scheduleCard,
                  {
                    borderLeftColor:
                      pickup.status === "pending"
                        ? "#F97316"
                        : "#22C55E",
                  },
                ]}
              >
                <Text style={styles.customerName}>
                  {pickup.customerName}
                </Text>
                <Text style={styles.subText}>{pickup.wasteType}</Text>
                <Text style={styles.timeText}>{pickup.time}</Text>

                <Text
                  style={
                    pickup.status === "pending"
                      ? styles.pendingBadge
                      : styles.completedBadge
                  }
                >
                  {pickup.status.toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#2563EB" },
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  header: {
    backgroundColor: "#2563EB",
    padding: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  welcome: { color: "#DBEAFE", fontSize: 14 },
  username: { color: "#fff", fontSize: 20, fontWeight: "700" },

  headerIcons: { flexDirection: "row", gap: 10 },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerStats: { flexDirection: "row", gap: 12 },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 14,
    borderRadius: 14,
  },

  statLabel: { color: "#DBEAFE", fontSize: 12, marginTop: 6 },
  statValue: { color: "#fff", fontSize: 22, fontWeight: "700" },

  content: { padding: 20 },

  row: { flexDirection: "row", gap: 12, marginBottom: 20 },

  whiteCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
  },

  cardLabel: { color: "#6B7280", fontSize: 12, marginTop: 6 },
  cardValue: { color: "#111827", fontSize: 16, fontWeight: "600" },

  secondaryButton: {
    backgroundColor: "#E0E7FF",
    height: 52,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },

  secondaryButtonText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  scheduleCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 5,
    marginBottom: 12,
  },

  customerName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  subText: { color: "#6B7280", marginTop: 4 },
  timeText: { color: "#9CA3AF", marginTop: 4 },

  pendingBadge: { marginTop: 6, color: "#F97316", fontWeight: "700" },
  completedBadge: { marginTop: 6, color: "#22C55E", fontWeight: "700" },
});
