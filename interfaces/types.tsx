export interface scenario {
  title: string;
  description: string;
}

// En enkelt chat‑melding utvekslet mellom klient og API
export type ChatApiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

// Kroppen som sendes til Chat API’et ved forespørsel
export type ChatApiRequest = {
  scenario: { title: string; description: string };
  messages: ChatApiMessage[];
  conversationId?: string;
};

// Svaret fra Chat API’et
export type ChatApiResponse = {
  message: ChatApiMessage;
  conversationId?: string;
  error?: string;
};

// UI-spesifikk meldingstype (inkluderer unikt id-felt for liste-rendering)
export type ChatUiMessage = ChatApiMessage & { id: string };
