/**
 * V1: KI-ähnliches Feedback pro Vokabel-Antwort, abhängig vom Roast-Level.
 * Lieb (1–2) bis frech (4–5). Personalisiert mit dem Begriff (z. B. "Elefant").
 * Lokal in der App, keine API – unendlich kostenlos nutzbar.
 */

export function getVocabFeedback(
  term: string,
  correct: boolean,
  roastLevel: number
): string {
  const level = roastLevel <= 2 ? 'mild' : roastLevel <= 3 ? 'medium' : 'hard';

  if (correct) {
    const correctMild = [
      'Ja Bro, passt. Hast dich wohl doch vorbereitet.',
      'Richtig. Hab ich schon vor 300 Jahren so gewusst.',
      'Stabil. Geht doch.',
    ];
    const correctMedium = [
      'Ganz okay für einen Sterblichen.',
      'Richtig. Hättest du das nicht gewusst, wär ich jetzt pennen gegangen.',
      'Nice. Endlich mal kein Zeitverlust hier.',
    ];
    const correctHard = [
      'Stimmt. Sogar ein blindes Huhn findet mal ein Korn, ne?',
      'Überraschend richtig. Ich bin fast ein bisschen stolz. Fast.',
      'Jo, korrekt. Nächstes Mal vielleicht was Schwereres?',
    ];
    const pool = level === 'mild' ? correctMild : level === 'medium' ? correctMedium : correctHard;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // Falsch – personalisiert mit Begriff wo sinnvoll
  const mild = [
    `"${term}"? Bruh... hast du überhaupt zugehört?`,
    'Fast. Aber "fast" hat noch nie Imperien gerettet.',
    'Nein. Denk nochmal scharf nach. Ich warte... (nicht ewig).',
  ];
  const medium = [
    `"${term}" ist falsch. Ich hab schon Dracheneier gesehen, die das besser wussten.`,
    'Daneben. Versuch es nochmal, bevor ich komplett einschlafe.',
    `Echt jetzt? "${term}"? Das ist 4. Klasse Niveau.`,
  ];
  const hard = [
    `Haha, keine Ahnung was "${term}" heißt? Peinlich, Bro.`,
    `"${term}" falsch zu haben ist echt eine Leistung. Leider keine gute.`,
    'Ich hab 800 Jahre Wissen im Kopf und du kriegst das nicht hin? Bruh.',
  ];
  const pool = level === 'mild' ? mild : level === 'medium' ? medium : hard;
  return pool[Math.floor(Math.random() * pool.length)];
}
