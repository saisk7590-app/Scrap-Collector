import React, { useState } from "react";
import { ScrollView, View, Text, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";

import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import SellScrapCategoryCard from "../../components/SellScrapCategoryCard";

import { COLORS } from "../../constants/colors";
import { SCRAP_CATEGORIES, SCRAP_DATA, SCRAP_CONFIG } from "../../constants/scrap";

export default function SellScrapScreen({ navigation, route }) {
  const selectedCategory = route?.params?.category || null;
  const [expanded, setExpanded] = useState(selectedCategory);

  const [items, setItems] = useState(() => {
    const obj = {};
    Object.values(SCRAP_DATA).flat().forEach((i) => {
      obj[i] = { selected: false, quantity: 0, weight: "" };
    });
    return obj;
  });

  const toggleCategory = (cat) => setExpanded(expanded === cat ? null : cat);
  const toggleItem = (name) =>
    setItems({ ...items, [name]: { ...items[name], selected: !items[name].selected } });

  const updateQty = (name, delta) => {
    const qty = Math.max(0, items[name].quantity + delta);
    setItems({ ...items, [name]: { ...items[name], quantity: qty, selected: qty > 0 } });
  };

  const updateWeight = (name, value) => {
    if (value === "") {
      setItems({ ...items, [name]: { ...items[name], weight: "", selected: false } });
      return;
    }
    const regex = /^\d*\.?\d{0,2}$/;
    if (!regex.test(value)) return;
    setItems({ ...items, [name]: { ...items[name], weight: value, selected: parseFloat(value) > 0 } });
  };

  const handleSubmit = () => {
    const selectedItems = Object.keys(items)
      .filter((k) => items[k].selected)
      .map((k) => ({
        name: k,
        quantity: items[k].quantity,
        weight: parseFloat(items[k].weight) || 0,
      }));

    if (selectedItems.length === 0) {
      Alert.alert("Error", "Please select at least one item");
      return;
    }

    navigation.navigate("PickupSummary", { items: selectedItems });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* HEADER OUTSIDE SCROLLVIEW */}
      <SafeAreaView style={{ backgroundColor: COLORS.primary }}>
        <Header
          variant="main"        // rectangle type
          title="Sell Scrap"
          showBack
        />
      </SafeAreaView>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {/* Category Cards */}
        {SCRAP_CATEGORIES.map((cat) => (
          <SellScrapCategoryCard
            key={cat}
            category={cat}
            items={SCRAP_DATA[cat]}
            dataObj={items}
            config={SCRAP_CONFIG}
            expanded={expanded}
            toggleCategory={toggleCategory}
            toggleItem={toggleItem}
            updateQty={updateQty}
            updateWeight={updateWeight}
          />
        ))}

        {/* Note */}
        <View
          style={{
            backgroundColor: COLORS.noteBg,
            borderWidth: 1,
            borderColor: COLORS.noteBorder,
            borderRadius: 12,
            padding: 14,
            marginTop: 16,
          }}
        >
          <Text style={{ color: COLORS.noteText, fontSize: 13, lineHeight: 18 }}>
            <Text style={{ fontWeight: "600" }}>Note:</Text> Minimum pickup quantity is 15 kg. Requests below this may charge service fee ₹100
          </Text>
        </View>

        {/* Sell Scrap Button */}
        <View style={{ marginTop: 24, marginBottom: 40 }}>
          <CustomButton title="Sell Scrap" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
}
