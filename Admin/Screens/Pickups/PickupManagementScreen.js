import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Filter } from "lucide-react-native";

export default function PickupManagementScreen({ navigation }) {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const pickups = [
    {
      id: "1",
      customer: "Sai Kiran",
      collector: "Ramesh Kumar",
      type: "E-Waste",
      date: "Jan 9, 2026",
      time: "8:00 AM - 9:00 AM",
      status: "Completed",
      amount: 850,
      location: "Hitech City",
    },
    {
      id: "2",
      customer: "Anjali Reddy",
      collector: "Not Assigned",
      type: "Plastic",
      date: "Jan 9, 2026",
      time: "2:00 PM - 3:00 PM",
      status: "Pending",
      amount: 0,
      location: "Gachibowli",
    },
    {
      id: "3",
      customer: "Priya Sharma",
      collector: "Ramesh Kumar",
      type: "Paper & Plastic",
      date: "Jan 9, 2026",
      time: "10:00 AM - 11:00 AM",
      status: "Assigned",
      amount: 850,
      location: "Jubilee Hills",
    },
    {
      id: "4",
      customer: "Vikram Patel",
      collector: "Suresh Rao",
      type: "Metal",
      date: "Jan 8, 2026",
      time: "4:00 PM - 5:00 PM",
      status: "Completed",
      amount: 1200,
      location: "Kukatpally",
    },
    {
      id: "5",
      customer: "Meera Nair",
      collector: "Not Assigned",
      type: "E-Waste",
      date: "Jan 10, 2026",
      time: "11:00 AM - 12:00 PM",
      status: "Pending",
      amount: 0,
      location: "Banjara Hills",
    },
  ];

  const filtered =
    selectedStatus === "All"
      ? pickups
      : pickups.filter((p) => p.status === selectedStatus);

  const count = (status) =>
    pickups.filter((p) => p.status === status).length;

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FB923C";
      case "Assigned":
        return "#3B82F6";
      case "Completed":
        return "#22C55E";
      default:
        return "#9CA3AF";
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pickup Management</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Filter Label */}
        <View style={styles.filterLabelRow}>
          <Filter size={14} color="#6B7280" />
          <Text style={styles.filterLabel}>Filter by Status</Text>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterRow}>
          {["All", "Pending", "Assigned", "Completed"].map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSelectedStatus(s)}
              style={[
                styles.filterBtn,
                selectedStatus === s && styles.filterActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedStatus === s && { color: "#fff" },
                ]}
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Summary */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={[styles.statValue, { color: "#FB923C" }]}>
              {count("Pending")}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Assigned</Text>
            <Text style={[styles.statValue, { color: "#3B82F6" }]}>
              {count("Assigned")}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Completed</Text>
            <Text style={[styles.statValue, { color: "#22C55E" }]}>
              {count("Completed")}
            </Text>
          </View>
        </View>

        {/* Pickup Cards */}
        {filtered.map((p) => (
          <View key={p.id} style={styles.card}>
            <View
              style={[
                styles.colorStrip,
                { backgroundColor: statusColor(p.status) },
              ]}
            />

            <View style={styles.cardContent}>
              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.name}>{p.customer}</Text>
                  <Text style={styles.sub}>{p.type}</Text>
                </View>
                <Text
                  style={[
                    styles.statusBadge,
                    {
                      color: statusColor(p.status),
                      borderColor: statusColor(p.status),
                    },
                  ]}
                >
                  {p.status}
                </Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="calendar-outline" size={14} />
                <Text style={styles.info}>{p.date}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="time-outline" size={14} />
                <Text style={styles.info}>{p.time}</Text>
              </View>

              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <Ionicons name="person-outline" size={14} />
                  <Text style={styles.info}>{p.collector}</Text>
                </View>
                {p.amount > 0 && (
                  <Text style={styles.amount}>₹{p.amount}</Text>
                )}
              </View>

              <View style={styles.row}>
                <Ionicons name="location-outline" size={14} />
                <Text style={styles.info}>{p.location}</Text>
              </View>
            </View>
          </View>
        ))}

        {filtered.length === 0 && (
          <Text style={styles.empty}>No pickups found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },

  headerTitle: {
    fontSize: 18,
    marginLeft: 12,
    fontWeight: "600",
    color: "#111827",
  },

  content: {
    padding: 16,
  },

  filterLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },

  filterLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  filterActive: {
    backgroundColor: "#7C3AED",
    borderColor: "#7C3AED",
  },

  filterText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },

  statLabel: { fontSize: 12, color: "#666" },
  statValue: { fontSize: 18, fontWeight: "600" },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },

  colorStrip: { width: 6 },

  cardContent: { flex: 1, padding: 14 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: { fontSize: 15, fontWeight: "600" },
  sub: { fontSize: 12, color: "#777" },
  info: { fontSize: 12, color: "#555" },
  amount: { fontWeight: "600", color: "#7C3AED" },

  statusBadge: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});
