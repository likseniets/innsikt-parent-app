import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";

// enkel lokal base-url (endre hvis du bruker annen port / http)
const API = "http://localhost:5202";

const isWeb = Platform.OS === "web";

type HistoryItem = {
  sessionId: string;
  scenarioId: number;
  title: string;
  savedAt: string;
  scenarioDescription?: string | null;
  lastMessagePreview?: string | null;
  turnCount?: number | null;
};

export default function HistoryScreen() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/conversations?page=1&pageSize=50`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: HistoryItem[] = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Historikk fetch error:", err);
      Alert.alert("Feil", "Kunne ikke hente historikk.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const openConversation = (sessionId: string) => {
    router.push(`/conversation/${encodeURIComponent(sessionId)}`);
  };

  const confirmDelete = (sessionId: string) => {
    if (isWeb) {
      // RN Alert med knapper støttes ikke i web → bruk browser-confirm
      const ok = window.confirm(
        "Er du sikker på at du vil slette denne samtalen? Dette kan ikke angres."
      );
      if (ok) {
        deleteConversation(sessionId);
      }
      return;
    }

    // Native (iOS/Android): bruk Alert med knapper
    Alert.alert(
      "Slett samtale",
      "Er du sikker på at du vil slette denne samtalen? Dette kan ikke angres.",
      [
        { text: "Avbryt", style: "cancel" },
        {
          text: "Slett",
          style: "destructive",
          onPress: () => deleteConversation(sessionId),
        },
      ]
    );
  };

  const deleteConversation = async (sessionId: string) => {
    const url = `${API}/api/conversations/${encodeURIComponent(sessionId)}`;

    // Optimistisk oppdatering: fjern elementet lokalt med én gang
    const prev = items;
    setItems((xs) => xs.filter((x) => x.sessionId !== sessionId));

    try {
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${text}`);
      }
      // Valgfritt: hent på nytt for å være i sync med server
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      if (isWeb) {
        window.alert("Feil: Klarte ikke slette samtalen.");
      } else {
        Alert.alert("Feil", "Klarte ikke slette samtalen.");
      }
      // Rull tilbake liste om noe feilet
      setItems(prev);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {items.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 24 }}>
          <Text style={{ color: "#cbd5e1", fontSize: 16 }}>
            Ingen historikk enda.
          </Text>
          <Text style={{ color: "#94a3b8", fontSize: 14, marginTop: 6 }}>
            Når du chatter, dukker samtalene opp her.
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(x) => x.sessionId}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View
              style={{
                width: "100%",
                backgroundColor: "#111827",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#1f2937",
                padding: 14,
              }}
            >
              <Pressable onPress={() => openConversation(item.sessionId)}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>

                {item.scenarioDescription ? (
                  <Text
                    numberOfLines={3}
                    style={{
                      color: "#e5e7eb",
                      marginTop: 8,
                      textAlign: "center",
                      lineHeight: 20,
                    }}
                  >
                    {item.scenarioDescription}
                  </Text>
                ) : item.lastMessagePreview ? (
                  <Text
                    numberOfLines={2}
                    style={{
                      color: "#cbd5e1",
                      marginTop: 8,
                      textAlign: "center",
                    }}
                  >
                    {item.lastMessagePreview}
                  </Text>
                ) : null}
              </Pressable>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
              >
                <Text style={{ color: "#9ca3af", fontSize: 12 }}>
                  {new Date(item.savedAt).toLocaleString()}
                </Text>
                <Pressable onPress={() => confirmDelete(item.sessionId)}>
                  <Text style={{ color: "#f87171", fontWeight: "600" }}>
                    Slett
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
