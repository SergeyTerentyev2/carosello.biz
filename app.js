
const C = {
  verde: "#1BC376",
  indigo: "#18113C",
  bianco: "#F5F4FC",
  lavanda: "#AAA2CA",
  red: "#D12E53",
};

const W = 1080;
const H = 1350;
const MARGIN = 90;
const CONTENT_W = W - MARGIN * 2;

// investire.biz logo, pre-processed to a clean white cutout (transparent background),
// always shown on the cover regardless of any image the user uploads.
const LOGO_WHITE = "data:image/png;base64,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";
const LOGO_W = 260;
const LOGO_H = Math.round(LOGO_W * (151 / 700));

// The source cutout's opaque pixels only reach ~82% alpha, so on the indigo
// background it reads as grey instead of white. These filters force the
// logo to a flat, fully-opaque color (white for dark backgrounds, indigo
// for light ones) while keeping its cutout shape intact.
const LOGO_FILTER_DEFS = `
    <filter id="logoWhite" x="-20%" y="-20%" width="140%" height="140%">
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/>
      <feComponentTransfer><feFuncA type="linear" slope="1.6" intercept="0"/></feComponentTransfer>
    </filter>
    <filter id="logoIndigo" x="-20%" y="-20%" width="140%" height="140%">
      <feColorMatrix type="matrix" values="0 0 0 0 0.094  0 0 0 0 0.067  0 0 0 0 0.235  0 0 0 1 0"/>
      <feComponentTransfer><feFuncA type="linear" slope="1.6" intercept="0"/></feComponentTransfer>
    </filter>`;

const SYSTEM_PROMPT = `Sei l'assistente per i contenuti social di investire.biz, piattaforma fintech italiana (forecaster terminal).
Il tuo compito: creare il testo per un carosello Instagram/TikTok su un argomento finanziario/economico dato dall'utente.

METODO OBBLIGATORIO PRIMA DI SCRIVERE:
Cerca l'argomento sul web da almeno 2-3 angoli: il fatto/dato principale, il contesto o le cause sottostanti, e un'implicazione pratica per chi legge. Non scrivere mai basandoti su un solo articolo o un solo angolo.

TONO:
Diretto, curioso, mai cattedratico. Il carosello ha un taglio didattico/spiegativo - un concetto chiaro a slide, utile da salvare.

STRUTTURA OUTPUT:
Rispondi SOLO con un oggetto JSON valido, nessun testo prima o dopo, nessun blocco codice con backtick. Struttura esatta:

{
  "slides": [
    {"type": "cover", "title": "titolo di copertina, 7-8 parole", "subtitle": "frase che crea curiosita, max 15 parole"},
    {"type": "content", "heading": "titolo del punto, max 6 parole", "body": "spiegazione, max 28 parole", "stat": "un numero chiave, stringa vuota SOLO se c'e' un chart", "chart": null oppure {"chartType": "bar", "unit": "% o altra unita breve", "items": [{"label": "nome breve", "value": 55, "highlight": false}, {"label": "nome breve", "value": 80, "highlight": true}]}},
    ... (4-6 slide di tipo content) ...
    {"type": "closing", "text": "sintesi o domanda finale, max 15 parole", "cta": "invito all'azione breve, max 8 parole", "sources": ["fonte 1", "fonte 2", "fonte 3"]}
  ]
}

REGOLE SUI GRAFICI E NUMERI (chart/stat):
- OGNI slide di tipo "content" deve SEMPRE mostrare un chart o uno stat: non lasciare mai entrambi vuoti. Se non hai un confronto numerico multiplo, valorizza comunque "stat" con il numero o dato chiave piu rilevante per quel punto (va bene anche se non hai trovato un dato preciso: usa comunque un numero, una percentuale o una data pertinente)
- Usa un chart quando confronti 2-4 valori numerici comparabili (percentuali, importi, quantita) tra loro - es. copertura carburante tra 2 compagnie, fatturato tra aziende, andamento nel tempo
- chartType "bar" per confronti tra elementi diversi, "line" per un andamento nel tempo (usa "label" per i periodi in questo caso)
- Massimo un chart per slide, e se c'e' un chart lascia "stat" vuoto ("") - non usare entrambi sulla stessa slide
- "highlight": true su UN SOLO elemento se vuoi evidenziarlo in rosso (es. quello piu a rischio/negativo), altrimenti false
- Usa il chart quando i numeri reggono davvero un confronto visivo (almeno 2-3 slide su un totale di 4-6 content); per le altre slide content usa comunque uno "stat" con un numero degno di nota

REGOLE GENERALI:
- Titolo di copertina: 7-8 parole, deve creare curiosita e stare su 1-2 righe
- Tra 6 e 8 slide totali (cover + content + closing)
- Ogni slide "content" contiene UN SOLO concetto
- Testi leggermente piu estesi rispetto a un titolo nudo, ma restano su una slide visiva, non un articolo. Rispetta i limiti di parole.
- Niente markdown o asterischi
- Cita sempre la fonte reale quando riporti un dato numerico
- Non inventare mai dati o citazioni
- Nella slide finale ("closing"): "cta" e' un invito all'azione concreto e coerente con investire.biz (es. seguire la pagina, provare la piattaforma, salvare il post), "sources" e' l'elenco di TUTTE le fonti reali usate nella ricerca (2-4 fonti, nomi brevi e riconoscibili)`;

// --- text measuring / wrapping / autofit (canvas 2D, no external libs) ---
let measureCtx = null;
function getMeasureCtx() {
  if (!measureCtx) {
    const c = document.createElement("canvas");
    measureCtx = c.getContext("2d");
  }
  return measureCtx;
}

function wrapText(text, maxWidth, fontSize, fontWeight = 400) {
  if (!text) return [];
  const ctx = getMeasureCtx();
  ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`;
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Shrinks font size until the wrapped text fits within maxHeight. Guarantees
// no overflow: if even the minimum size doesn't fit, truncates with an ellipsis.
function autoFitLines(text, maxWidth, maxHeight, startSize, minSize, weight, lineHeightRatio = 1.18) {
  if (!text || !text.trim()) return { lines: [], fontSize: startSize, lineHeight: Math.round(startSize * lineHeightRatio) };
  let size = startSize;
  while (size >= minSize) {
    const lines = wrapText(text, maxWidth, size, weight);
    const lineHeight = Math.round(size * lineHeightRatio);
    if (lines.length * lineHeight <= maxHeight) {
      return { lines, fontSize: size, lineHeight };
    }
    size -= 2;
  }
  const lineHeight = Math.round(minSize * lineHeightRatio);
  let lines = wrapText(text, maxWidth, minSize, weight);
  const maxLines = Math.max(1, Math.floor(maxHeight / lineHeight));
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, "") + "\u2026";
  }
  return { lines, fontSize: minSize, lineHeight };
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function tspans(lines, x, startY, lineHeight, anchor = "start") {
  return lines
    .map((l, i) => `<tspan x="${x}" y="${startY + i * lineHeight}" text-anchor="${anchor}">${escapeXml(l)}</tspan>`)
    .join("");
}

// --- chart rendering (plain SVG, no external chart lib) ---
function buildBarChart(chart, x, y, w, h) {
  const items = (chart.items || []).slice(0, 4);
  if (items.length === 0) return "";
  const maxVal = Math.max(...items.map((i) => Number(i.value) || 0), 1);
  const unit = chart.unit || "";
  const topPad = 56;
  const bottomPad = 84;
  const barsAreaH = Math.max(40, h - topPad - bottomPad);
  const gap = 32;
  const barW = (w - gap * (items.length - 1)) / items.length;
  const baseline = y + topPad + barsAreaH;

  let svg = `<line x1="${x}" y1="${baseline}" x2="${x + w}" y2="${baseline}" stroke="${C.lavanda}" stroke-opacity="0.5" stroke-width="3"/>`;

  items.forEach((item, i) => {
    const val = Number(item.value) || 0;
    const barH = (val / maxVal) * barsAreaH;
    const bx = x + i * (barW + gap);
    const by = baseline - barH;
    const color = item.highlight ? C.red : C.verde;
    svg += `<rect x="${bx}" y="${by}" width="${barW}" height="${Math.max(barH, 4)}" rx="10" fill="${color}"/>`;
    svg += `<text x="${bx + barW / 2}" y="${by - 20}" font-family="Arial, sans-serif" font-weight="800" font-size="30" fill="${C.indigo}" text-anchor="middle">${escapeXml(val + unit)}</text>`;
    const labelLines = wrapText(item.label, barW + 16, 26, 600).slice(0, 2);
    svg += `<text font-family="Arial, sans-serif" font-weight="600" font-size="26" fill="${C.indigo}" fill-opacity="0.75">${tspans(
      labelLines,
      bx + barW / 2,
      baseline + 40,
      30,
      "middle"
    )}</text>`;
  });

  return svg;
}

function buildLineChart(chart, x, y, w, h) {
  const items = (chart.items || []).slice(0, 6);
  if (items.length === 0) return "";
  const maxVal = Math.max(...items.map((i) => Number(i.value) || 0), 1);
  const unit = chart.unit || "";
  const topPad = 56;
  const bottomPad = 84;
  const plotH = Math.max(40, h - topPad - bottomPad);
  const baseline = y + topPad + plotH;
  const stepX = items.length > 1 ? w / (items.length - 1) : 0;

  const points = items.map((item, i) => {
    const val = Number(item.value) || 0;
    const px = x + stepX * i;
    const py = baseline - (val / maxVal) * plotH;
    return { px, py, val };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.px.toFixed(1)},${p.py.toFixed(1)}`).join(" ");

  let svg = `<line x1="${x}" y1="${baseline}" x2="${x + w}" y2="${baseline}" stroke="${C.lavanda}" stroke-opacity="0.5" stroke-width="3"/>`;
  svg += `<path d="${pathD}" fill="none" stroke="${C.verde}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;

  points.forEach((p, i) => {
    svg += `<circle cx="${p.px}" cy="${p.py}" r="10" fill="${items[i].highlight ? C.red : C.verde}"/>`;
    svg += `<text x="${p.px}" y="${p.py - 22}" font-family="Arial, sans-serif" font-weight="800" font-size="26" fill="${C.indigo}" text-anchor="middle">${escapeXml(p.val + unit)}</text>`;
    const labelLines = wrapText(items[i].label, stepX + 40 || w, 24, 600).slice(0, 2);
    svg += `<text font-family="Arial, sans-serif" font-weight="600" font-size="24" fill="${C.indigo}" fill-opacity="0.75">${tspans(
      labelLines,
      p.px,
      baseline + 38,
      28,
      "middle"
    )}</text>`;
  });

  return svg;
}

function buildChart(chart, x, y, w, h) {
  if (!chart || !chart.items || chart.items.length === 0) return "";
  if (chart.chartType === "line") return buildLineChart(chart, x, y, w, h);
  return buildBarChart(chart, x, y, w, h);
}

// --- build a full SVG markup string for one slide, at full 1080x1350 res ---
// coverImage: hero photo used full-bleed on the cover only
// bgImage: separate watermark image, shown at low opacity across every slide
function buildSlideSVG(slide, index, coverImage, bgImage) {
  const cx = W / 2;

  if (slide.type === "cover") {
    const title = autoFitLines(slide.title, CONTENT_W, 400, 74, 40, 800);
    const sub = autoFitLines(slide.subtitle, CONTENT_W - 60, 220, 36, 24, 400);
    const gap = 40;
    const totalH = title.lines.length * title.lineHeight + (sub.lines.length ? gap + sub.lines.length * sub.lineHeight : 0);
    // Anchor the text block around 60% down the slide instead of dead-center,
    // so title + subtitle sit lower, closer to the bottom third.
    let y = H * 0.6 - totalH / 2 + title.fontSize * 0.8;
    const titleBlock = tspans(title.lines, cx, y, title.lineHeight, "middle");
    y += title.lines.length * title.lineHeight + gap;
    const subBlock = tspans(sub.lines, cx, y, sub.lineHeight, "middle");

    const imageLayer = coverImage
      ? `<image href="${coverImage}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice"/>
         <rect width="${W}" height="${H}" fill="url(#coverGrad)"/>`
      : bgImage
      ? `<image href="${bgImage}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" opacity="0.16"/>`
      : "";

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
      <defs>
        <linearGradient id="coverGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${C.indigo}" stop-opacity="0.25"/>
          <stop offset="45%" stop-color="${C.indigo}" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="${C.indigo}" stop-opacity="0.9"/>
        </linearGradient>
        ${LOGO_FILTER_DEFS}
      </defs>
      <rect width="${W}" height="${H}" fill="${C.indigo}"/>
      ${imageLayer}
      <image href="${LOGO_WHITE}" x="${MARGIN}" y="${MARGIN}" width="${LOGO_W}" height="${LOGO_H}" filter="url(#logoWhite)"/>
      <text font-family="Arial, sans-serif" font-weight="800" font-size="${title.fontSize}" fill="#FFFFFF">${titleBlock}</text>
      <text font-family="Arial, sans-serif" font-weight="400" font-size="${sub.fontSize}" fill="${C.lavanda}">${subBlock}</text>
    </svg>`;
  }

  if (slide.type === "closing") {
    const main = autoFitLines(slide.text, CONTENT_W - 40, 360, 50, 32, 800);

    const ctaText = slide.cta && slide.cta.trim() ? slide.cta.trim() : "";
    const cta = ctaText ? autoFitLines(ctaText, CONTENT_W - 120, 140, 34, 22, 800) : { lines: [] };

    // Accept both the new "sources" array and the older single "source" string.
    const sourcesArr = Array.isArray(slide.sources)
      ? slide.sources.filter(Boolean)
      : slide.source
      ? [slide.source]
      : [];
    const sourcesText = sourcesArr.length ? `Fonti: ${sourcesArr.join(" · ")}` : "";
    const sources = sourcesText
      ? autoFitLines(sourcesText, CONTENT_W, 120, 24, 16, 400)
      : { lines: [], fontSize: 24, lineHeight: 30 };

    const smallLogoW = 150;
    const smallLogoH = Math.round(smallLogoW * (151 / 700));
    const zoneTop = MARGIN + smallLogoH + 60;
    const bottomReserve = sources.lines.length ? sources.lines.length * sources.lineHeight + 56 : 40;
    const zoneBottom = H - MARGIN - bottomReserve;
    const zoneH = Math.max(200, zoneBottom - zoneTop);

    const ctaPadY = 26;
    const ctaBoxH = cta.lines.length ? cta.lines.length * cta.lineHeight + ctaPadY * 2 : 0;
    const gapMainCta = 46;

    const blockH = main.lines.length * main.lineHeight + (ctaBoxH ? gapMainCta + ctaBoxH : 0);
    let y = zoneTop + Math.max(0, (zoneH - blockH) / 2) + main.fontSize * 0.8;
    const mainBlock = tspans(main.lines, cx, y, main.lineHeight, "middle");
    y += main.lines.length * main.lineHeight;

    let ctaSvg = "";
    if (ctaBoxH) {
      y += gapMainCta;
      const ctaBoxY = y;
      const ctaTextY = ctaBoxY + ctaPadY + cta.fontSize * 0.8;
      const ctaBlock = tspans(cta.lines, cx, ctaTextY, cta.lineHeight, "middle");
      ctaSvg = `
        <rect x="${MARGIN}" y="${ctaBoxY}" width="${CONTENT_W}" height="${ctaBoxH}" rx="18" fill="${C.verde}"/>
        <text font-family="Arial, sans-serif" font-weight="800" font-size="${cta.fontSize}" fill="#FFFFFF">${ctaBlock}</text>`;
    }

    // Sources pinned near the bottom margin, smaller and quieter than the CTA.
    const sourcesY = H - MARGIN - 10 - (sources.lines.length ? (sources.lines.length - 1) * sources.lineHeight : 0);
    const sourcesBlock = sources.lines.length ? tspans(sources.lines, cx, sourcesY, sources.lineHeight, "middle") : "";

    const watermark = bgImage
      ? `<image href="${bgImage}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" opacity="0.27"/>`
      : "";

    const smallLogo = `<image href="${LOGO_WHITE}" x="${cx - smallLogoW / 2}" y="${MARGIN}" width="${smallLogoW}" height="${smallLogoH}" filter="url(#logoWhite)"/>`;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
      <defs>${LOGO_FILTER_DEFS}</defs>
      <rect width="${W}" height="${H}" fill="${C.indigo}"/>
      ${watermark}
      ${smallLogo}
      <text font-family="Arial, sans-serif" font-weight="800" font-size="${main.fontSize}" fill="#FFFFFF">${mainBlock}</text>
      ${ctaSvg}
      <text font-family="Arial, sans-serif" font-weight="400" font-size="${sources.fontSize}" fill="${C.lavanda}">${sourcesBlock}</text>
    </svg>`;
  }

  // content slide — heading + body + chart/stat are laid out as one block
  // and centered vertically in the space below the header row, and every
  // content slide always carries either a chart or a stat number.
  const numberLabel = String(index).padStart(2, "0");
  const hasChart = slide.chart && slide.chart.items && slide.chart.items.length > 0;
  const hasStat = !hasChart && slide.stat && slide.stat.trim();

  const headerY = MARGIN + 42;
  const smallLogoW = 128;
  const smallLogoH = Math.round(smallLogoW * (151 / 700));
  const contentTop = MARGIN + 150;
  const bottomLimit = H - MARGIN - 30;
  const availH = bottomLimit - contentTop;

  const headingMaxH = hasChart ? 170 : 210;
  const heading = autoFitLines(slide.heading, CONTENT_W, headingMaxH, 58, 34, 800);
  const headingH = heading.lines.length * heading.lineHeight;

  const bodyMaxH = hasChart ? 100 : 230;
  const body = slide.body
    ? autoFitLines(slide.body, CONTENT_W, bodyMaxH, hasChart ? 32 : 36, 22, 400)
    : { lines: [] };
  const bodyH = body.lines.length ? body.lines.length * body.lineHeight : 0;
  const gapHeadingBody = 30;
  const gapToVisual = 36;

  let statObj = null;
  let statBoxH = 0;
  if (hasStat) {
    statObj = autoFitLines(slide.stat, CONTENT_W - 60, 150, 40, 24, 800);
    statBoxH = Math.max(120, statObj.lines.length * statObj.lineHeight + 56);
  }

  let visualH = 0;
  if (hasChart) {
    const usedSoFar = headingH + (bodyH ? gapHeadingBody + bodyH : 0) + gapToVisual;
    visualH = Math.max(240, Math.min(440, availH - usedSoFar));
  } else if (hasStat) {
    visualH = statBoxH;
  }

  let totalH = headingH;
  if (bodyH) totalH += gapHeadingBody + bodyH;
  if (hasChart || hasStat) totalH += gapToVisual + visualH;

  let y = contentTop + Math.max(0, (availH - totalH) / 2) + heading.fontSize * 0.8;
  const headingBlock = tspans(heading.lines, cx, y, heading.lineHeight, "middle");
  y += headingH;

  let bodySvg = "";
  if (bodyH) {
    y += gapHeadingBody;
    const bodyBlock = tspans(body.lines, cx, y, body.lineHeight, "middle");
    bodySvg = `<text font-family="Arial, sans-serif" font-weight="400" font-size="${body.fontSize}" fill="${C.indigo}" fill-opacity="0.85">${bodyBlock}</text>`;
    y += bodyH;
  }

  let chartSvg = "";
  let statSvg = "";
  if (hasChart) {
    y += gapToVisual;
    chartSvg = buildChart(slide.chart, MARGIN, y, CONTENT_W, visualH);
  } else if (hasStat) {
    y += gapToVisual;
    const boxY = y;
    const statTextY = boxY + (statBoxH - statObj.lines.length * statObj.lineHeight) / 2 + statObj.fontSize * 0.8;
    const statBlock = tspans(statObj.lines, cx, statTextY, statObj.lineHeight, "middle");
    statSvg = `
      <rect x="${MARGIN}" y="${boxY}" width="${CONTENT_W}" height="${statBoxH}" rx="18" fill="${C.red}" fill-opacity="0.1"/>
      <text font-family="Arial, sans-serif" font-weight="800" font-size="${statObj.fontSize}" fill="${C.red}">${statBlock}</text>`;
  }

  const watermark = bgImage
    ? `<image href="${bgImage}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" opacity="0.22"/>`
    : "";

  // Company logo, always present: small and recolored to solid indigo so it
  // reads clearly against the white content-slide background.
  const smallLogo = `<image href="${LOGO_WHITE}" x="${W - MARGIN - smallLogoW}" y="${MARGIN - 4}" width="${smallLogoW}" height="${smallLogoH}" filter="url(#logoIndigo)"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <defs>${LOGO_FILTER_DEFS}</defs>
    <rect width="${W}" height="${H}" fill="#FFFFFF"/>
    ${watermark}
    <rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="${C.lavanda}" stroke-opacity="0.35" stroke-width="4"/>
    <text x="${MARGIN}" y="${headerY}" font-family="Arial, sans-serif" font-weight="800" font-size="30" fill="${C.verde}" text-anchor="start">${numberLabel}</text>
    ${smallLogo}
    <text font-family="Arial, sans-serif" font-weight="800" font-size="${heading.fontSize}" fill="${C.indigo}">${headingBlock}</text>
    ${bodySvg}
    ${chartSvg}
    ${statSvg}
  </svg>`;
}

function svgToPreviewUrl(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

// Renders the SVG to a flat PNG and returns an object: URL (not a data: URI).
// Object URLs are what makes the download/open-in-tab buttons below reliable
// across browsers and sandboxed webviews — data: URIs are frequently blocked
// for downloads and for direct navigation (window.open), blob: URLs are not.
function svgStringToPngBlobUrl(svgString) {
  return new Promise((resolve, reject) => {
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(svgUrl);
      canvas.toBlob((pngBlob) => {
        if (!pngBlob) {
          reject(new Error("toBlob failed"));
          return;
        }
        resolve(URL.createObjectURL(pngBlob));
      }, "image/png");
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(svgUrl);
      reject(e);
    };
    img.src = svgUrl;
  });
}

// Best-effort automatic download. This can silently fail inside sandboxed
// webviews (no permission to trigger a real download), so it is always
// paired in the UI with a visible "Apri immagine" link the person can use
// to open the PNG directly and save it manually — that always works because
// it's just a normal image the browser is displaying, not a triggered action.
function tryAutoDownload(blobUrl, filename) {
  try {
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return true;
  } catch (e) {
    return false;
  }
}

/* =========================================================================
   UI logic — no framework, plain DOM. State lives in the variables below;
   render*() functions sync the DOM to that state after every change.
   ========================================================================= */

const el = (id) => document.getElementById(id);

let topic = "";
let extraData = "";
let accessCode = "";
let coverImage = null;
let bgImage = null;

let slides = null;
let current = 0;
let loading = false;
let error = null;
let exporting = false;
let exportingAll = false;
let exportedSingle = null;
let exportedAll = null;

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function showError(msg) {
  error = msg;
  const box = el("error-msg");
  if (msg) {
    box.textContent = msg;
    box.hidden = false;
  } else {
    box.hidden = true;
  }
}

function setGenerating(isLoading) {
  loading = isLoading;
  const btn = el("generate-btn");
  btn.disabled = isLoading;
  btn.querySelector(".btn-label").textContent = isLoading
    ? "Sto cercando e scrivendo\u2026"
    : "Genera carosello";
  btn.classList.toggle("is-loading", isLoading);
}

function revokeExported() {
  if (exportedSingle) URL.revokeObjectURL(exportedSingle.url);
  if (exportedAll) exportedAll.forEach((item) => URL.revokeObjectURL(item.url));
  exportedSingle = null;
  exportedAll = null;
}

function showForm() {
  el("form-panel").hidden = false;
  el("viewer-panel").hidden = true;
}

function showViewer() {
  el("form-panel").hidden = true;
  el("viewer-panel").hidden = false;
  renderSlide();
  renderExports();
}

function currentSvg() {
  return buildSlideSVG(slides[current], current, coverImage, bgImage);
}

function renderSlide() {
  if (!slides) return;
  el("slide-preview").src = svgToPreviewUrl(currentSvg());
  el("slide-counter").textContent = `Slide ${current + 1} di ${slides.length}`;
  renderDots();
}

function renderDots() {
  const dotsEl = el("dots");
  dotsEl.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === current ? " active" : "");
    dot.addEventListener("click", () => {
      current = i;
      renderSlide();
    });
    dotsEl.appendChild(dot);
  });
}

function updateExportButtons() {
  const c = el("export-current-btn");
  const a = el("export-all-btn");
  c.disabled = exporting || exportingAll;
  a.disabled = exporting || exportingAll;
  c.textContent = exporting ? "Genero l'immagine\u2026" : "Scarica questa slide";
  a.textContent = exportingAll ? "Genero le immagini\u2026" : `Scarica tutte le slide (${slides ? slides.length : 0})`;
}

function renderExports() {
  updateExportButtons();

  const hint = el("export-hint");
  hint.hidden = !(exportedSingle || exportedAll);

  const singleBox = el("export-single");
  singleBox.innerHTML = "";
  singleBox.hidden = !exportedSingle;
  if (exportedSingle) {
    const img = document.createElement("img");
    img.src = exportedSingle.url;
    img.alt = exportedSingle.filename;
    img.className = "export-preview";
    const link = document.createElement("a");
    link.href = exportedSingle.url;
    link.download = exportedSingle.filename;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "btn btn-dark btn-small";
    link.textContent = "Apri immagine";
    singleBox.appendChild(img);
    singleBox.appendChild(link);
  }

  const allBox = el("export-all");
  allBox.innerHTML = "";
  allBox.hidden = !exportedAll;
  if (exportedAll) {
    exportedAll.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.url;
      link.download = item.filename;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "export-all-item";
      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.filename;
      const label = document.createElement("span");
      label.textContent = `Apri slide ${item.index + 1}`;
      link.appendChild(img);
      link.appendChild(label);
      allBox.appendChild(link);
    });
  }
}

async function generate() {
  if (!topic.trim() || loading) return;
  revokeExported();
  showError(null);
  slides = null;
  setGenerating(true);
  try {
    const resp = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessCode ? { "x-access-code": accessCode } : {}),
      },
      body: JSON.stringify({ topic, extraData }),
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) throw new Error(data.error || `Errore del server (${resp.status}).`);
    if (!data.slides || !data.slides.length) throw new Error("Il modello non ha restituito nessuna slide. Riprova.");
    slides = data.slides;
    current = 0;
    showViewer();
  } catch (e) {
    showError(e.message || "Errore imprevisto durante la generazione.");
  } finally {
    setGenerating(false);
  }
}

async function exportCurrent() {
  if (!slides || exporting || exportingAll) return;
  exporting = true;
  if (exportedSingle) URL.revokeObjectURL(exportedSingle.url);
  exportedSingle = null;
  renderExports();
  try {
    const url = await svgStringToPngBlobUrl(currentSvg());
    const filename = `investire-biz-slide-${current + 1}.png`;
    tryAutoDownload(url, filename);
    exportedSingle = { url, filename };
  } catch (e) {
    showError("Non sono riuscito a generare l'immagine di questa slide.");
  } finally {
    exporting = false;
    renderExports();
  }
}

async function exportAll() {
  if (!slides || exporting || exportingAll) return;
  exportingAll = true;
  if (exportedAll) exportedAll.forEach((item) => URL.revokeObjectURL(item.url));
  exportedAll = null;
  renderExports();
  try {
    const results = [];
    for (let i = 0; i < slides.length; i++) {
      const svg = buildSlideSVG(slides[i], i, coverImage, bgImage);
      const url = await svgStringToPngBlobUrl(svg);
      const filename = `investire-biz-slide-${i + 1}.png`;
      tryAutoDownload(url, filename);
      results.push({ index: i, url, filename });
      await new Promise((r) => setTimeout(r, 250));
    }
    exportedAll = results;
  } catch (e) {
    showError("Export interrotto a meta'. Le immagini generate finora restano visibili qui sotto.");
  } finally {
    exportingAll = false;
    renderExports();
  }
}

function reset() {
  revokeExported();
  slides = null;
  topic = "";
  extraData = "";
  current = 0;
  coverImage = null;
  bgImage = null;
  el("topic-input").value = "";
  el("extra-input").value = "";
  el("cover-input").value = "";
  el("bg-input").value = "";
  showError(null);
  showForm();
}

el("topic-input").addEventListener("input", (e) => {
  topic = e.target.value;
});
el("extra-input").addEventListener("input", (e) => {
  extraData = e.target.value;
});
el("access-input").addEventListener("input", (e) => {
  accessCode = e.target.value;
});
el("cover-input").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  coverImage = await fileToDataUrl(file);
  if (slides) renderSlide();
});
el("bg-input").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  bgImage = await fileToDataUrl(file);
  if (slides) renderSlide();
});
el("topic-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") generate();
});
el("generate-btn").addEventListener("click", generate);
el("prev-btn").addEventListener("click", () => {
  if (!slides) return;
  current = (current - 1 + slides.length) % slides.length;
  renderSlide();
});
el("next-btn").addEventListener("click", () => {
  if (!slides) return;
  current = (current + 1) % slides.length;
  renderSlide();
});
el("export-current-btn").addEventListener("click", exportCurrent);
el("export-all-btn").addEventListener("click", exportAll);
el("reset-btn").addEventListener("click", reset);

showForm();
