import type { ChatApiMessage } from "@/interfaces/types";

// Basen til API’et og API‑nøkkel hentes fra Expo sine public env‑variabler
// Disse må settes i utviklingsmiljø/CI for at kall skal fungere.

/**
 * Kaller Chat API’et med scenario + meldingshistorikk og returnerer assistentens svar.
 * Kaster Error ved nettverksfeil/ugyldig svar for enkel håndtering i UI.
 */


// Accepts messages: [{ user: string, role: string }]
const sendChat = async (messages: ChatApiMessage[]) => {
  // Map to API format: { role, content }

  console.log("Trying to send to api:", JSON.stringify({ messages: messages }));
  try {
    const response = await fetch('https://192.168.1.2:7143/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });


     if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export { sendChat };

