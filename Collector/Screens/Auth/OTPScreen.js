import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OTPInput from "../../components/OTPInput";
import CustomButton from "../../components/CustomButton";
import { COLORS, ROUTES, FONTS, SIZES } from "../../constants";

export default function OTPScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { phone } = route.params;

  // ✅ 6-digit OTP (MATCHES BACKEND)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.includes("")) {
      Alert.alert("Error", "Please enter complete OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            otp: otp.join(""),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Invalid OTP");
        setLoading(false);
        return;
      }

      // ✅ Save JWT
      await AsyncStorage.setItem("userToken", data.token);

      // ✅ Reset stack → HOME
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.HOME }],
      });
    } catch (error) {
      Alert.alert("Error", "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        OTP sent to {phone}
      </Text>

      <OTPInput
        otp={otp}
        setOtp={setOtp}
        length={6} // ✅ MUST MATCH
      />

      <CustomButton
        title="Verify"
        onPress={handleVerify}
        variant="primary"
        loading={loading}
      />

      <Text style={styles.resendText}>
        Didn’t receive code?{" "}
        <Text style={styles.resendLink}>Resend</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.spacing,
    justifyContent: "center",
  },
  title: {
    fontSize: FONTS.size.xl,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
    color: COLORS.textPrimary,
  },
  subtitle: {
    textAlign: "center",
    color: COLORS.textSecondary,
    marginVertical: SIZES.spacingMd,
    fontSize: FONTS.size.md,
    fontFamily: FONTS.regular,
  },
  resendText: {
    textAlign: "center",
    marginTop: SIZES.spacingMd,
    color: COLORS.textMuted,
    fontSize: FONTS.size.md,
    fontFamily: FONTS.regular,
  },
  resendLink: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
  },
});
