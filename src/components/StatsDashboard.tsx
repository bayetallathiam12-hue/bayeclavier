import React from 'react';
import { coursesData } from '../data/coursesData';
import { UserProgress } from '../types';
import { Trophy, Star, Target, Zap, RotateCcw } from 'lucide-react';

interface StatsDashboardProps {
  userProgress: UserProgress;
  onResetProgress: () => void;
  onJumpToExercise: (moduleId: string, lessonId: string, exIndex: number) => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  userProgress,
  onResetProgress,
  onJumpToExercise,
}) => {
  const completedEntries = Object.values(userProgress.completedExercises);
  const totalCompleted = completedEntries.length;

  const totalExercises = coursesData.modules.reduce(
    (acc, m) => acc + m.lecons.reduce((lAcc, l) => lAcc + l.exercices.length, 0),
    0
  );

  const averageWpm = totalCompleted > 0
    ? Math.round(completedEntries.reduce((acc, item) => acc + item.wpm, 0) / totalCompleted)
    : 0;

  const averageAccuracy = totalCompleted > 0
    ? Math.round(completedEntries.reduce((acc, item) => acc + item.accuracy, 0) / totalCompleted)
    : 100;

  const totalStars = completedEntries.reduce((acc, item) => acc + item.stars, 0);
  const maxPossibleStars = totalExercises * 3;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-400 font-medium mb-1">
            <Trophy size={14} />
            <span>Tableau de Bord Personnel</span>
            <span aria-hidden="true">·</span>
            <span>Sauvegarde Locale 100% Hors-Ligne</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Progression & Performances
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Statistiques synchronisées en direct dans le navigateur sans compte ni réseau.
          </p>
        </div>

        {totalCompleted > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Voulez-vous réinitialiser toutes vos statistiques locales ?')) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-medium text-slate-400 hover:text-rose-400 hover:border-rose-900 transition-colors self-start sm:self-auto"
          >
            <RotateCcw size={13} />
            <span>Réinitialiser</span>
          </button>
        )}
      </div>

      {/* Global Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">Exercices</span>
            <Target size={14} className="text-sky-400" />
          </div>
          <span className="text-2xl font-bold font-mono text-white tabular-nums">
            {totalCompleted} <span className="text-xs text-slate-400 font-normal">/ {totalExercises}</span>
          </span>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-sky-400 h-full rounded-full"
              style={{ width: `${Math.round((totalCompleted / totalExercises) * 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">Vitesse moyenne</span>
            <Zap size={14} className="text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
              {averageWpm}
            </span>
            <span className="text-xs text-slate-400 font-mono">MPM</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Mots par minute</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">Précision moyenne</span>
            <Target size={14} className="text-emerald-400" />
          </div>
          <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            {averageAccuracy}%
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">Régularité de frappe</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">Étoiles acquises</span>
            <Star size={14} className="text-amber-400 fill-amber-400" />
          </div>
          <span className="text-2xl font-bold font-mono text-white tabular-nums">
            {totalStars} <span className="text-xs text-slate-400 font-normal">/ {maxPossibleStars}</span>
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">Rigueur technique</span>
        </div>
      </div>

      {/* Module by Module status */}
      <div className="space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-slate-400">
          Progression par Module
        </h2>

        <div className="space-y-3">
          {coursesData.modules.map(mod => {
            const modExercises = mod.lecons.flatMap(l => l.exercices);
            const modCompleted = modExercises.filter(ex => !!userProgress.completedExercises[ex.id]).length;
            const percent = Math.round((modCompleted / modExercises.length) * 100);

            return (
              <div
                key={mod.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{mod.niveau}</span>
                    <span aria-hidden="true">·</span>
                    <span>{mod.lecons.length} leçons</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {mod.titre}
                  </h3>
                  <div className="w-48 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-sky-400 h-full rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-base font-mono font-bold text-white tabular-nums">
                      {modCompleted} / {modExercises.length}
                    </span>
                    <span className="text-xs text-slate-400 block">{percent}% terminé</span>
                  </div>

                  <button
                    onClick={() => onJumpToExercise(mod.id, mod.lecons[0].id, 0)}
                    className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 border border-slate-700 transition-colors"
                  >
                    Ouvrir
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
