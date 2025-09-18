// Scenario‑typen (tittel og beskrivelse) som kommer fra HomeScreen
import type { scenario as Scenario } from "@/interfaces/types";
// Bakgrunnskomponent som gir gradient og SafeArea
import BackgroundStyle from "@/styles/BackgroundStyle";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Enkel meldingstype brukt i chatten
type ChatMessage = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
};

export default function ChatBotScreen() {
  // Scenario‑tekst satt fra navigasjonsparametre
  const [scenario, setScenario] = useState<string | null>(null);
  // Meldingsliste og inputtekst
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  // Parametre som sendes fra HomeScreen (tittel/beskrivelse)
  const params = useLocalSearchParams<Partial<Scenario>>();
  // Sikker topp/bunn‑innrykk for tastaturhåndtering
  const insets = useSafeAreaInsets();

  // Når vi får inn scenarioparametre, legg til som system‑melding øverst
  useEffect(() => {
    if ((params?.title || params?.description) && !scenario) {
      const incoming = `\n${params.title ?? "Scenario"}\n\n${
        params.description ?? ""
      }`;
      setScenario(incoming);
      setMessages([
        {
          id: "system-0",
          role: "system",
          content: incoming.trim(),
        },
      ]);
    }
  }, [params, scenario]);

  // Legg til brukerens melding i lista (her kan API‑kall kobles på)
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", content: trimmed },
    ]);
    setInput("");
    // API kall
  };

  return (
    <BackgroundStyle>
      {/* Løfter innholdet når tastaturet vises (spesielt iOS) */}
      <KeyboardAvoidingView
        style={s.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.bottom : 0}
      >
        {/* Toppfelt med tilbakeknapp og tittel */}
        <View style={s.header}>
          <Button title="Tilbake" onPress={() => router.back()} />
          <Text style={s.title}>Chatbot</Text>
          <Button title="Fullfør samtale" onPress={() => {}} />
        </View>
        {params?.title ? (
          <Text style={s.subtitle}>{String(params.title)}</Text>
        ) : null}

        {/* Meldingsliste eller tom‑state hvis scenario mangler */}
        <View style={s.chatContainer}>
          {scenario ? (
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    s.message,
                    item.role === "user"
                      ? s.userMessage
                      : item.role === "assistant"
                      ? s.assistantMessage
                      : s.systemMessage,
                  ]}
                >
                  <Text style={s.messageText}>{item.content}</Text>
                </View>
              )}
              contentContainerStyle={{
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
            />
          ) : (
            <View style={s.centered}>
              <Text style={s.emptyText}>Ingen scenario valgt.</Text>
            </View>
          )}
        </View>

        {/* Tekstfelt + sendknapp */}
        <View
          style={[s.inputRow, { paddingBottom: Math.max(insets.bottom, 8) }]}
        >
          <TextInput
            style={s.input}
            value={input}
            onChangeText={setInput}
            placeholder="Skriv en melding..."
            placeholderTextColor="#9CA3AF"
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </BackgroundStyle>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  title: { color: "#E5E7EB", fontSize: 20, fontWeight: "700" },
  subtitle: { color: "#9CA3AF", marginBottom: 8 },

  chatContainer: { flex: 1 },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    maxWidth: "85%",
  },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#2563EB" },
  assistantMessage: { alignSelf: "flex-start", backgroundColor: "#374151" },
  systemMessage: { alignSelf: "center", backgroundColor: "#111827" },
  messageText: { color: "#F9FAFB" },

  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { color: "#E5E7EB" },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1f3030",
    backgroundColor: "#0b2020",
    color: "#e5e7eb",
    padding: 12,
    borderRadius: 10,
  },
});
