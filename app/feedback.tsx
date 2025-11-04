import FeedbackScreen from "@/screens/FeedbackScreen";
import { router, useLocalSearchParams } from "expo-router";

export default function FeedbackRoute() {
  const params = useLocalSearchParams<{ title?: string; sessionId?: string }>();
  const title = params?.title ? String(params.title) : "Tilbakemelding";
  const sessionId = params?.sessionId ? String(params.sessionId) : "";

  return (
    <FeedbackScreen
      title={title}
      sessionId={sessionId}
      onDone={() => router.replace("/(tabs)")}
    />
  );
}
