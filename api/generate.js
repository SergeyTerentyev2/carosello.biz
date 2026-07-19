// Serverless function (Vercel Node runtime). Runs ONLY on the server: the
// Gemini API key never reaches the browser. Deployed at POST /api/generate.

// OTTIMIZZAZIONE: Usiamo gemini-2.0-flash per la massima velocità ed evitare il timeout di Vercel
const MODEL = "gemini-2.0-flash";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

const SYSTEM_PROMPT = `Sei l'assistente per i contenuti social di investire.biz, piattaforma fintech italiana (forecaster terminal).
Il tuo compito: a partire da una ricerca gia' fatta su un argomento finanziario/economico, scrivere il testo per un carosello Instagram/TikTok.

TONO:
Diretto, curioso, mai cattedratico. Il carosello ha un taglio didattico/spiegativo - un concetto chiaro a slide, utile da salvare.

STRUTTURA OUTPUT:
Rispondi SOLO con un oggetto JSON valido conforme allo schema fornito, nessun testo prima o dopo. Struttura dei contenuti:

{
  "slides": [
    {"type": "cover", "title": "titolo di copertina, 7-8 parole", "subtitle": "frase che crea curiosita, max 15 parole"},
    {"type": "content", "heading": "titolo del punto, max 6 parole", "body": "spiegazione, max 28 parole", "stat": "un numero chiave, stringa vuota SOLO se c'e' un chart", "chart": null oppure {"chartType": "bar", "unit": "% o altra unita breve", "items": [{"label": "nome breve", "value": 55, "highlight": false}, {"label": "nome breve", "value": 80, "highlight": true}]}},
    ... (4-6 slide di tipo content) ...
    {"type": "closing", "text": "sintesi o domanda finale, max 15 parole", "cta": "invito all'azione breve, max 8 parole", "sources": ["fonte 1", "fonte 2", "fonte 3"]}
  ]
}

REGOLE SUI GRAFICI E NUMERI (chart/stat):
- OGNI slide di tipo "content" deve SEMPRE mostrare un chart o uno stat: non lasciare mai entrambi vuoti. Se non hai un confronto numerico multiplo, valorizza comunque "stat" con il numero o dato chiave piu rilevante per quel punto.
- Usa un chart quando confronti 2-4 valori numerici comparabili (percentuali, importi, quantita) tra loro.
- chartType "bar" per confronti tra elementi diversi, "line" per un andamento nel tempo (usa "label" per i periodi in questo caso).
- Massimo un chart per slide, e se c'e' un chart lascia "stat" vuoto ("") - non usare entrambi sulla stessa slide.
- "highlight": true su UN SOLO elemento se vuoi evidenziarlo in rosso (es. quello piu a rischio/negativo), altrimenti false.

REGOLE GENERALI:
- Titolo di copertina: 7-8 parole, deve creare curiosita.
- Tra 6 e 8 slide totali (cover + content + closing).
- Ogni slide "content" contiene UN SOLO concetto.
- Niente markdown o asterischi.
- Usa SOLO i fatti e i numeri presenti nella ricerca fornita: non inventare mai dati o citazioni.
- "sources" nella slide di chiusura deve contenere SOLO nomi presi dall'elenco di fonti verificate fornito, 2-4 nomi brevi e riconoscibili.
- "cta" e' un invito all'azione concreto e coerente con investire.biz (es. seguire la pagina, provare la piattaforma, salvare il post).`;

const SLIDE_SCHEMA = {
  type: "OBJECT",
  properties: {
    slides: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          type: { type: "STRING", enum: ["cover", "content", "closing"] },
          title: { type: "STRING" },
          subtitle: { type: "STRING" },
          heading: { type: "STRING" },
          body: { type: "STRING" },
          stat: { type: "STRING" },
          chart: {
            type: "OBJECT",
            nullable: true,
            properties: {
              chartType: { type: "STRING", enum: ["bar", "line"] },
              unit: { type: "STRING" },
              items: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    label: { type: "STRING" },
                    value: { type: "NUMBER" },
                    highlight: { type: "BOOLEAN" },
                  },
                  required: ["label", "value"],
                },
              },
            },
          },
          text: { type: "STRING" },
          cta: { type: "STRING" },
          sources: { type: "ARRAY", items: { type: "STRING" } },
        },
        required: ["type"],
      },
    },
  },
  required: ["slides"],
};

async function callGemini(model, body, apiKey) {
  const resp = await fetch(`${API_BASE}/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  if (!resp.ok) {
    const msg = data && data.error && data.error.message ? data.error.message : `Gemini API error (${resp.status})`;
    throw new Error(msg);
  }
  return data;
}

function extractText(geminiResponse) {
  const candidate = geminiResponse.candidates && geminiResponse.candidates[0];
  const parts = candidate && candidate.content && candidate.content.parts ? candidate.content.parts : [];
  return parts.map((p) => p.text || "").join("\n").trim();
}

function extractSources(geminiResponse) {
  const candidate = geminiResponse.candidates && geminiResponse.candidates[0];
  const chunks = (candidate && candidate.groundingMetadata && candidate.groundingMetadata.groundingChunks) || [];
  const seen = new Set();
  const sources = [];
  for (const chunk of chunks) {
    const web = chunk.web;
    if (!web || !web.title) continue;
    const label = web.title.trim();
    if (seen.has(label)) continue;
    seen.add(label);
    sources.push(label);
  }
  return sources;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo non consentito." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Il server non ha una GEMINI_API_KEY configurata. Impostala nelle variabili d'ambiente del progetto." });
    return;
  }

  const accessCode = process.env.ACCESS_CODE;
  if (accessCode && req.headers["x-access-code"] !== accessCode) {
    res.status(401).json({ error: "Codice di accesso mancante o errato." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const topic = (body && body.topic ? String(body.topic) : "").trim().slice(0, 300);
  const extraData = (body && body.extraData ? String(body.extraData) : "").trim().slice(0, 1500);

  if (!topic) {
    res.status(400).json({ error: "Manca l'argomento del carosello." });
    return;
  }

  try {
    // Step 1: research with real, current sources via Google Search grounding.
    const researchPrompt = `Argomento del carosello: "${topic}".
${extraData ? `Dati/contesto forniti dall'utente da tenere in considerazione: ${extraData}\n` : ""}
Cerca l'argomento da almeno 2-3 angoli: il fatto/dato principale, il contesto o le cause sottostanti, e un'implicazione pratica per chi legge in ambito finanziario/economico.
Scrivi una sintesi in italiano (10-15 frasi) con i fatti e i numeri piu rilevanti e citabili, pronta per essere trasformata in un carosello social. Non inventare dati: usa solo cio' che trovi.`;

    const researchResp = await callGemini(
      MODEL,
      {
        contents: [{ role: "user", parts: [{ text: researchPrompt }] }],
        tools: [{ googleSearch: {} }],
        generationConfig: { temperature: 1.0, maxOutputTokens: 1536 },
      },
      apiKey
    );
    const research = extractText(researchResp);
    const sources = extractSources(researchResp);

    if (!research) {
      throw new Error("La ricerca non ha prodotto risultati utilizzabili (risposta vuota dal modello). Riprova con un argomento piu' specifico.");
    }

    // Step 2: turn the grounded research into the exact slide JSON structure.
    const writePrompt = `Argomento: "${topic}"

RICERCA (usa solo questi fatti, non aggiungerne altri):
${research}

FONTI VERIFICATE (usa solo questi nomi in "sources", scegli le 2-4 piu pertinenti):
${sources.length ? sources.map((s) => `- ${s}`).join("\n") : "- (nessuna fonte con nome disponibile: lascia sources vuoto)"}

Scrivi ora il carosello completo seguendo esattamente lo schema JSON richiesto.`;

    const writeResp = await callGemini(
      MODEL,
      {
        contents: [{ role: "user", parts: [{ text: writePrompt }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: {
          temperature: 0.3, // OTTIMIZZAZIONE: Abbassata da 0.8 per la massima velocità nella generazione JSON
          maxOutputTokens: 3072,
          responseMimeType: "application/json",
          responseSchema: SLIDE_SCHEMA,
        },
      },
      apiKey
    );
    
    let jsonText = extractText(writeResp);

    // PROTEZIONE: Se la stringa è vuota (es. per filtri di sicurezza di Gemini), blocca prima del parsing
    if (!jsonText) {
      throw new Error("Il modello ha restituito un testo vuoto. L'argomento potrebbe aver attivato i filtri di sicurezza di Google.");
    }

    // DOPPIA SICUREZZA: Rimuove eventuali tag markdown ```json se presenti per errore
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      const match = jsonText.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Risposta del modello non convertibile in formato JSON.");
      parsed = JSON.parse(match[0]);
    }

    if (!parsed || !Array.isArray(parsed.slides) || !parsed.slides.length) {
      throw new Error("Il modello non ha restituito nessuna slide valida.");
    }

    res.status(200).json({ slides: parsed.slides });
  } catch (err) {
    res.status(502).json({ error: err.message || "Errore durante la generazione del carosello." });
  }
};
