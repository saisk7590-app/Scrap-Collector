import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Recycle } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES, ROUTES } from "../../constants";

export default function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 3 }
    ).start();

    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        // Wait for animation (~2s)
        setTimeout(() => {
          // Fade out
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();

          // Navigate based on login state
          navigation.replace(token ? ROUTES.HOME : ROUTES.LOGIN);
        }, 2000);
      } catch (e) {
        navigation.replace(ROUTES.LOGIN);
      }
    };

    checkLogin();
  }, [bounceAnim, fadeAnim, navigation]);

  // Tap to skip splash
  const handleTap = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      navigation.replace(token ? ROUTES.HOME : ROUTES.LOGIN);
    } catch {
      navigation.replace(ROUTES.LOGIN);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={handleTap}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
            <Recycle size={SIZES.logo} strokeWidth={2} color={COLORS.background} />
          </Animated.View>
          <Text style={styles.appName}>Scrap Collector</Text>
          <Text style={styles.subtitle}>Your Eco-Friendly Partner</Text>
          <Text style={styles.quote}>-------</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    marginTop: SIZES.spacingLg,
    fontSize: FONTS.size.xxl,
    fontFamily: FONTS.bold,
    color: COLORS.background,
  },
  subtitle: {
    marginTop: SIZES.spacingSm,
    fontSize: FONTS.size.lg,
    fontFamily: FONTS.medium,
    color: COLORS.background,
    opacity: 0.9,
  },
  quote: {
    marginTop: SIZES.spacingMd,
    fontSize: FONTS.size.md,
    fontFamily: FONTS.regular,
    color: COLORS.background,
    opacity: 0.8,
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: SIZES.spacingLg,
  },
});
