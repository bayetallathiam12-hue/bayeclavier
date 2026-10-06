import React, { useState, useEffect } from 'react';
import { coursesData } from './data/coursesData';
import { LayoutType, UserProgress, ExerciseStats } from './types';
import { soundManager } from './utils/sound';
import { Header } from './components/Header';
import { TypingEngine } from './components/TypingEngine';
import { CoursesBrowser } from './components/CoursesBrowser';
import { PostureGuide } from './components/PostureGuide';
import { JsonViewer } from './components/JsonViewer';
import { StatsDashboard } from './components/StatsDashboard';
import { TheoryModal } from './components/TheoryModal';
import { BookOpen, Award, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'agile_fingers_progress_v1';

export default function App() {
  // Navigation & tabs
  const [activeTab, setActiveTab] = useState<'practice' | 'courses' | 'posture' | 'json' | 'stats'>('practice');

  // Course pointers
  const [currentModuleId, setCurrentModuleId] = useState<string>('mod1');
  const [currentLessonId, setCurrentLessonId] = useState<string>('mod1_lec1');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);

  // Settings
  const [layout, setLayout] = useState<LayoutType>('azerty');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Theory modal
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);

  // Progress state
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // Fallback default
      }
    }
    return {
      completedExercises: {},
      currentModuleId: 'mod1',
      currentLessonId: 'mod1_lec1',
      currentExerciseIndex: 0,
      layout: 'azerty',
      soundEnabled: true,
      theme: 'dark',
    };
  });

  // Sync sound manager
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Persist progress
  const saveProgress = (exerciseId: string, stats: ExerciseStats) => {
    setUserProgress(prev => {
      const updated: UserProgress = {
        ...prev,
        completedExercises: {
          ...prev.completedExercises,
          [exerciseId]: stats,
        },
        currentModuleId,
        currentLessonId,
        currentExerciseIndex,
        layout,
        soundEnabled,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // LocalStorage quota or privacy mode
      }
      return updated;
    });
  };

  const handleResetProgress = () => {
    const fresh: UserProgress = {
      completedExercises: {},
      currentModuleId: 'mod1',
      currentLessonId: 'mod1_lec1',
      currentExerciseIndex: 0,
      layout,
      soundEnabled,
      theme: 'dark',
    };
    setUserProgress(fresh);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  // Resolve current active data
  const currentModule = coursesData.modules.find(m => m.id === currentModuleId) || coursesData.modules[0];
  const currentLesson = currentModule.lecons.find(l => l.id === currentLessonId) || currentModule.lecons[0];
  const currentExercise = currentLesson.exercices[currentExerciseIndex] || currentLesson.exercices[0];

  // Exercise Navigation handlers
  const handleNextExercise = () => {
    if (currentExerciseIndex < currentLesson.exercices.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Move to next lesson
      const currentLessonIdx = currentModule.lecons.findIndex(l => l.id === currentLesson.id);
      if (currentLessonIdx < currentModule.lecons.length - 1) {
        const nextLesson = currentModule.lecons[currentLessonIdx + 1];
        setCurrentLessonId(nextLesson.id);
        setCurrentExerciseIndex(0);
      } else {
        // Move to next module
        const currentModIdx = coursesData.modules.findIndex(m => m.id === currentModule.id);
        if (currentModIdx < coursesData.modules.length - 1) {
          const nextMod = coursesData.modules[currentModIdx + 1];
          setCurrentModuleId(nextMod.id);
          setCurrentLessonId(nextMod.lecons[0].id);
          setCurrentExerciseIndex(0);
        }
      }
    }
  };

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    } else {
      // Move to previous lesson if possible
      const currentLessonIdx = currentModule.lecons.findIndex(l => l.id === currentLesson.id);
      if (currentLessonIdx > 0) {
        const prevLesson = currentModule.lecons[currentLessonIdx - 1];
        setCurrentLessonId(prevLesson.id);
        setCurrentExerciseIndex(prevLesson.exercices.length - 1);
      }
    }
  };

  const handleSelectLesson = (moduleId: string, lessonId: string, exIndex: number = 0) => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(lessonId);
    setCurrentExerciseIndex(exIndex);
    setActiveTab('practice');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        layout={layout}
        setLayout={setLayout}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Practice Mode */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Quick Curriculum Selector Drawer */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-medium">Sélecteur rapide :</span>
                {/* Module selection */}
                <select
                  value={currentModuleId}
                  onChange={e => {
                    const mod = coursesData.modules.find(m => m.id === e.target.value);
                    if (mod) {
                      setCurrentModuleId(mod.id);
                      setCurrentLessonId(mod.lecons[0].id);
                      setCurrentExerciseIndex(0);
                    }
                  }}
                  className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-sky-500 outline-none"
                >
                  {coursesData.modules.map(mod => (
                    <option key={mod.id} value={mod.id}>
                      {mod.titre.split(':')[0]}
                    </option>
                  ))}
                </select>

                {/* Lesson selection */}
                <select
                  value={currentLessonId}
                  onChange={e => {
                    setCurrentLessonId(e.target.value);
                    setCurrentExerciseIndex(0);
                  }}
                  className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-sky-500 outline-none max-w-[200px] truncate"
                >
                  {currentModule.lecons.map(lec => (
                    <option key={lec.id} value={lec.id}>
                      {lec.titre}
                    </option>
                  ))}
                </select>

                {/* Exercise buttons */}
                <div className="flex items-center gap-1">
                  {currentLesson.exercices.map((ex, exIdx) => {
                    const isDone = !!userProgress.completedExercises[ex.id];
                    const isCurrent = currentExerciseIndex === exIdx;
                    return (
                      <button
                        key={ex.id}
                        onClick={() => setCurrentExerciseIndex(exIdx)}
                        className={`w-6 h-6 rounded-md font-mono text-[11px] font-semibold transition-all ${
                          isCurrent
                            ? 'bg-sky-500 text-white shadow-sm ring-1 ring-sky-300'
                            : isDone
                            ? 'bg-emerald-950 border border-emerald-700 text-emerald-300 hover:bg-emerald-900'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                        title={ex.title}
                      >
                        {exIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Course info badge */}
              <div className="flex items-center gap-3 text-slate-400">
                <span className="hidden sm:inline">
                  Disposition : <strong className="text-white uppercase">{layout}</strong>
                </span>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="text-sky-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <BookOpen size={13} />
                  <span>Tous les cours</span>
                </button>
              </div>
            </div>

            {/* Interactive Engine */}
            <TypingEngine
              currentModule={currentModule}
              currentLesson={currentLesson}
              currentExercise={currentExercise}
              exerciseIndex={currentExerciseIndex}
              layout={layout}
              onNextExercise={handleNextExercise}
              onPrevExercise={handlePrevExercise}
              onSelectLesson={handleSelectLesson}
              onSaveProgress={saveProgress}
              onOpenTheory={() => setIsTheoryOpen(true)}
            />
          </div>
        )}

        {/* Courses & Exercises Textbook */}
        {activeTab === 'courses' && (
          <CoursesBrowser
            onStartExercise={handleSelectLesson}
            userProgress={userProgress}
          />
        )}

        {/* Posture & Ergonomics Guide */}
        {activeTab === 'posture' && <PostureGuide />}

        {/* Standalone JSON Export */}
        {activeTab === 'json' && <JsonViewer />}

        {/* Local Stats Dashboard */}
        {activeTab === 'stats' && (
          <StatsDashboard
            userProgress={userProgress}
            onResetProgress={handleResetProgress}
            onJumpToExercise={handleSelectLesson}
          />
        )}
      </main>

      {/* In-practice Theory Modal */}
      <TheoryModal
        module={currentModule}
        lesson={currentLesson}
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
      />

      {/* Footer conforming to Universal Design Constitution */}
      <footer className="border-t border-slate-900 bg-slate-950 text-xs text-slate-500 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Agile Fingers</span>
            <span aria-hidden="true">·</span>
            <span>Méthode de dactylographie 100% hors-ligne</span>
            <span aria-hidden="true">·</span>
            <span>4 Modules & 15 Leçons</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setActiveTab('practice')} className="hover:text-slate-200">
              Entraînement
            </button>
            <button onClick={() => setActiveTab('courses')} className="hover:text-slate-200">
              Curriculum
            </button>
            <button onClick={() => setActiveTab('json')} className="hover:text-slate-200">
              Export JSON
            </button>
            <button onClick={() => setActiveTab('posture')} className="hover:text-slate-200">
              Ergonomie
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
