# Generatore Caroselli — investire.biz (standalone, Gemini)

App statica (`index.html` + `app.js`, nessun framework, nessun build) più una
funzione serverless (`api/generate.js`) che parla con l'API Gemini. La chiave
Gemini vive **solo** sul server, mai nel browser.

## 0. Prima di tutto: la chiave

Se hai già usato/incollato una chiave Gemini altrove (chat, messaggi, codice
condiviso), consideraLA compromessa e **rigenerala** su
https://aistudio.google.com/app/apikey prima di procedere. Userai qui solo la
chiave nuova, e la userai come variabile d'ambiente — mai copiata in un file
che finisce su GitHub o nel browser.

## 1. Deploy con Vercel (consigliato, gratuito)

### Opzione A — dashboard, senza terminale
1. Crea un repository su GitHub e carica tutti i file di questa cartella
   (`index.html`, `app.js`, `api/generate.js`, `package.json`, ecc. — non
   serve creare `.env.local`, quello resta locale).
2. Vai su https://vercel.com → "Add New Project" → importa il repository.
   Framework preset: lascia "Other" (nessun build necessario).
3. Prima di cliccare "Deploy", apri "Environment Variables" e aggiungi:
   - `GEMINI_API_KEY` = la tua chiave nuova
   - `ACCESS_CODE` = una parola a tua scelta (opzionale ma consigliata: senza
     questa, chiunque trovi il link può generare caroselli a tue spese)
4. Deploy. In ~30 secondi ottieni un URL tipo
   `https://tuo-progetto.vercel.app` — funziona in qualunque browser, senza
   account, senza login.

### Opzione B — da terminale
```bash
npm i -g vercel
cd investire-carousel-gemini
vercel                      # segui le domande, crea il progetto
vercel env add GEMINI_API_KEY production
vercel env add ACCESS_CODE production   # opzionale
vercel --prod                # pubblica
```

## 2. Verifica

Apri l'URL pubblicato, inserisci un argomento, genera il carosello. Se hai
impostato `ACCESS_CODE`, dovrai scriverlo nel campo "Codice di accesso" della
pagina prima di generare.

## 3. Aggiornare in futuro

- Modifiche a `index.html`/`app.js`: bastano un commit + push (Vercel
  ridistribuisce da solo se collegato a GitHub) oppure `vercel --prod`.
- Modello Gemini: è impostato in `api/generate.js` (`const MODEL = ...`).
  `gemini-2.5-pro` è la versione GA corrente; controlla ogni tanto
  https://ai.google.dev/gemini-api/docs/deprecations per eventuali ritiri e
  aggiorna la costante se necessario.

## Struttura del progetto

```
index.html        pagina e stile
app.js             logica: costruzione slide SVG, export PNG, chiamata a /api/generate
api/generate.js    funzione serverless: ricerca con Gemini + Google Search, poi scrittura JSON strutturato
package.json       metadati minimi (nessuna dipendenza necessaria)
.env.example       variabili d'ambiente richieste (da copiare in .env.local per test locali)
```

## Nota sui costi

Ogni generazione fa due chiamate a Gemini (una di ricerca con Google Search,
una di scrittura). Controlla i prezzi aggiornati su
https://ai.google.dev/gemini-api/docs/pricing e imposta `ACCESS_CODE` se
pubblichi il link in un posto che non controlli.
