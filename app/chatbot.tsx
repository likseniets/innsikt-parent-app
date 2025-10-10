// Scenario-typen (tittel og beskrivelse) som kommer fra HomeScreen
import type { ChatApiMessage, ChatCompletion } from "@/interfaces/types";
import { sendChat } from "@/lib/chatApi";
// Bakgrunnskomponent som gir gradient og SafeArea
import BackgroundStyle from "@/styles/BackgroundStyle";
import { ChatBotStyle } from "@/styles/ChatBotStyle";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Genererer en unik sessionId hver gang skjermen åpnes
function newSessionId() {
  return (typeof crypto !== "undefined" && "randomUUID" in crypto)
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function ChatBotScreen() {
  // Scenario-tekst (kun for visning i UI)
  const [scenario, setScenario] = useState<string | null>(null);
  // Meldingsliste og input
  const [messages, setMessages] = useState<ChatApiMessage[]>([]);
  const [input, setInput] = useState("");

  // Parametre fra HomeScreen
  const { scenarioId, title, description } = useLocalSearchParams<{
    scenarioId?: string;
    title?: string;
    description?: string;
  }>();

  // 🔑 Én sessionId per gang skjermen åpnes
  const sessionId = useMemo(() => newSessionId(), []);

  const insets = useSafeAreaInsets();

  // Vis tittel/beskrivelse i UI (ikke sendes til API)
  useEffect(() => {
    if ((title || description) && !scenario) {
      const incoming = `\n${title ?? "Scenario"}\n\n${description ?? ""}`;
      setScenario(incoming);
    }
  }, [title, description, scenario]);

  // Send melding til backend – serveren injiserer AiPrompt vha. scenarioId
  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (!scenarioId) {
      Alert.alert("Mangler scenario", "Fant ikke scenarioId i navigasjonen.");
      return;
    }

    const tempMessages: ChatApiMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];

    try {
      setInput("");
      // 👇 Viktig: send med sessionId
      const res: ChatCompletion = await sendChat(
        Number(scenarioId),
        sessionId,
        tempMessages
      );

      // OpenAI-format støttes: plukk ut svaret robust
      const assistantText =
        (res as any)?.choices?.[0]?.message?.content ??
        (res as any)?.content ??
        "(tomt svar)";

      setMessages([...tempMessages, { role: "assistant", content: assistantText }]);
      console.log("Final res", res);
    } catch (error) {
      console.log(error);
      Alert.alert("Feil", "Klarte ikke å hente svar fra AI-tjenesten.");
    }
  };

  return (
    <BackgroundStyle>
      <KeyboardAvoidingView
        style={ChatBotStyle.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.bottom : 0}
      >
        {/* Header */}
        <View style={ChatBotStyle.header}>
          <Button title="Tilbake" onPress={() => router.back()} />
          <Text style={ChatBotStyle.title}>Chatbot</Text>
          <Button
            title="Fullfør samtale"
            onPress={() =>
              router.push({
                pathname: "/feedback",
                params: { title: title ? String(title) : "Scenario" },
              })
            }
          />
        </View>

        {title ? <Text style={ChatBotStyle.subtitle}>{String(title)}</Text> : null}

        {/* Meldingsliste */}
        <View style={ChatBotStyle.chatContainer}>
          {scenario ? (
            <FlatList
              data={messages}
              keyExtractor={(_, idx) => String(idx)}
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

        {/* Input + send */}
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
