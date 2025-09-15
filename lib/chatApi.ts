export type ChatApiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatApiRequest = {
  scenario: { title: string; description: string };
  messages: ChatApiMessage[];
  conversationId?: string;
};

export type ChatApiResponse = {
  message: ChatApiMessage;
  conversationId?: string;
  error?: string;
};

const API_BASE = process.env.EXPO_PUBLIC_CHAT_API_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_CHAT_API_KEY;

export async function sendChat(
  body: ChatApiRequest,
  opts?: { signal?: AbortSignal }
): Promise<ChatApiResponse> {
  if (!API_BASE) throw new Error("Mangler EXPO_PUBLIC_CHAT_API_BASE_URL");

  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
    },
    body: JSON.stringify(body),
    signal: opts?.signal,
  });

  const json = (await res
    .json()
    .catch(() => ({}))) as Partial<ChatApiResponse> & { message?: string };

  if (!res.ok) {
    const msg = json?.error || json?.message || `Chat API feilet (${res.status})`;
    throw new Error(msg);
  }

  if (!json || !json.message) {
    throw new Error("Ugyldig svar fra Chat API");
  }

  return json as ChatApiResponse;
}

