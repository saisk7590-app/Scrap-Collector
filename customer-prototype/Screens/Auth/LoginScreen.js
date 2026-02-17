import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { COLORS, ROUTES, FONTS, SIZES } from "../../constants";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Dummy login: any data works
    setTimeout(async () => {
      await AsyncStorage.setItem("userToken", "dummy-token");
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.HOME }],
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/applogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Customer Prototype</Text>
      <Text style={styles.subtitle}>Dummy login for testing</Text>

      <CustomInput
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />

      <CustomInput
        placeholder="Password"
        secure
        value={password}
        onChangeText={setPassword}
      />

      <CustomButton
        title="Login (Any input works)"
        onPress={handleLogin}
        variant="primary"
        loading={loading}
      />

      <Text style={styles.link}>
        Don’t have an account?{" "}
        <Text
          style={styles.linkPrimary}
          onPress={() => navigation.navigate(ROUTES.SIGNUP)}
        >
          Sign Up
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.spacing,
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: SIZES.spacingLg,
  },
  title: {
    fontSize: FONTS.size.xl,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
    color: COLORS.textPrimary,
  },
  subtitle: {
    textAlign: "center",
    color: COLORS.textMuted,
    marginBottom: SIZES.spacingLg,
    fontSize: FONTS.size.md,
    fontFamily: FONTS.regular,
  },
  link: {
    textAlign: "center",
    marginTop: SIZES.spacingMd,
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
    fontFamily: FONTS.regular,
  },
  linkPrimary: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
  },
});
