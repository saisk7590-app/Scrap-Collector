import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Package,
  TrendingUp,
  Users,
  Clock,
  Bell,
  Menu,
  BarChart3,
  FileText,
} from "lucide-react-native";

const adminStats = {
  todayPickups: 45,
  todayRevenue: 28500,
  activeCollectors: 12,
  pendingRequests: 18,
};

export default function AdminDashboardScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.subTitle}>Admin Panel</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <Bell size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn}>
              <Menu size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* HEADER STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Package size={18} color="#E9D5FF" />
              <Text style={styles.statLabel}>Today's Pickups</Text>
            </View>
            <Text style={styles.statValue}>{adminStats.todayPickups}</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <TrendingUp size={18} color="#E9D5FF" />
              <Text style={styles.statLabel}>Today's Revenue</Text>
            </View>
            <Text style={styles.statValue}>
              ₹{adminStats.todayRevenue.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* QUICK STATS */}
        <View style={styles.quickStats}>
          <View style={styles.quickCard}>
            <Users size={20} color="#7C3AED" />
            <Text style={styles.quickLabel}>Active Collectors</Text>
            <Text style={styles.quickValue}>
              {adminStats.activeCollectors}
            </Text>
          </View>

          <View style={styles.quickCard}>
            <Clock size={20} color="#F97316" />
            <Text style={styles.quickLabel}>Pending</Text>
            <Text style={styles.quickValue}>
              {adminStats.pendingRequests}
            </Text>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsGrid}>
          <ActionCard
            icon={<Package size={28} color="#7C3AED" />}
            label="Pickup Management"
            onPress={() => navigation.navigate("PickupManagement")}
          />

          <ActionCard
            icon={<Users size={28} color="#7C3AED" />}
            label="Collectors"
            onPress={() => navigation.navigate("CollectorManagement")}
          />

          <ActionCard
            icon={<FileText size={28} color="#7C3AED" />}
            label="Invoices"
            onPress={() => navigation.navigate("Invoices")}
          />

          <ActionCard
            icon={<BarChart3 size={28} color="#7C3AED" />}
            label="Reports"
            onPress={() => navigation.navigate("Reports")}
          />
        </View>

        {/* RECENT ACTIVITY */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <ActivityCard
          color="#22C55E"
          title="Pickup Completed"
          subtitle="By Ramesh Kumar"
          meta="Customer: Sai Kiran • Amount: ₹850"
          time="2 min ago"
        />

        <ActivityCard
          color="#3B82F6"
          title="New Pickup Request"
          subtitle="Customer: Anjali Reddy"
          meta="Type: Plastic • Location: Gachibowli"
          time="15 min ago"
        />

        <ActivityCard
          color="#7C3AED"
          title="Collector Logged In"
          subtitle="Suresh Rao"
          meta="Status: Active • Assigned: 5 pickups"
          time="30 min ago"
        />
      </View>
    </ScrollView>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function ActionCard({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      {icon}
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function ActivityCard({ title, subtitle, meta, time, color }) {
  return (
    <View style={[styles.activityCard, { borderLeftColor: color }]}>
      <View style={styles.activityHeader}>
        <View>
          <Text style={styles.activityTitle}>{title}</Text>
          <Text style={styles.activitySub}>{subtitle}</Text>
        </View>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
      <Text style={styles.activityMeta}>{meta}</Text>
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  header: {
    backgroundColor: "#7C3AED",
    padding: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  subTitle: { color: "#E9D5FF", fontSize: 13 },
  title: { color: "#fff", fontSize: 22, fontWeight: "700" },

  headerIcons: { flexDirection: "row", gap: 12 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  statsRow: { flexDirection: "row", gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 14,
    borderRadius: 14,
  },

  statHeader: { flexDirection: "row", gap: 8, marginBottom: 6 },
  statLabel: { color: "#E9D5FF", fontSize: 13 },
  statValue: { color: "#fff", fontSize: 20, fontWeight: "700" },

  content: { padding: 20 },

  quickStats: { flexDirection: "row", gap: 12, marginBottom: 20 },
  quickCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
  },

  quickLabel: { color: "#6B7280", fontSize: 13, marginTop: 6 },
  quickValue: { fontSize: 18, fontWeight: "700", marginTop: 2 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 14,
  },

  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
  },

  actionLabel: { marginTop: 8, fontSize: 13 },

  activityCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
  },

  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  activityTitle: { fontWeight: "700" },
  activitySub: { color: "#6B7280", fontSize: 13 },
  activityTime: { color: "#9CA3AF", fontSize: 12 },
  activityMeta: { color: "#6B7280", fontSize: 13 },
});
