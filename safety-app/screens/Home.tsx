import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import Button from "../components/Button";

export const Home = ({ navigation }: any) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.white, COLORS.white]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require("../assets/hero1.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              opacity: 0.3,
              top: 20,
              transform: [
                { translateX: 20 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
          <Image
            source={require("../assets/hero3.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: -20,
              left: 100,
              opacity: 0.3,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-5deg" },
              ],
            }}
          />
          <Image
            source={require("../assets/hero3.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 140,
              opacity: 0.3,
              left: -50,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "15deg" },
              ],
            }}
          />

          <Image
            source={require("../assets/hero2.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 120,
              left: 100,
              opacity: 0.3,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 640,
            width: "100%",
          }}
        >
          <Button
            title="Inform your family"
            color={COLORS.black}
            filled
            onPress={() => {}}
            style={{
              marginTop: 22,
              width: "100%",
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
