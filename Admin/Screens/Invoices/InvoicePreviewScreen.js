import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { printInvoice } from "../../utils/invoicePrint";

export default function InvoicePreviewScreen() {
  const invoice = {
    invoiceNo: "SC-INV-1023",
    date: "12 Jan 2026",
    collectorName: "Ramesh (Scrap Collector)",
    collectorId: "COL-102",
    customerName: "Sai Kiran",
    customerPhone: "99999 99999",
    pickupAddress: "Madhapur, Hyderabad",
    paymentMode: "Cash",
    paymentStatus: "Paid",
    items: [
      { name: "Paper", weight: 10, rate: 12 },
      { name: "Plastic", weight: 5, rate: 15 },
      { name: "Iron", weight: 3, rate: 28 },
    ],
  };

  const itemsForPrint = invoice.items.map((i) => ({
    category: i.name,
    weight: i.weight,
    rate: i.rate,
    total: i.weight * i.rate,
  }));

  const totalAmount = itemsForPrint.reduce((s, i) => s + i.total, 0);
  const totalWeight = itemsForPrint.reduce((s, i) => s + i.weight, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Invoice Preview</Text>

        {/* Invoice Card */}
        <View style={styles.card}>
          <Row label="Invoice No" value={invoice.invoiceNo} />
          <Row label="Date" value={invoice.date} />
          <Row label="Collector" value={invoice.collectorName} />
          <Row label="Customer" value={invoice.customerName} />
          <Row label="Pickup Address" value={invoice.pickupAddress} />

          {/* Items */}
          <View style={styles.tableHeader}>
            <Text style={styles.th}>Item</Text>
            <Text style={styles.th}>Weight</Text>
            <Text style={styles.th}>Rate</Text>
            <Text style={styles.th}>Amount</Text>
          </View>

          {itemsForPrint.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.td}>{item.category}</Text>
              <Text style={styles.td}>{item.weight} kg</Text>
              <Text style={styles.td}>₹{item.rate}</Text>
              <Text style={styles.td}>₹{item.total}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹ {totalAmount}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.printBtn}
            onPress={() =>
              printInvoice({
                invoiceNumber: invoice.invoiceNo,
                invoiceDate: invoice.date,
                customerName: invoice.customerName,
                customerPhone: invoice.customerPhone,
                customerAddress: invoice.pickupAddress,
                collectorName: invoice.collectorName,
                collectorId: invoice.collectorId,
                items: itemsForPrint,
                totalAmount,
                totalWeight,
                paymentMode: invoice.paymentMode,
                paymentStatus: invoice.paymentStatus,
              })
            }
          >
            <Text style={styles.btnText}>Print Invoice</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareBtn}
            onPress={() =>
              printInvoice({
                invoiceNumber: invoice.invoiceNo,
                invoiceDate: invoice.date,
                customerName: invoice.customerName,
                customerPhone: invoice.customerPhone,
                customerAddress: invoice.pickupAddress,
                collectorName: invoice.collectorName,
                collectorId: invoice.collectorId,
                items: itemsForPrint,
                totalAmount,
                totalWeight,
                paymentMode: invoice.paymentMode,
                paymentStatus: invoice.paymentStatus,
              })
            }
          >
            <Text style={styles.btnText}>Share PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Row ---------- */
const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F2F4F7" },
  container: { padding: 16 },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: { fontSize: 12, color: "#6B7280" },
  value: { fontSize: 12, fontWeight: "500", color: "#111827" },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 14,
    paddingBottom: 6,
  },
  th: { flex: 1, fontSize: 12, fontWeight: "600" },

  tableRow: { flexDirection: "row", marginVertical: 6 },
  td: { flex: 1, fontSize: 12 },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  totalLabel: { fontSize: 14, fontWeight: "700" },
  totalValue: { fontSize: 14, fontWeight: "700", color: "#16A34A" },

  actions: { flexDirection: "row", marginTop: 16 },
  printBtn: {
    flex: 1,
    backgroundColor: "#16A34A",
    padding: 12,
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
  },
  shareBtn: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#FFFFFF", fontWeight: "600" },
});
