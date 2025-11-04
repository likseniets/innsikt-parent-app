import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

type ScreenWrapperProps = {
  children: ReactNode;
};

export default function BackgroundStyle({ children }: ScreenWrapperProps) {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.screen}>
        <LinearGradient
          colors={["rgba(120,180,255,0.35)", "rgba(255,255,255,0)"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.glowTop}
          pointerEvents="none"
        />
        <LinearGradient
          colors={["rgba(160,200,255,0.25)", "rgba(255,255,255,0)"]}
          start={{ x: 0.5, y: 0.2 }}
          end={{ x: 0.5, y: 1 }}
          style={s.glowCenter}
          pointerEvents="none"
        />

        <View style={s.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  screen: { flex: 1, padding: 16, position: "relative" },

  glowTop: { ...StyleSheet.absoluteFillObject, zIndex: 0 },
  glowCenter: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    transform: [{ scale: 1.2 }],
  },

  content: { flex: 1, zIndex: 1 },
});
