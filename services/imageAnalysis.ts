/**
 * KI-Bildanalyse ohne API-Key – läuft komplett im Browser.
 * 1) Bild-Kommentar aus Größe/Helligkeit (immer verfügbar)
 * 2) OCR per Tesseract.js (Fallback wenn keine externe KI)
 */

/** Analysiert ein Bild per Canvas (Größe, Helligkeit) und gibt einen kurzen KI-ähnlichen Kommentar zurück. Kein API-Key. */
export async function getImageComment(
  dataUrl: string,
  roastLevel: number
): Promise<string> {
  const img = await loadImage(dataUrl);
  const { width, height, brightness } = await analyzeImage(img);
  const area = width * height;
  const isLarge = area > 800 * 600;
  const isSmall = area < 200 * 200;
  const isBright = brightness > 0.5;
  const isDark = brightness < 0.25;

  const mild = [
    isBright && 'Helles Bild. Zumindest deine Kamera ist hellwach.',
    isDark && 'Bruh, mach mal Licht an. Ich seh hier gar nichts.',
    isLarge && 'Großes Bild. Hoffentlich ist auch dein Gehirn so groß.',
    isSmall && 'Kleiner als meine erste Schuppe. Aber reicht.',
  ].filter(Boolean);
  const medium = [
    isBright && 'Helligkeit passt. Jetzt musst nur noch du aufwachen.',
    isDark && 'Dunkel wie in meiner alten Höhle. Gib mal Licht.',
    isLarge && 'Fettes Bild. Ich schau mir das mal an...',
    isSmall && 'Kompakt. So wie dein Wissen aktuell noch?',
  ].filter(Boolean);
  const hard = [
    isBright && 'Gutes Licht. Jetzt gibt es keine Ausreden mehr fürs Lernen.',
    isDark && 'Stockduster. Willst du mich verarschen? Licht an!',
    isLarge && 'Ordentliche Auflösung. Da seh ich jeden Fehler, Bro.',
    isSmall && 'Mini-Bild. Hast wohl Angst, dass ich zu viel sehe?',
  ].filter(Boolean);

  const pool = roastLevel <= 2 ? mild : roastLevel <= 3 ? medium : hard;
  const options = pool.length > 0 ? pool : ['Bild erkannt. Du kannst jetzt Vokabeln daraus ziehen.'];
  return (options[Math.floor(Math.random() * options.length)] as string) || 'Bild geladen.';
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Bild laden fehlgeschlagen'));
    img.src = src;
  });
}

async function analyzeImage(img: HTMLImageElement): Promise<{ width: number; height: number; brightness: number }> {
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, 200 / Math.max(img.width, img.height));
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return { width: img.width, height: img.height, brightness: 0.5 };
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let sum = 0;
  for (let i = 0; i < data.length; i += 4) {
    sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  const brightness = sum / (data.length / 4) / 255;
  return { width: img.width, height: img.height, brightness };
}

/** OCR im Browser mit Tesseract.js – kein API-Key. PSM 6 = Block Text (besser für Vokabellisten). */
export async function extractTextFromImage(dataUrl: string, lang: string = 'deu+eng'): Promise<string> {
  try {
    const tesseract = await import('tesseract.js');
    const worker = await tesseract.createWorker(lang);
    try {
      const { data } = await worker.recognize(dataUrl, {
        tessedit_pageseg_mode: 6, /* PSM 6 = uniform block of text, gut für Listen */
      });
      return data.text || '';
    } finally {
      await worker.terminate();
    }
  } catch (e) {
    console.warn('Tesseract.js OCR nicht verfügbar:', e);
    return '';
  }
}
