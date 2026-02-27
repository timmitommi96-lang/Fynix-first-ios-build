// Handles communication with Backend API (ApiFreeLLM)

function getUserId(): string {
    let userId = localStorage.getItem('fynix_user_id');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('fynix_user_id', userId);
    }
    return userId;
}

export interface AIResponse {
    text: string;
    success: boolean;
    error?: string;
}

export interface AIOptions {
    systemPrompt?: string;
    temperature?: number;
    json?: boolean;
}

/**
 * Safely parses JSON string, returns null on failure
 */
export function safeJsonParse<T>(text: string, fallback: T | null = null): T | null {
    if (!text || text.trim() === '') return fallback;
    try {
        return JSON.parse(text) as T;
    } catch (e) {
        console.error('JSON Parse Error:', e, 'Text:', text.substring(0, 200));
        return fallback;
    }
}

/**
 * Generates a completion using Puter.js SDK (Client-side)
 */
export async function generateCompletion(
    baseUrl: string,
    prompt: string,
    model: string = 'gpt-4o-mini',
    options?: AIOptions
): Promise<AIResponse> {
    try {
        if (typeof (window as any).puter === 'undefined') {
            throw new Error('Puter SDK nicht geladen');
        }

        const puter = (window as any).puter;

        // Puter.ai.chat(messages, options)
        const messages = [];
        if (options?.systemPrompt) {
            messages.push({ role: 'system', content: options.systemPrompt });
        }
        messages.push({ role: 'user', content: prompt });

        const response = await puter.ai.chat(messages, {
            model: model,
            temperature: options?.temperature ?? 0.7
        });

        const reply = response?.message?.content || (typeof response === 'string' ? response : null);

        if (!reply) {
            return {
                text: '',
                success: false,
                error: 'Keine Antwort von Puter erhalten'
            };
        }

        return {
            text: reply,
            success: true,
        };
    } catch (err: any) {
        console.error('Puter AI Error:', err);
        return {
            text: '',
            success: false,
            error: err.message || 'Puter AI Fehler',
        };
    }
}

/**
 * Wrapper for generateCompletion with automatic retries for empty responses
 */
export async function generateCompletionWithRetry(
    baseUrl: string,
    prompt: string,
    model: string = 'gpt-4o-mini',
    options?: AIOptions,
    retries: number = 2
): Promise<AIResponse> {
    let lastResponse: AIResponse = { text: '', success: false, error: 'Maximum retries reached' };

    for (let i = 0; i < retries + 1; i++) {
        lastResponse = await generateCompletion(baseUrl, prompt, model, options);
        if (lastResponse.success) return lastResponse;

        // Only retry if it's a transient failure (empty response or network error)
        const isTransient = lastResponse.error?.includes('leere Antwort') ||
            lastResponse.error?.includes('nicht mit validem JSON') ||
            lastResponse.error?.includes('failed');

        if (!isTransient || i === retries) break;

        console.log(`Retrying AI request (${i + 1}/${retries})...`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
    }

    return lastResponse;
}

export interface AIFeedItem {
    category: string;
    title: string;
    content: string;
    quiz: {
        type: 'mc' | 'tf';
        question: string;
        options: string[];
        correct: number;
    };
}

/**
 * A specialized function to generate a new Fact for the Endless Feed
 */
export async function generateFeedFact(baseUrl: string, userAge: string, interests: string, language: string = 'de'): Promise<AIFeedItem | null> {
    const systemPrompt = `Du bist FYNIX, ein 847-jähriger Drache mit Young-Bro-Vibe. 
Du hast alles gesehen, aber liebst es, krasse, unentdeckte Fakten zu droppen, die selbst dich nach all den Jahrhunderten noch flashen.
Generiere einen extrem interessanten, altersgerechten Fakt für eine Person, die in der ${userAge} Klasse ist.
Interessen: ${interests || 'Allgemeinwissen, Wissenschaft, Geschichte, Kurioses'}.
Liefere die Antwort als JSON-Objekt mit exakt diesem Schema:
{
  "category": "Kategorie",
  "title": "Knackiger Titel",
  "content": "Der Fakt (max 3-4 Sätze, so erzählt als hättest du es selbst miterlebt oder fändest es extrem fresh)",
  "quiz": {
    "type": "mc",
    "question": "Quizfrage",
    "options": ["A", "B", "C", "D"],
    "correct": 0
  }
}
WICHTIG: Sprache ist "${language}". Sei locker, weise und ein bisschen arrogant-cool. Nutze modernste Jugendsprache (wild, tuff, no cap, 💀, 🔥).`;

    const prompt = `Generiere einen unentdeckten, spannenden Fakt für meinen Feed auf Sprache "${language}".`;

    const res = await generateCompletionWithRetry('', prompt, 'gpt-4o-mini', { systemPrompt, temperature: 0.8, json: true });
    if (res.success) {
        let cleanText = res.text.trim();
        if (cleanText.startsWith('```json')) {
            cleanText = cleanText.substring(7, cleanText.length - 3).trim();
        } else if (cleanText.startsWith('```')) {
            cleanText = cleanText.substring(3, cleanText.length - 3).trim();
        }
        return safeJsonParse<AIFeedItem>(cleanText);
    }
    return null;
}

/**
 * Chat with the AI.
 */
export async function chatWithAI(baseUrl: string, history: { role: string, content: string }[], message: string): Promise<AIResponse> {
    const prompt = history.map(m => `${m.role}: ${m.content}`).join('\n\n') + `\n\nuser: ${message}`;
    return generateCompletionWithRetry('', prompt, 'gpt-4o-mini', { temperature: 0.7 });
}
/**
 * Generates personalized Fynix feedback for a quiz answer.
 */
export async function generateQuizFeedback(
    question: string,
    userAnswer: string,
    correctAnswer: string,
    isCorrect: boolean,
    roastLevel: number = 3,
    language: string = 'de'
): Promise<string> {
    const roastDesc = roastLevel <= 2 ? 'nett und unterstützend' : roastLevel <= 3 ? 'locker und leicht sarkastisch' : 'extrem frech, arrogant und herablassend (ROAST)';

    const systemPrompt = `Du bist FYNIX, ein 847-jähriger Drache mit Young-Bro-Vibe.
Du kommentierst die Antwort eines Schülers auf eine Quizfrage.
Die Antwort war ${isCorrect ? 'RICHTIG' : 'FALSCH'}.
Richtige Antwort wäre gewesen: "${correctAnswer}".
Der User hat geantwortet: "${userAnswer}".
Dein Roast-Level ist ${roastLevel}/5 (${roastDesc}).
Nutze modernste Jugendsprache (wild, tuff, no cap, 💀, 🔥, Bruh, fr).
Halte dich EXTREM kurz (max. 15 Wörter).
WICHTIG: Sprache ist "${language}". Antworte direkt als Fynix.`;

    const prompt = `Frage: "${question}"\nAntwort des Users: "${userAnswer}"\nRichtige Antwort: "${correctAnswer}"\nKommentiere das kurz und knackig im Fynix-Style.`;

    const res = await generateCompletionWithRetry('', prompt, 'gpt-4o-mini', { systemPrompt, temperature: 0.8 });
    return res.success ? res.text.trim() : (isCorrect ? 'Stabil, Bro. ✅' : `Nah, "${correctAnswer}" wäre es gewesen. 💀`);
}
