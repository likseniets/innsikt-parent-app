import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.screen}>
        <LinearGradient
          colors={["rgba(120,180,255,0.35)", "rgba(255,255,255,0)"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.glow}
          pointerEvents="none"
/>

        <Text style={{color : 'white'}}>Settings Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  glow: {...StyleSheet.absoluteFillObject },
  safe: { flex: 1, backgroundColor: "#000" },
  screen: { flex: 1, padding: 16 },
});