import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.screen}>
        <Text style={{color : 'white'}}>Settings Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  screen: { flex: 1, padding: 16 },
});