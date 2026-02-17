import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import{
  User,
  MapPin,
  Phone,
} from "lucide-react-native";


export default function CollectorManagementScreen({navigation}) {
  const Collectors=[
    {
      id: "1",
      name: "Ramesh Kumar",
      phone: "+91 9876543210",
      status: "Active",
      location: "Hitech City Zone",
      assignedPickups: 3,
      completedToday: 5,
      todayEarnings: 1250,

    },
    {
      id: "2",
      name: "Suresh Rao",
      phone: "+91 9988776655",
      status: "Active",
      location: "Gachibowli Zone",
      assignedPickups: 2,
      completedToday: 4,
      todayEarnings: 980,
    },
    {
      id: "3",
      name: "Vijay Reddy",
      phone: "+91 8877665544",
      status: "Offline",
      location: "Jubilee Hills Zone",
      assignedPickups: 0,
      completedToday: 3,
      todayEarnings: 750,
    },
    {
      id: "4",
      name: "Prakash Singh",
      phone: "+91 7766554433",
      status: "Active",
      location: "Kukatpally Zone",
      assignedPickups: 4,
      completedToday: 6,
      todayEarnings: 1500,
    },
    {
      id: "5",
      name: "Kumar Swamy",
      phone: "+91 9876501234",
      status: "Offline",
      location: "Banjara Hills Zone",
      assignedPickups: 0,
      completedToday: 2,
      todayEarnings: 450,
    },
  ];

  const activeCollectors= Collectors.filter(c=>c.status==="Active").length;
  const totalAssigned= Collectors.reduce((s,c)=>s+c.assignedPickups,0 );
  const totalCompleted=Collectors.reduce((s,c)=>s+c.completedToday,0);
  return (

    <View style={styles.container}>
      {/*HEADER*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#111827"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collector Management</Text>
      </View>

      <ScrollView>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Overview</Text>

          <View style={styles.summaryRow}>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Active</Text>
              <Text style={styles.summaryValue}>{activeCollectors}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Assigned</Text>
              <Text style={styles.summaryValue}>{totalAssigned}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Completed</Text>
              <Text style={styles.summaryValue}>{totalCompleted}</Text>
            </View>

          </View>
        </View>

        {/* Collector Cards */}
        {Collectors.map((c)=>(
          <View    
            key={c.id}
            style={[
              styles.card,
              {borderLeftColor:c.status==="Active"? "#22C55E":"#9CA3AF"}
            ]}
          >
            {/* Top Row */}
            <View style={styles.cardHeader}>
              <View style={styles.userRow}>
                <View
                  style={[
                    styles.avatarOuter,
                    {
                      borderColor:c.status==="Active"? "#DCFCE7" : "#E5E7EB",
                      borderWidth:1,
                      borderColor: c.status==="Active"? "#86EFAC" : "#D1D5DB",
                    }
                  ]}
                >
                  <User
                    size={22}
                    color={c.status === "Active" ? "#16A34A" : "#6B7280"}
                    strokeWidth={2}
                  />
                </View>

                <View>
                  <Text style={styles.name}>{c.name}</Text>
                  <View style={styles.phoneRow}>
                    <Phone size={12} color="#6B7280"/>
                    <Text style={styles.phone}>{c.phone}</Text>
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      c.status==="Active" ? "#DCFCE7" : "#F3F4F6",
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize:12,
                    color:c.status==="Active" ? "#15803D" : "#4B5563",
                  }}
                >
                  {c.status}
                </Text>
              </View>
            </View>

            {/* Location */}
            <View style={styles.locationRow}>
              <MapPin size={14} color="#6B7280"/>
              <Text style={styles.location}>{c.location}</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Assigned</Text>
                <Text style={styles.assigned}>{c.assignedPickups}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Completed</Text>
                <Text style={styles.completed}>{c.completedToday}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Earnings</Text>
                <Text style={styles.earnings}>₹{c.todayEarnings}</Text>
              </View>
            </View>
          </View>
        ))}

      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  /* ---------- HEADER ---------- */
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
    color: "#111827",
  },

  content: {
    padding: 16,
  },

  /* ---------- SUMMARY CARD ---------- */
  summaryCard: {
    backgroundColor: "#7C3AED",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 12,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  summaryItem: {
    alignItems: "center",
    flex: 1,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#E9D5FF",
    marginBottom: 4,
  },

  summaryValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* ---------- COLLECTOR CARD ---------- */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  phone: {
    fontSize: 12,
    color: "#6B7280",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  /* ---------- LOCATION ---------- */
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },

  location: {
    fontSize: 13,
    color: "#6B7280",
  },

  /* ---------- STATS ---------- */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
  },

  stat: {
    alignItems: "center",
    flex: 1,
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },

  assigned: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7C3AED",
  },

  completed: {
    fontSize: 14,
    fontWeight: "600",
    color: "#22C55E",
  },

  earnings: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  avatarOuter: {
    
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});

