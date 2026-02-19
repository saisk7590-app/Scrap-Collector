import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Recycle } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomInput from "../../components/CustomInput";
import { supabase } from "../../src/lib/supabase";

export default function CollectorLoginScreen() {
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

      const { data: session, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        Alert.alert("Login Failed", authError.message);
        return;
      }

      const userId = session.user.id;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        Alert.alert("Error", profileError.message);
        return;
      }

      if (profile.role !== "collector") {
        Alert.alert("Error", "This account is not a collector");
        return;
      }

      await AsyncStorage.setItem("userToken", userId);
      await AsyncStorage.setItem("userData", JSON.stringify(profile));

      navigation.reset({
        index: 0,
        routes: [{ name: "CollectorDashboard" }],
      });
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Recycle size={60} color="#2563EB" style={styles.logo} />

        <Text style={styles.title}>Collector Login</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

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

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.link}>
          Don’t have an account?{" "}
          <Text
            style={styles.linkPrimary}
            onPress={() => navigation.navigate("SignUp")}
          >
            Register
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E7FF", // Light blue background
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  logo: {
    alignSelf: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 25,
    fontSize: 15,
  },

  button: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#6B7280",
  },

  linkPrimary: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
