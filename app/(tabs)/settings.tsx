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

        <LinearGradient
          colors={["#e8edf1", "#a9d0ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.header}
        >
           <Text style={s.headerTitle}>SETTINGS</Text>
        </LinearGradient>
        
        <Text style={{color : 'white'}}>Settings Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  glow: {...StyleSheet.absoluteFillObject },
  safe: { flex: 1, backgroundColor: "#000" },
  screen: { flex: 1, padding: 16 },
  header: {
  height: 80,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
},
headerTitle: {
  fontSize: 28,
  fontWeight: "700",
  letterSpacing: 2,
  color: "#0b0b0b",
},
});