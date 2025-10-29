export interface scenario {
  id: number;
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
  messages: ChatApiMessage[];
};

// Svaret fra Chat API’et
export type ChatApiResponse = {
  message: ChatApiMessage;
  conversationId?: string;
  error?: string;
};

// UI-spesifikk meldingstype (inkluderer unikt id-felt for liste-rendering)
export type ChatUiMessage = ChatApiMessage & { id: string };

export type ChatCompletion = {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage: ChatCompletionUsage;
  service_tier: string;
  system_fingerprint: string | null;
}

interface ChatCompletionChoice {
  index: number;
  message: ChatCompletionMessage;
  logprobs: any | null;
  finish_reason: string;
}

interface ChatCompletionMessage {
  role: "assistant" | "user" | "system";
  content: string;
  refusal: string | null;
  annotations: any[];
}

interface ChatCompletionUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: TokenDetails;
  completion_tokens_details: CompletionTokenDetails;
}

interface TokenDetails {
  cached_tokens: number;
  audio_tokens: number;
}

interface CompletionTokenDetails {
  reasoning_tokens: number;
  audio_tokens: number;
  accepted_prediction_tokens: number;
  rejected_prediction_tokens: number;
}