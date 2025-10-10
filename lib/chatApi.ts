import type { ChatApiMessage } from "@/interfaces/types";

// iOS/Web: https://localhost:7143
// Android emulator: bytt til http://10.0.2.2:7143
const BASE_URL = "https://localhost:7143";

export async function sendChat(
  scenarioId: number,
  sessionId: string,
  messages: ChatApiMessage[]
) {
  const payload = { scenarioId, sessionId, messages };
  console.log("Trying to send to api:", JSON.stringify(payload));

  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const txt = await response.text().catch(() => "");
    throw new Error(`HTTP error! status: ${response.status} ${txt}`);
  }

  return response.json() as Promise<any>;
}
