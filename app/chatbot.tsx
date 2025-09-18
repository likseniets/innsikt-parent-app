// Scenario‑typen (tittel og beskrivelse) som kommer fra HomeScreen
import type { ChatUiMessage, scenario as Scenario } from "@/interfaces/types";
// Bakgrunnskomponent som gir gradient og SafeArea
import BackgroundStyle from "@/styles/BackgroundStyle";
import { ChatBotStyle } from "@/styles/ChatBotStyle";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatBotScreen() {
  // Scenario‑tekst satt fra navigasjonsparametre
  const [scenario, setScenario] = useState<string | null>(null);
  // Meldingsliste og inputtekst
  const [messages, setMessages] = useState<ChatUiMessage[]>([]);
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
        style={ChatBotStyle.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.bottom : 0}
      >
        {/* Toppfelt med tilbakeknapp og tittel */}
        <View style={ChatBotStyle.header}>
          <Button title="Tilbake" onPress={() => router.back()} />
          <Text style={ChatBotStyle.title}>Chatbot</Text>
          <Button
            title="Fullfør samtale"
            onPress={() =>
              router.push({
                pathname: '/feedback',
                params: { title: params?.title ? String(params.title) : 'Scenario' },
              })
            }
          />
        </View>
        {params?.title ? (
          <Text style={ChatBotStyle.subtitle}>{String(params.title)}</Text>
        ) : null}

        {/* Meldingsliste eller tom‑state hvis scenario mangler */}
        <View style={ChatBotStyle.chatContainer}>
          {scenario ? (
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    ChatBotStyle.message,
                    item.role === "user"
                      ? ChatBotStyle.userMessage
                      : item.role === "assistant"
                      ? ChatBotStyle.assistantMessage
                      : ChatBotStyle.systemMessage,
                  ]}
                >
                  <Text style={ChatBotStyle.messageText}>{item.content}</Text>
                </View>
              )}
              contentContainerStyle={{
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
            />
          ) : (
            <View style={ChatBotStyle.centered}>
              <Text style={ChatBotStyle.emptyText}>Ingen scenario valgt.</Text>
            </View>
          )}
        </View>

        {/* Tekstfelt + sendknapp */}
        <View
          style={[
            ChatBotStyle.inputRow,
            { paddingBottom: Math.max(insets.bottom, 8) },
          ]}
        >
          <TextInput
            style={ChatBotStyle.input}
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
