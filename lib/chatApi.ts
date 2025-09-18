/**
 * En enkelt chat‑melding som klienten og API’et utveksler.
 * role: Hvem som «snakker» (system, bruker eller assistent)
 * content: Selve tekstinnholdet
 */
export type ChatApiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/**
 * Kroppen vi sender til Chat API’et.
 * scenario: Kontekst som beskriver samtalen (tittel + beskrivelse)
 * messages: Historikken så langt (inkl. systemmelding, bruker/assistent)
 * conversationId: Valgfri ID for å fortsette en eksisterende samtale
 */
export type ChatApiRequest = {
  scenario: { title: string; description: string };
  messages: ChatApiMessage[];
  conversationId?: string;
};

/**
 * Svaret fra Chat API’et.
 * message: Neste genererte melding fra assistenten
 * conversationId: ID for videre oppfølging i samme samtale
 * error: Eventuell feilmelding fra server
 */
export type ChatApiResponse = {
  message: ChatApiMessage;
  conversationId?: string;
  error?: string;
};

// Basen til API’et og API‑nøkkel hentes fra Expo sine public env‑variabler
// Disse må settes i utviklingsmiljø/CI for at kall skal fungere.
const API_BASE = process.env.EXPO_PUBLIC_CHAT_API_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_CHAT_API_KEY;

/**
 * Kaller Chat API’et med scenario + meldingshistorikk og returnerer assistentens svar.
 * Kaster Error ved nettverksfeil/ugyldig svar for enkel håndtering i UI.
 */
export async function sendChat(
  body: ChatApiRequest,
  opts?: { signal?: AbortSignal }
): Promise<ChatApiResponse> {
  // Sjekk at base‑URL er konfigurert
  if (!API_BASE) throw new Error("Mangler EXPO_PUBLIC_CHAT_API_BASE_URL");

  // POST til /chat. Legg ved Authorization‑header hvis nøkkel finnes.
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}),
    },
    body: JSON.stringify(body),
    signal: opts?.signal, // gjør det mulig å avbryte (AbortController)
  });

  // Prøv å parse JSON; returner tomt objekt ved parse‑feil for enklere feilhåndtering
  const json = (await res
    .json()
    .catch(() => ({}))) as Partial<ChatApiResponse> & { message?: string };

  // Ikke‑OK status: plukk feilmelding fra server hvis mulig
  if (!res.ok) {
    const msg = json?.error || json?.message || `Chat API feilet (${res.status})`;
    throw new Error(msg);
  }

  // Valider at svaret inneholder generert melding
  if (!json || !json.message) {
    throw new Error("Ugyldig svar fra Chat API");
  }

  return json as ChatApiResponse;
}
