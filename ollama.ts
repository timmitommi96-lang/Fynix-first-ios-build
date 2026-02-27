/**
 * V2: Backend API Integration – Chat, Image Generation
 * Nutzt die /api Endpoints für KI-Funktionen
 */

export const OLLAMA_TEXT_MODEL = 'gpt-4o-mini';
export const OLLAMA_VISION_MODEL = 'gpt-4o-mini';

export interface OllamaChatOptions {
  prompt: string;
  model: string;
  images?: string[];
}

function getUserId(): string {
  let userId = localStorage.getItem('fynix_user_id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('fynix_user_id', userId);
  }
  return userId;
}

/** Cloud KI-Chat via Puter.js */
export async function ollamaChat({ prompt, model, images }: OllamaChatOptions): Promise<string> {
  try {
    if (typeof (window as any).puter === 'undefined') {
      throw new Error('Puter SDK nicht geladen');
    }
    const puter = (window as any).puter;

    let content: any = prompt;
    if (images && images.length > 0) {
      // Formatiere für Multimodal (GPT-4o-mini Stil)
      content = [
        { type: 'text', text: prompt }
      ];
      for (const img of images) {
        // img ist Base64 (ohne Prefix), Puter erwartet oft DataURL oder URL
        const dataUrl = img.startsWith('data:') ? img : `data:image/jpeg;base64,${img}`;
        content.push({ type: 'image_url', image_url: { url: dataUrl } });
      }
    }

    const response = await puter.ai.chat(content, { model: 'gpt-4o-mini' });
    const reply = response?.message?.content || (typeof response === 'string' ? response : null);

    if (!reply) throw new Error('Keine Antwort erhalten');
    return reply;
  } catch (err: any) {
    console.error('Puter Chat Error:', err);
    throw new Error(err.message || 'Chat fehlgeschlagen');
  }
}

/** Chat mit Nachrichtenverlauf */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: string[];
}

export async function ollamaChatMessages(model: string, messages: ChatMessage[]): Promise<string> {
  try {
    if (typeof (window as any).puter === 'undefined') {
      throw new Error('Puter SDK nicht geladen');
    }
    const puter = (window as any).puter;

    const response = await puter.ai.chat(messages, { model: 'gpt-4o-mini' });
    const reply = response?.message?.content || (typeof response === 'string' ? response : null);

    if (!reply) throw new Error('Keine Antwort erhalten');
    return reply;
  } catch (err: any) {
    console.error('Puter Chat Error:', err);
    throw new Error(err.message || 'Chat fehlgeschlagen');
  }
}

/** Bild generieren via Puter.js */
export async function generateImage(prompt: string): Promise<string> {
  try {
    if (typeof (window as any).puter === 'undefined') {
      throw new Error('Puter SDK nicht geladen');
    }
    const puter = (window as any).puter;

    // Puter uses txt2img for image generation
    const response = await puter.ai.txt2img(prompt);
    // Puter returns an image object/URL or DataURL depending on version
    // Usually it returns a Blob or DataURL. If it returns an <img> element, we might need to extract SRC.

    const src = response?.src || (typeof response === 'string' ? response : null);

    if (!src) throw new Error('Kein Bild generiert');
    return src;
  } catch (err: any) {
    console.error('Puter Image Error:', err);
    throw new Error('Bildgenerierung fehlgeschlagen');
  }
}

export const OLLAMA_BASE_URL = '/api';
