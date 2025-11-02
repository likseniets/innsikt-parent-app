// app/conversation/[sessionId].tsx
import BackgroundStyle from "@/styles/BackgroundStyle";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View
} from "react-native";

const BASE_URL = "https://innsikt-backend.fly.dev";

type MessageDto = {
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};
type ConversationDetail = {
  sessionId: string;
  scenarioId: number;
  title: string;
  savedAt: string;
  scenarioTitle?: string | null;
  scenarioDescription?: string | null;
  messages: MessageDto[];
};

export default function ConversationDetailScreen() {
  const { sessionId } = useLocalSearchParams<{ sessionId?: string }>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [conv, setConv] = useState<ConversationDetail | null>(null);

  const fetchConversation = useCallback(async () => {
    if (!sessionId) return;
    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/api/conversations/${encodeURIComponent(sessionId)}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as ConversationDetail;
      setConv(data);
    } catch (e) {
      console.log("Conversation fetch error:", e);
      Alert.alert("Feil", "Klarte ikke å hente samtalen.");
      setConv(null);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchConversation();
    setRefreshing(false);
  }, [fetchConversation]);

  const onDelete = useCallback(async () => {
    if (!sessionId) return;
    Alert.alert(
      "Slett samtale",
      "Er du sikker på at du vil slette denne samtalen?",
      [
        { text: "Avbryt", style: "cancel" },
        {
          text: "Slett",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await fetch(
                `${BASE_URL}/api/conversations/${encodeURIComponent(
                  sessionId
                )}`,
                {
                  method: "DELETE",
                }
              );
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              router.back();
            } catch (e) {
              Alert.alert("Feil", "Klarte ikke å slette samtalen.");
            }
          },
        },
      ]
    );
  }, [sessionId]);

  const header = (
    <View style={{ gap: 6, marginBottom: 8 }}>
      <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
        {conv?.title ?? "Samtale"}
      </Text>
      {conv?.scenarioTitle ? (
        <Text style={{ color: "#9CA3AF" }}>Scenario: {conv.scenarioTitle}</Text>
      ) : null}
      <Text style={{ color: "#9CA3AF" }}>
        Lagret: {conv ? new Date(conv.savedAt).toLocaleString() : ""}
      </Text>

      {conv?.scenarioDescription ? (
        <View
          style={{
            backgroundColor: "#0B1220",
            borderColor: "#1f2937",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginTop: 8,
          }}
        >
          <Text style={{ color: "#9CA3AF" }}>{conv.scenarioDescription}</Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <BackgroundStyle>
      <View style={{ paddingTop: 54, paddingHorizontal: 16, gap: 12, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: "#111827",
              borderWidth: 1,
              borderColor: "#1f2937",
            }}
          >
            <Text style={{ color: "white" }}>Tilbake</Text>
          </Pressable>

          <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
            Samtale
          </Text>

          <Pressable
            onPress={onDelete}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: "#111827",
              borderWidth: 1,
              borderColor: "#1f2937",
            }}
          >
            <Text style={{ color: "#EF4444" }}>Slett</Text>
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator />
        ) : !conv ? (
          <Text style={{ color: "white" }}>Fant ikke samtale.</Text>
        ) : (
          <FlatList
            data={conv.messages}
            keyExtractor={(_, i) => String(i)}
            ListHeaderComponent={header}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <View
                style={{
                  alignSelf: item.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor: item.role === "user" ? "#2563EB" : "#111827",
                  padding: 12,
                  borderRadius: 12,
                  marginVertical: 6,
                  maxWidth: "85%",
                  borderWidth: 1,
                  borderColor: "#1f2937",
                }}
              >
                <Text style={{ color: "white" }}>{item.content}</Text>
                <Text style={{ color: "#D1D5DB", marginTop: 4, fontSize: 10 }}>
                  {new Date(item.createdAt).toLocaleTimeString()}
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingVertical: 10 }}
          />
        )}
      </View>
    </BackgroundStyle>
  );
}
