import { postFeedback } from "@/lib/chatApi";
import BackgroundStyle from "@/styles/BackgroundStyle";
import styles from "@/styles/FeedbackScreenStyle";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function FeedbackScreen({
  title,
  sessionId,
  onDone,
}: {
  title: string;
  sessionId: string;
  onDone: () => void;
}) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!sessionId) {
        Alert.alert(
          "Mangler sessionId",
          "Kunne ikke finne samtalen som skal evalueres."
        );
        setLoading(false);
        return;
      }
      try {
        const res = await postFeedback(sessionId);
        if (!cancelled) setResult(res.content || "");
      } catch (e: any) {
        if (!cancelled)
          Alert.alert(
            "Kunne ikke hente tilbakemelding",
            e?.message ?? "Ukjent feil"
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const baseText = { color: "#ffffff" as const };

  return (
    <BackgroundStyle>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { gap: 12, paddingBottom: 24 },
        ]}
      >
        <Text style={[styles.title, baseText]}>Feedback for {title}</Text>

        {loading && (
          <View style={{ marginTop: 12, alignItems: "center" }}>
            <ActivityIndicator />
            <Text style={[{ marginTop: 8 }, baseText]}>
              Genererer tilbakemelding…
            </Text>
          </View>
        )}

        {!loading && !!result && (
          <View style={{ width: "100%", marginTop: 8 }}>
            {/* Rå tekst fra backend – nå hvit */}
            <Text style={baseText}>{result}</Text>
          </View>
        )}

        <View style={{ marginTop: 8 }}>
          <Button title="Ferdig" onPress={onDone} />
        </View>
      </ScrollView>
    </BackgroundStyle>
  );
}
