/** Typen für tesseract.js (Vokabel-Scan OCR) – optionales Modul */
declare module 'tesseract.js' {
  export interface RecognizeResult {
    data: { text: string };
  }
  export interface Worker {
    recognize(image: string, options?: Record<string, unknown>): Promise<RecognizeResult>;
    terminate(): Promise<void>;
  }
  export function createWorker(
    lang?: string,
    oem?: number,
    config?: { logger?: (m: unknown) => void }
  ): Promise<Worker>;
}
