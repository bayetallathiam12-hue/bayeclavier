import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, ArrowRight, CheckCircle2, Trophy, Star, ChevronLeft, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';
import { Exercise, Lesson, Module, LayoutType, ExerciseStats } from '../types';
import { soundManager } from '../utils/sound';
import { VirtualKeyboard } from './VirtualKeyboard';
import { RealisticHands } from './RealisticHands';

interface TypingEngineProps {
  currentModule: Module;
  currentLesson: Lesson;
  currentExercise: Exercise;
  exerciseIndex: number;
  layout: LayoutType;
  onNextExercise: () => void;
  onPrevExercise: () => void;
  onSelectLesson: (moduleId: string, lessonId: string, exIndex?: number) => void;
  onSaveProgress: (exerciseId: string, stats: ExerciseStats) => void;
  onOpenTheory: () => void;
}

export const TypingEngine: React.FC<TypingEngineProps> = ({
  currentModule,
  currentLesson,
  currentExercise,
  exerciseIndex,
  layout,
  onNextExercise,
  onPrevExercise,
  onSelectLesson,
  onSaveProgress,
  onOpenTheory,
}) => {
  // Select content according to layout
  const rawText = layout === 'qwerty' && currentExercise.content_qwerty
    ? currentExercise.content_qwerty
    : currentExercise.content;

  const [inputIndex, setInputIndex] = useState(0);
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastCharTyped, setLastCharTyped] = useState<string | undefined>(undefined);
  const [keyStrokeId, setKeyStrokeId] = useState(0);
  const [lastCharCorrect, setLastCharCorrect] = useState(true);
  const [hasErrorOnCurrent, setHasErrorOnCurrent] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Reset state when exercise changes
  const resetExercise = useCallback(() => {
    setInputIndex(0);
    setTypedChars([]);
    setErrorCount(0);
    setStartTime(null);
    setEndTime(null);
    setElapsedSeconds(0);
    setIsCompleted(false);
    setLastCharTyped(undefined);
    setKeyStrokeId(0);
    setLastCharCorrect(true);
    setHasErrorOnCurrent(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // Focus container
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    resetExercise();
  }, [currentExercise.id, layout, resetExercise]);

  // Timer runner
  useEffect(() => {
    if (startTime && !endTime) {
      timerRef.current = window.setInterval(() => {
        const seconds = (Date.now() - startTime) / 1000;
        setElapsedSeconds(Math.max(1, Math.floor(seconds)));
      }, 500);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime, endTime]);

  // Handle character input
  const handleKeyInput = useCallback((key: string) => {
    if (isCompleted) return;

    // Handle backspace
    if (key === 'Backspace') {
      if (inputIndex > 0) {
        setInputIndex(prev => prev - 1);
        setTypedChars(prev => prev.slice(0, prev.length - 1));
        setHasErrorOnCurrent(false);
        soundManager.playKeyClick();
      }
      return;
    }

    // Ignore multi-char meta keys (Shift, Ctrl, Alt, CapsLock)
    if (key.length > 1) return;

    // Start timer on first keystroke
    let activeStartTime = startTime;
    if (!startTime) {
      const now = Date.now();
      setStartTime(now);
      activeStartTime = now;
    }

    const expectedChar = rawText[inputIndex];
    setLastCharTyped(key);
    setKeyStrokeId(prev => prev + 1);

    const isMatch = key === expectedChar;
    setLastCharCorrect(isMatch);

    if (isMatch) {
      soundManager.playKeyClick();
      setHasErrorOnCurrent(false);
    } else {
      soundManager.playError();
      setErrorCount(prev => prev + 1);
      setHasErrorOnCurrent(true);
    }

    const nextIndex = inputIndex + 1;
    const newTyped = [...typedChars, key];
    setInputIndex(nextIndex);
    setTypedChars(newTyped);

    // Check completion
    if (nextIndex >= rawText.length) {
      const completionTime = Date.now();
      setEndTime(completionTime);
      setIsCompleted(true);
      if (timerRef.current) clearInterval(timerRef.current);

      soundManager.playSuccess();

      // Compute statistics
      const totalTimeSec = Math.max(1, (completionTime - (activeStartTime || completionTime)) / 1000);
      const totalWords = rawText.length / 5;
      const minutes = totalTimeSec / 60;
      const wpm = Math.round(totalWords / minutes);
      const cpm = Math.round((rawText.length / totalTimeSec) * 60);
      const totalKeystrokes = rawText.length + errorCount + (isMatch ? 0 : 1);
      const accuracy = Math.max(0, Math.round(((rawText.length) / totalKeystrokes) * 100));

      let stars = 1;
      if (accuracy >= currentExercise.min_accuracy && wpm >= currentExercise.target_wpm) {
        stars = 3;
      } else if (accuracy >= 90) {
        stars = 2;
      }

      const finalStats: ExerciseStats = {
        wpm,
        cpm,
        accuracy,
        errors: errorCount + (isMatch ? 0 : 1),
        elapsedTime: Math.round(totalTimeSec),
        completedAt: new Date().toISOString(),
        stars,
      };

      onSaveProgress(currentExercise.id, finalStats);
    }
  }, [inputIndex, isCompleted, startTime, rawText, typedChars, errorCount, currentExercise, onSaveProgress]);

  // Global keydown handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture shortcuts with Ctrl/Cmd or Alt
      if (e.ctrlKey || e.metaKey || (e.altKey && e.key !== 'AltGraph')) return;
      if (e.key === 'Tab') {
        e.preventDefault();
        return;
      }
      if (e.key === ' ' || e.key === 'Backspace' || e.key.length === 1) {
        e.preventDefault();
        handleKeyInput(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyInput]);

  // Real-time calculations
  const totalTyped = typedChars.length;
  const progressPercent = Math.min(100, Math.round((totalTyped / rawText.length) * 100));
  const currentMinutes = Math.max(0.01, elapsedSeconds / 60);
  const liveWpm = startTime ? Math.round((totalTyped / 5) / currentMinutes) : 0;
  const liveCpm = startTime ? Math.round(totalTyped / currentMinutes) : 0;
  const totalStrokes = totalTyped + errorCount;
  const liveAccuracy = totalStrokes > 0 ? Math.min(100, Math.round((totalTyped / totalStrokes) * 100)) : 100;

  const targetChar = inputIndex < rawText.length ? rawText[inputIndex] : undefined;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="outline-none focus:ring-1 focus:ring-sky-500/20 rounded-2xl transition-all"
    >
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{currentModule.titre.split(':')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{currentLesson.titre.split(':')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>Exercice {exerciseIndex + 1}/{currentLesson.exercices.length}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
            {currentExercise.title}
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTheory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <BookOpen size={14} className="text-sky-400" />
            <span>Guide théorique</span>
          </button>

          <button
            onClick={resetExercise}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            title="Recommencer cet exercice"
          >
            <RotateCcw size={14} />
            <span>Recommencer</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={onPrevExercise}
              disabled={exerciseIndex === 0}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Exercice précédent"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={onNextExercise}
              disabled={exerciseIndex >= currentLesson.exercices.length - 1}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Exercice suivant"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Instruction text */}
      <div className="bg-sky-950/30 border border-sky-800/40 rounded-xl px-4 py-2.5 mb-5 flex items-start gap-2.5">
        <span className="text-sky-400 mt-0.5 shrink-0">💡</span>
        <p className="text-xs sm:text-sm text-sky-200/90 leading-relaxed">
          {currentExercise.instruction}
        </p>
      </div>

      {/* Live Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[11px] text-slate-400 block mb-0.5">Vitesse (MPM)</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              {liveWpm}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ {currentExercise.target_wpm}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[11px] text-slate-400 block mb-0.5">Précision</span>
          <div className="flex items-baseline gap-1">
            <span
              className={`text-2xl font-bold font-mono tabular-nums ${
                liveAccuracy >= currentExercise.min_accuracy ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {liveAccuracy}%
            </span>
            <span className="text-xs text-slate-400 font-mono">min {currentExercise.min_accuracy}%</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[11px] text-slate-400 block mb-0.5">Erreurs</span>
          <span
            className={`text-2xl font-bold font-mono tabular-nums ${
              errorCount === 0 ? 'text-slate-300' : 'text-rose-400'
            }`}
          >
            {errorCount}
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <span className="text-[11px] text-slate-400 block mb-0.5">Temps</span>
          <span className="text-2xl font-bold font-mono text-slate-300 tabular-nums">
            {elapsedSeconds}s
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 col-span-2 sm:col-span-1">
          <span className="text-[11px] text-slate-400 block mb-0.5">Progression</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-mono text-sky-400 tabular-nums">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-sky-500 h-full transition-all duration-150 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Typing Display Arena */}
      <div
        className={`relative bg-slate-950 border rounded-2xl p-6 sm:p-8 mb-6 shadow-2xl transition-all duration-150 ${
          hasErrorOnCurrent ? 'border-rose-500/70 shadow-rose-950/20' : 'border-slate-800'
        }`}
      >
        <div className="font-mono text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-wider break-words select-none">
          {rawText.split('').map((char, idx) => {
            let stateClass = 'text-slate-500';

            if (idx < inputIndex) {
              const wasMistake = typedChars[idx] !== char;
              stateClass = wasMistake ? 'text-rose-400 bg-rose-500/10' : 'text-emerald-400';
            } else if (idx === inputIndex) {
              stateClass = 'text-white bg-sky-500/30 ring-2 ring-sky-400 rounded-sm';
            }

            return (
              <span
                key={idx}
                className={`relative px-0.5 transition-colors duration-75 ${stateClass}`}
              >
                {char === ' ' ? '␣' : char}
                {idx === inputIndex && (
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-400 animate-pulse rounded-full" />
                )}
              </span>
            );
          })}
        </div>

        {/* Real-time Guidance Prompt */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>Tapez directement au clavier physique ou touchez les touches ci-dessous.</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Touche [Backspace] pour corriger</span>
            <span aria-hidden="true">·</span>
            <span>Ne regardez pas vos mains</span>
          </div>
        </div>
      </div>

      {/* Virtual Keyboard & Hands Console (Style AgileFingers) */}
      <div className="space-y-4 mb-8">
        {/* Virtual Keyboard with Framer Motion animations & keystroke feedback */}
        <VirtualKeyboard
          layout={layout}
          targetChar={targetChar}
          lastCharTyped={lastCharTyped}
          keyStrokeId={keyStrokeId}
          lastCharCorrect={lastCharCorrect}
          onKeyClick={handleKeyInput}
        />

        {/* Realistic Hands with Framer Motion physics positioned directly below the keyboard */}
        <RealisticHands
          targetChar={targetChar}
          lastCharTyped={lastCharTyped}
          keyStrokeId={keyStrokeId}
          lastCharCorrect={lastCharCorrect}
          layout={layout}
        />
      </div>

      {/* Exercise Completed Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-center">
            <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mx-auto mb-4">
              <Trophy size={32} />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">
              Exercice terminé !
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {currentExercise.title}
            </p>

            {/* Stars rating */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3].map(starIndex => {
                const earned = liveAccuracy >= currentExercise.min_accuracy && liveWpm >= currentExercise.target_wpm
                  ? true
                  : starIndex <= (liveAccuracy >= 90 ? 2 : 1);
                return (
                  <Star
                    key={starIndex}
                    size={28}
                    className={`transition-all ${
                      earned ? 'fill-amber-400 text-amber-400 scale-110' : 'text-slate-700'
                    }`}
                  />
                );
              })}
            </div>

            {/* Score cards */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-left">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Vitesse finale</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-bold font-mono text-white tabular-nums">
                    {liveWpm}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">MPM</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Cible : {currentExercise.target_wpm} MPM
                </span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Précision globale</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span
                    className={`text-2xl font-bold font-mono tabular-nums ${
                      liveAccuracy >= currentExercise.min_accuracy ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {liveAccuracy}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Cible : {currentExercise.min_accuracy}%
                </span>
              </div>
            </div>

            {/* Feedback message */}
            <div className="p-3 bg-slate-800/50 rounded-lg text-xs text-slate-300 mb-6 text-left border border-slate-800">
              {liveAccuracy >= currentExercise.min_accuracy && liveWpm >= currentExercise.target_wpm ? (
                <div className="flex items-start gap-2 text-emerald-300">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-400" />
                  <span>Objectif validé avec brio ! Mémoire motrice parfaitement installée.</span>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-amber-300">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-400" />
                  <span>Bon travail ! Pour obtenir 3 étoiles, refaites la série en stabilisant votre rythme sans vous précipiter.</span>
                </div>
              )}
            </div>

            {/* Modal actions */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={resetExercise}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw size={14} />
                <span>Recommencer</span>
              </button>

              <button
                onClick={() => {
                  setIsCompleted(false);
                  onNextExercise();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white shadow-lg shadow-sky-500/20 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Exercice suivant</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
