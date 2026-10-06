import React, { useState } from 'react';
import { coursesData } from '../data/coursesData';
import { Module, Lesson, Exercise, UserProgress } from '../types';
import { Play, Check, ChevronDown, ChevronRight, BookOpen, Target, Sparkles, Award } from 'lucide-react';

interface CoursesBrowserProps {
  onStartExercise: (moduleId: string, lessonId: string, exIndex: number) => void;
  userProgress: UserProgress;
}

export const CoursesBrowser: React.FC<CoursesBrowserProps> = ({
  onStartExercise,
  userProgress,
}) => {
  const [expandedModuleId, setExpandedModuleId] = useState<string>('mod1');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('mod1_lec1');

  const activeModule = coursesData.modules.find(m => m.id === expandedModuleId) || coursesData.modules[0];
  const activeLesson = activeModule.lecons.find(l => l.id === selectedLessonId) || activeModule.lecons[0];

  return (
    <div className="space-y-8">
      {/* Hero / Header presentation */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs text-sky-400 font-medium mb-1">
          <BookOpen size={14} />
          <span>Curriculum Pédagogique Officiel</span>
          <span aria-hidden="true">·</span>
          <span>100% Fonctionnel Hors-Ligne</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Cours & Exercices de Dactylographie
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
          {coursesData.description_globale}
        </p>
      </div>

      {/* Main 2-column Layout: Module & Lessons selector on left, In-depth content on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Modules & Lessons Navigator */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Modules d'apprentissage
          </h2>

          <div className="space-y-3">
            {coursesData.modules.map((mod: Module) => {
              const isExpanded = expandedModuleId === mod.id;
              const completedCount = mod.lecons.reduce((acc, lec) => {
                const count = lec.exercices.filter(ex => !!userProgress.completedExercises[ex.id]).length;
                return acc + count;
              }, 0);
              const totalExercises = mod.lecons.reduce((acc, lec) => acc + lec.exercices.length, 0);

              return (
                <div
                  key={mod.id}
                  className={`border rounded-xl transition-all ${
                    isExpanded
                      ? 'bg-slate-900 border-sky-500/40 shadow-lg shadow-sky-950/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Module Accordion Header */}
                  <button
                    onClick={() => {
                      setExpandedModuleId(mod.id);
                      if (mod.lecons.length > 0) {
                        setSelectedLessonId(mod.lecons[0].id);
                      }
                    }}
                    className="w-full p-4 text-left flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <span>{mod.niveau}</span>
                        <span aria-hidden="true">·</span>
                        <span>{mod.duree_estimee}</span>
                        <span aria-hidden="true">·</span>
                        <span>{completedCount}/{totalExercises} ex.</span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {mod.titre}
                      </h3>
                    </div>
                    <div className="p-1 rounded text-slate-400 mt-1">
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  </button>

                  {/* Lessons list inside module */}
                  {isExpanded && (
                    <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 space-y-1.5">
                      {mod.lecons.map((lec: Lesson) => {
                        const isLessonSelected = selectedLessonId === lec.id;
                        const lecCompletedEx = lec.exercices.filter(
                          ex => !!userProgress.completedExercises[ex.id]
                        ).length;
                        const isLecAllDone = lecCompletedEx === lec.exercices.length;

                        return (
                          <button
                            key={lec.id}
                            onClick={() => setSelectedLessonId(lec.id)}
                            className={`w-full p-2.5 rounded-lg text-left text-xs transition-all flex items-center justify-between gap-2 ${
                              isLessonSelected
                                ? 'bg-sky-500/20 text-white font-medium border border-sky-500/30'
                                : 'text-slate-300 hover:bg-slate-800/80'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isLecAllDone ? (
                                <Check size={14} className="text-emerald-400 shrink-0" />
                              ) : (
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                              )}
                              <span className="truncate">{lec.titre}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                              {lecCompletedEx}/{lec.exercices.length}
                            </span>
                          </button>
                        );
                      })}

                      {/* Module Evaluation option if exists */}
                      {mod.evaluation_module && (
                        <div className="pt-1.5 mt-1 border-t border-slate-800/60">
                          <button
                            onClick={() => onStartExercise(mod.id, mod.lecons[0].id, 0)}
                            className="w-full p-2 rounded-lg text-left text-xs bg-amber-500/10 border border-amber-500/30 text-amber-200 hover:bg-amber-500/20 transition-colors flex items-center justify-between"
                          >
                            <span className="flex items-center gap-1.5 font-medium">
                              <Award size={14} className="text-amber-400" />
                              <span>Évaluation : {mod.evaluation_module.title}</span>
                            </span>
                            <Play size={12} className="text-amber-400" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Lesson Viewer */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Lesson Header */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
              <span>{activeLesson.id}</span>
              <span aria-hidden="true">·</span>
              <span>{activeModule.titre.split(':')[0]}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {activeLesson.titre}
            </h2>
            <div className="mt-3 bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 flex items-start gap-2.5">
              <Target size={16} className="text-sky-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">Objectif pédagogique</span>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  {activeLesson.objectif}
                </p>
              </div>
            </div>
          </div>

          {/* Targeted Fingers list */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Doigts cibles sollicités
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeLesson.doigts_cibles.map((finger, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 px-3 py-2 rounded-lg border border-slate-800/90 text-xs text-slate-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>{finger}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Theoretical Guide Section */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Sparkles size={16} className="text-amber-400" />
              <span>Guide Théorique & Positionnement Hors-Ligne</span>
            </div>

            {/* Step-by-step hand placement */}
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-sky-300 uppercase tracking-wide">
                1. Placement anatomique des mains
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeLesson.guide_theorique.placement.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-mono mt-0.5 shrink-0">·</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tactile bumps / Sensory feedback */}
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-1.5">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wide">
                2. Repères tactiles & Ergots
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeLesson.guide_theorique.reperes_tactiles}
              </p>
            </div>

            {/* Golden rules */}
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide">
                3. Règles d'or de la dactylographie
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeLesson.guide_theorique.regles_or.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 shrink-0">✓</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Speed tip */}
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-violet-300 uppercase tracking-wide">
                4. Astuce de vélocité
              </span>
              <p className="text-xs text-slate-300 italic">
                "{activeLesson.guide_theorique.astuce_vitesse}"
              </p>
            </div>
          </div>

          {/* Practical Exercises List */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Séries d'exercices pratiques ({activeLesson.exercices.length})</span>
              <span className="text-xs font-normal text-slate-400">Prêt pour le moteur de frappe</span>
            </h3>

            <div className="space-y-2.5">
              {activeLesson.exercices.map((ex: Exercise, exIdx: number) => {
                const stats = userProgress.completedExercises[ex.id];
                const typeLabel =
                  ex.type === 'repetition'
                    ? 'Guidage lent'
                    : ex.type === 'words'
                    ? 'Mots courts'
                    : ex.type === 'sentences'
                    ? 'Phrases continues'
                    : 'Évaluation';

                return (
                  <div
                    key={ex.id}
                    className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-0.5">
                        <span className="font-semibold text-sky-400">{typeLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">Cible : {ex.target_wpm} MPM</span>
                        <span aria-hidden="true">·</span>
                        <span>Précision : {ex.min_accuracy}%</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">
                        {ex.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {ex.instruction}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {stats && (
                        <div className="text-right mr-2">
                          <span className="text-xs font-mono font-bold text-emerald-400 tabular-nums">
                            {stats.wpm} MPM
                          </span>
                          <span className="text-[10px] text-slate-400 block tabular-nums">
                            {stats.accuracy}%
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => onStartExercise(activeModule.id, activeLesson.id, exIdx)}
                        className="py-1.5 px-3 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-sky-500/10 transition-all"
                      >
                        <Play size={12} />
                        <span>S'entraîner</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
