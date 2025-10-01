import type { ChatApiMessage } from "@/interfaces/types";
import axios from "axios";

// Basen til API’et og API‑nøkkel hentes fra Expo sine public env‑variabler
// Disse må settes i utviklingsmiljø/CI for at kall skal fungere.

/**
 * Kaller Chat API’et med scenario + meldingshistorikk og returnerer assistentens svar.
 * Kaster Error ved nettverksfeil/ugyldig svar for enkel håndtering i UI.
 */


// Accepts messages: [{ user: string, role: string }]
const sendChat = (messages: ChatApiMessage[]) => {
  // Map to API format: { role, content }

  console.log("Trying to send to api:", JSON.stringify({ messages: messages }));
    const response = axios.post(
      'https://192.168.1.2:7143/api/Chat',
      { messages: messages },
      {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("Api Res", response);
    return response;
}

export { sendChat };

