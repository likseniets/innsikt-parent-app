import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type RowProps = { title: string; left?: React.ReactNode; onPress?: () => void };

const Row = ({ title, left, onPress }: RowProps) => (
  <Pressable onPress={onPress} style={({ pressed }) => [s.row, pressed && { opacity: 0.7 }]}>
    {left}
    <Text style={s.rowText}>{title}</Text>
    <Ionicons name="chevron-forward" size={18} color="#111" />
  </Pressable>
);

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

        <View style={s.panel}>
          <Row title="My account" left={<View style={s.avatar} />} />
          <View style={s.divider} />
          <Row
            title="Appearance"
            left={
              <View style={s.iconBubble}>
                <Ionicons name="color-palette-outline" size={18} color="#111" />
              </View>
            }
          />
          <View style={s.divider} />
          <Row
            title="Log out"
            left={
              <View style={s.iconBubble}>
                <Ionicons name="log-out-outline" size={18} color="#111" />
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  screen: { flex: 1, padding: 16 },

  glow: { ...StyleSheet.absoluteFillObject },

  header: {
    height: 80,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 28, fontWeight: "700", letterSpacing: 2, color: "#0b0b0b" },

  panel: {
    borderRadius: 20,
    padding: 12,
    backgroundColor: "#eef2f5", 
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },

  row: { minHeight: 56, paddingHorizontal: 8, flexDirection: "row", alignItems: "center" },
  rowText: { flex: 1, fontSize: 18, color: "#0b0b0b" },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: "rgba(0,0,0,0.12)", marginVertical: 6 },

  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#000", marginRight: 12 },
  iconBubble: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: "center", justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.06)", marginRight: 12,
  },
});
