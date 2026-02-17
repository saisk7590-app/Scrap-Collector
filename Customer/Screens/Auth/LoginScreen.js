import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Recycle } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { COLORS, ROUTES, FONTS, SIZES } from "../../constants";
import { supabase } from "../../src/lib/supabase";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobile || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const email = `${mobile}@scrapcollector.in`;

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      await AsyncStorage.setItem("userToken", data.user.id);

      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.HOME }],
      });

    } catch (err) {
      Alert.alert("Error", "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Recycle size={SIZES.logo} color={COLORS.primary} />

        <Text style={styles.title}>Welcome Back</Text>

        <CustomInput
          placeholder="Mobile Number"
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
          title="Login"
          onPress={handleLogin}
          loading={loading}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate(ROUTES.SIGNUP)}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.spacing,
    justifyContent: "center",
  },
  title: {
    fontSize: FONTS.size.xl,
    textAlign: "center",
    marginBottom: SIZES.spacing,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.spacing,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
  },
  link: {
    color: COLORS.primary,
    fontSize: FONTS.size.md,
    fontWeight: "bold",
  },
});
