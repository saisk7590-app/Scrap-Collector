import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  FileText,
  User,
  Calendar,
  Wallet,
  Eye,
} from "lucide-react-native";

export default function InvoiceListScreen({ navigation }) {
  const invoices = [
    {
      id: "INV-20260109001",
      customerName: "Sai Kiran",
      collectorName: "Ramesh Kumar",
      date: "Jan 9, 2026",
      amount: 850,
      paymentMode: "Cash",
      status: "Paid",
    },
    {
      id: "INV-20260109002",
      customerName: "Priya Sharma",
      collectorName: "Ramesh Kumar",
      date: "Jan 9, 2026",
      amount: 850,
      paymentMode: "Cash",
      status: "Paid",
    },
    {
      id: "INV-20260108001",
      customerName: "Vikram Patel",
      collectorName: "Suresh Rao",
      date: "Jan 8, 2026",
      amount: 1200,
      paymentMode: "Online",
      status: "Paid",
    },
  ];

  const totalRevenue = invoices.reduce((s, i) => s + i.amount, 0);
  const cashPayments = invoices.filter(i => i.paymentMode === "Cash").length;
  const onlinePayments = invoices.filter(i => i.paymentMode === "Online").length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice Overview</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Invoice Summary</Text>

          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Total Invoices</Text>
              <Text style={styles.summaryValue}>{invoices.length}</Text>
            </View>
            <View>
              <Text style={styles.summaryLabel}>Total Revenue</Text>
              <Text style={styles.summaryValue}>
                ₹{totalRevenue.toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.summaryBottom}>
            <Text style={styles.summarySmall}>Cash: {cashPayments}</Text>
            <Text style={styles.summarySmall}>Online: {onlinePayments}</Text>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            <Text style={{ fontWeight: "600" }}>Read-Only Access:</Text>{" "}
            Invoice details are view-only. Contact support for any modifications.
          </Text>
        </View>

        {/* Invoice List */}
        {invoices.map(inv => (
          <View key={inv.id} style={styles.invoiceCard}>
            {/* Top */}
            <View style={styles.invoiceTop}>
              <View style={styles.invoiceLeft}>
                <View style={styles.invoiceIcon}>
                  <FileText size={20} color="#7C3AED" />
                </View>
                <View>
                  <Text style={styles.invoiceId}>{inv.id}</Text>
                  <Text style={styles.customer}>{inv.customerName}</Text>
                </View>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.amount}>₹{inv.amount}</Text>
                <Text style={styles.paidBadge}>{inv.status}</Text>
              </View>
            </View>

            {/* Middle */}
            <View style={styles.invoiceMid}>
              <View style={styles.row}>
                <User size={14} color="#6B7280" />
                <Text style={styles.midText}>{inv.collectorName}</Text>
              </View>
              <View style={styles.row}>
                <Calendar size={14} color="#6B7280" />
                <Text style={styles.midText}>{inv.date}</Text>
              </View>
            </View>

            {/* Bottom */}
            <View style={styles.invoiceBottom}>
              <View style={styles.row}>
                <Wallet size={14} color="#6B7280" />
                <Text
                  style={[
                    styles.paymentBadge,
                    inv.paymentMode === "Cash"
                      ? styles.cash
                      : styles.online,
                  ]}
                >
                  {inv.paymentMode}
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.viewBtn}
                onPress={()=>
                  navigation.navigate("InvoicePreview",{
                    invoice:inv
                  })
                }
              >
                <Eye size={14} color="#7C3AED" />
                <Text style={styles.viewText}>View</Text>
              </TouchableOpacity>
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
    color: "#111827",
  },

  content: {
    padding: 16,
  },

  summaryCard: {
    backgroundColor: "#7C3AED",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  summaryTitle: {
    color: "#FFFFFF",
    marginBottom: 12,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  summaryLabel: {
    color: "#E9D5FF",
    fontSize: 12,
  },

  summaryValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  summaryBottom: {
    flexDirection: "row",
    gap: 16,
  },

  summarySmall: {
    color: "#E9D5FF",
    fontSize: 12,
  },

  infoBox: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },

  infoText: {
    color: "#1E40AF",
    fontSize: 13,
  },

  invoiceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },

  invoiceTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  invoiceLeft: {
    flexDirection: "row",
    gap: 12,
  },

  invoiceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
  },

  invoiceId: {
    fontSize: 14,
    color: "#111827",
  },

  customer: {
    fontSize: 12,
    color: "#6B7280",
  },

  amount: {
    color: "#7C3AED",
    fontWeight: "600",
  },

  paidBadge: {
    backgroundColor: "#DCFCE7",
    color: "#15803D",
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
  },

  invoiceMid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  midText: {
    fontSize: 12,
    color: "#6B7280",
  },

  invoiceBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
  },

  paymentBadge: {
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },

  cash: {
    backgroundColor: "#ECFDF5",
    color: "#15803D",
  },

  online: {
    backgroundColor: "#EFF6FF",
    color: "#1D4ED8",
  },

  viewBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  viewText: {
    color: "#7C3AED",
    fontSize: 13,
  },
});
