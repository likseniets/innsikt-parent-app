import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ChatBotScreen() {
  const [scenario, setScenario] = useState<string | null>(null);

  const handleLoadScenario = () => {
    // Hardkodet "fake scenario"
    const fakeScenario = `
    Velkommen til chatbot!
    Dette er et scenario fra frontenden.
    Her kan du legge til test-meldinger, prompts eller spørsmål.
    `;
    setScenario(fakeScenario);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot 👋</Text>
      <Button title="Last inn fake scenario" onPress={handleLoadScenario} />

      {scenario && (
        <View style={styles.scenarioBox}>
          <Text style={styles.scenarioText}>{scenario}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  scenarioBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    width: "90%",
  },
  scenarioText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
  },
});
