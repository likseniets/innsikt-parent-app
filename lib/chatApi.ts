import type { ChatApiMessage } from "@/interfaces/types";
import { Platform } from "react-native";

/**
 * BASE_URL for HTTPS 7143:
 * - Expo Web / iOS Simulator på samme maskin: https://localhost:7143
 * - Android Emulator: https://10.0.2.2:7143  (⚠️ emulatoren stoler normalt IKKE på dev-sertifikat)
 *   -> test helst i web/iOS-simulator når du bruker HTTPS dev-sertifikat.
 */
const isAndroid = Platform.OS === "android";
const isWeb = Platform.OS === "web";

export const BASE_URL = isWeb
  ? "https://localhost:7143"
  : isAndroid
  ? "https://10.0.2.2:7143"
  : "https://localhost:7143";

export async function sendChat(
  scenarioId: number,
  sessionId: string,
  messages: ChatApiMessage[]
) {
  const payload = { scenarioId, sessionId, messages };
  console.log("BASE_URL =", BASE_URL, "POST", `${BASE_URL}/api/chat`);
  console.log("Trying to send to api:", JSON.stringify(payload));

  console.log("REQUEST URL =", `${BASE_URL}/api/chat`);
  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const txt = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status}: ${txt}`);
  }

  return (await response.json()) as any;
}
