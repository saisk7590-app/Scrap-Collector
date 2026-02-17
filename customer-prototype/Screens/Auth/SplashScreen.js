import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
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
    <TouchableWithoutFeedback onPress={handleTap}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
          <Image
            source={require("../../assets/splashscreen.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <Text style={styles.appName}>Customer App</Text>
        <Text style={styles.subtitle}>Scrap Collection Made Easy</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  appName: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: "#03C75A",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    opacity: 0.9,
  },
});
