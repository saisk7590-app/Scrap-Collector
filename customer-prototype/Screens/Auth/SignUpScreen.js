import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Recycle } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { COLORS, ROUTES, FONTS, SIZES } from "../../constants";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !mobile || !password) {
      alert("Please fill all fields");
      return;
    }

    if (mobile.length < 10) {
      alert("Enter a valid mobile number");
      return;
    }

    if (mobile === password) {
      alert("Password cannot match mobile number");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending register request...");

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            phone: mobile,
            password,
          }),
        }
      );

      const data = await response.json();
      console.log("Register response:", data);

      if (!response.ok) {
        alert(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS → OTP SCREEN
      navigation.navigate(ROUTES.OTP, { phone: mobile });
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Recycle size={48} color={COLORS.primary} style={styles.logo} />

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Join us to start collecting scrap rewards
      </Text>

      <CustomInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

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
        title="Sign Up"
        onPress={handleSignUp}
        variant="primary"
        loading={loading}
      />

      <Text style={styles.link}>
        Already have an account?{" "}
        <Text
          style={styles.linkPrimary}
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
        >
          Login
        </Text>
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
  logo: {
    alignSelf: "center",
    marginBottom: SIZES.spacing,
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
    marginBottom: SIZES.spacing,
    fontSize: FONTS.size.md,
    fontFamily: FONTS.regular,
  },
  link: {
    textAlign: "center",
    marginTop: SIZES.spacing,
    color: COLORS.textSecondary,
    fontSize: FONTS.size.md,
  },
  linkPrimary: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
  },
});
