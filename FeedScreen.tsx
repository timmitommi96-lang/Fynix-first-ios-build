import { useState, useCallback, useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import { generateFeedFact, type AIFeedItem } from './lib/ai';
import { MASCOT, ICONS, FEED_CARDS } from './assets';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bookmark, Zap, HelpCircle, X, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function FeedScreen() {
  const { setScreen, user, preferences, addXP, removeXP, addSavedFact, savedFacts, getRoast, feed } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Quiz Modal State
  const [activeQuizItem, setActiveQuizItem] = useState<AIFeedItem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<'none' | 'correct' | 'wrong'>('none');
  const [quizFeedbackAI, setQuizFeedbackAI] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const index = Math.round(el.scrollTop / el.clientHeight);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleSave = (item: AIFeedItem) => {
    const isSaved = savedFacts.some((f) => f.title === item.title);
    if (isSaved) {
      toast('Bereits gespeichert!');
      return;
    }
    addSavedFact({
      category: item.category,
      title: item.title,
      content: item.content,
    });
    toast.success('Fakt gespeichert! 🔖');
  };

  const openQuiz = (item: AIFeedItem) => {
    setActiveQuizItem(item);
    setSelectedAnswer(null);
    setQuizResult('none');
  };

  const handleAnswer = async (idx: number) => {
    if (!activeQuizItem) return;
    setSelectedAnswer(idx);
    const correct = idx === activeQuizItem.quiz.correct;
    setQuizResult(correct ? 'correct' : 'wrong');

    if (correct) {
      addXP(25);
    } else {
      removeXP(5);
    }

    // Get AI Feedback
    import('./lib/ai').then(async ({ generateQuizFeedback }) => {
      const feedback = await generateQuizFeedback(
        activeQuizItem.quiz.question,
        activeQuizItem.quiz.options[idx],
        activeQuizItem.quiz.options[activeQuizItem.quiz.correct],
        correct,
        user?.roastLevel || 3,
        preferences.language
      );
      setQuizFeedbackAI(feedback);
    });
  };

  const closeQuiz = () => {
    setActiveQuizItem(null);
    setSelectedAnswer(null);
    setQuizResult('none');
    setQuizFeedbackAI('');
  };

  return (
    <div className="bg-black text-white h-dvh w-full relative overflow-hidden flex flex-col">
      {/* Header Overlay */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-5"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 20px)' }}>
        <button onClick={() => setScreen('home')} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
          <img src={ICONS.xp} alt="XP" className="w-5 h-5" />
          <span className="font-display font-bold">{user?.xp || 0} XP</span>
        </div>
      </div>

      {/* Full Screen Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scrollbar-hide bg-black"
      >
        {feed.map((item, idx) => {
          const isSaved = savedFacts.some((f) => f.title === item.title);

          return (
            <div
              key={idx}
              className="h-full w-full snap-start snap-always relative flex flex-col justify-end pb-20"
            >
              {/* V1: Fullscreen Background Card */}
              <div className="absolute inset-0 z-0">
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${idx % 2 === 0 ? 'oklch(0.55 0.25 285)' : 'oklch(0.6 0.22 285)'}, transparent 70%)`
                  }}
                />
              </div>

              <div className="absolute bottom-24 left-0 right-0 z-10 px-6 flex items-end justify-between w-full">
                {/* Content Area */}
                <div className="flex-1 max-w-[70%]">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full mb-4 text-xs font-display font-medium text-white/90">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    {item.category}
                  </div>
                  <h2 className="text-3xl font-display font-extrabold mb-4 leading-tight text-white drop-shadow-lg">
                    {item.title}
                  </h2>
                  <p className="text-lg leading-snug text-white/90 drop-shadow-md">
                    {item.content}
                  </p>
                </div>

                {/* Right Side Actions */}
                <div className="flex flex-col items-center gap-5 ml-4">
                  <button
                    onClick={() => handleSave(item)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 active:scale-95 transition-all hover:bg-white/20">
                      <Bookmark className={`w-7 h-7 ${isSaved ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
                    </div>
                    <span className="text-[11px] font-bold text-white/90 drop-shadow-md">Save</span>
                  </button>

                  <button
                    onClick={() => openQuiz(item)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center border border-white/20 active:scale-95 transition-all hover:brightness-110 shadow-lg shadow-primary/20">
                      <HelpCircle className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-[10px] font-bold text-white/80">Quiz</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {loadingMore && (
          <div className="h-dvh w-full snap-start snap-always relative flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="font-display text-white/70">Wissen wird geladen...</p>
            </div>
          </div>
        )}
      </div>

      {/* Quiz Modal Overlays the Feed */}
      <AnimatePresence>
        {activeQuizItem && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-between items-center p-5 pt-12 border-b border-white/10">
              <span className="font-display font-bold text-lg text-foreground">Quiz Time!</span>
              <button onClick={closeQuiz} className="p-2 bg-white/10 rounded-full active:scale-95">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-center">
              <h3 className="font-display text-2xl font-extrabold leading-tight mb-8 text-center text-foreground">
                {activeQuizItem.quiz.question}
              </h3>

              <div className="space-y-4 w-full max-w-sm mx-auto">
                {activeQuizItem.quiz.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isRight = idx === activeQuizItem.quiz.correct;

                  let bgClasses = 'bg-card border-border hover:border-primary/50 text-foreground';

                  if (selectedAnswer !== null) {
                    if (isRight) {
                      bgClasses = 'bg-green-500/20 border-green-500 text-green-400';
                    } else if (isSelected && !isRight) {
                      bgClasses = 'bg-red-500/20 border-red-500 text-red-400';
                    } else {
                      bgClasses = 'bg-card border-border opacity-50 text-foreground';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => selectedAnswer === null && handleAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 text-base font-medium transition-all active:scale-[0.98] ${bgClasses}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {quizResult !== 'none' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="mt-10 flex flex-col items-center"
                  >
                    <img
                      src={quizResult === 'correct' ? MASCOT.happy : MASCOT.crying}
                      alt="Fynix Result"
                      className="w-32 h-32 object-contain drop-shadow-2xl mb-4"
                    />
                    {quizFeedbackAI && (
                      <p className="max-w-xs text-center font-display font-bold text-foreground mb-6 bg-white/5 p-4 rounded-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
                        "{quizFeedbackAI}"
                      </p>
                    )}
                    <button
                      onClick={closeQuiz}
                      className="px-8 py-3 bg-primary text-primary-foreground font-display font-bold rounded-full active:scale-95 shadow-lg"
                    >
                      Weiter
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
}
