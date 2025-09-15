import type { scenario as Scenario } from "@/interfaces/types";
import { AppStyle } from "@/styles/AppStyle";
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

type ChatMessage = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
};

export default function ChatBotScreen() {
  const [scenario, setScenario] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const params = useLocalSearchParams<Partial<Scenario>>();
  const insets = useSafeAreaInsets();

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
    <KeyboardAvoidingView
      style={AppStyle.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? insets.bottom : 0}
    >
      <View style={AppStyle.header}>
        <Button title="Tilbake" onPress={() => router.back()} />
        <Text style={AppStyle.title}>Chatbot</Text>
        <Button title="Fullfør samtale" onPress={() => {}} />
      </View>
      {params?.title ? (
        <Text style={AppStyle.subtitle}>{String(params.title)}</Text>
      ) : null}

      <View style={AppStyle.chatContainer}>
        {scenario ? (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  AppStyle.message,
                  item.role === "user"
                    ? AppStyle.userMessage
                    : item.role === "assistant"
                    ? AppStyle.assistantMessage
                    : AppStyle.systemMessage,
                ]}
              >
                <Text style={AppStyle.messageText}>{item.content}</Text>
              </View>
            )}
            contentContainerStyle={{
              paddingVertical: 12,
              paddingHorizontal: 16,
            }}
          />
        ) : (
          <View style={AppStyle.centered}>
            <Text>Ingen scenario valgt.</Text>
          </View>
        )}
      </View>

      <View
        style={[
          AppStyle.inputRow,
          { paddingBottom: Math.max(insets.bottom, 8) },
        ]}
      >
        <TextInput
          style={AppStyle.input}
          value={input}
          onChangeText={setInput}
          placeholder="Skriv en melding..."
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}
