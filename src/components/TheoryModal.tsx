import React from 'react';
import { X, BookOpen, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import { Lesson, Module } from '../types';

interface TheoryModalProps {
  module: Module;
  lesson: Lesson;
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({
  module,
  lesson,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
            <BookOpen size={14} />
            <span>{module.titre.split(':')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{lesson.id}</span>
          </div>
          <h2 className="text-xl font-bold text-white pr-8">
            {lesson.titre}
          </h2>

          <div className="mt-3 bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
            <Target size={16} className="text-sky-400 mt-0.5 shrink-0" />
            <p className="text-xs sm:text-sm text-slate-200">
              <strong className="text-white">Objectif :</strong> {lesson.objectif}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          {/* Targeted Fingers */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Doigts cibles à mobiliser
            </h3>
            <div className="flex flex-wrap gap-2">
              {lesson.doigts_cibles.map((finger, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  {finger}
                </span>
              ))}
            </div>
          </div>

          {/* Placement */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
            <h3 className="font-semibold text-sky-300 flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Positionnement pas-à-pas des mains</span>
            </h3>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              {lesson.guide_theorique.placement.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-sky-400 font-mono">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tactile bumps */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <h3 className="font-semibold text-amber-300">
              Repères tactiles des ergots (F et J)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lesson.guide_theorique.reperes_tactiles}
            </p>
          </div>

          {/* Golden Rules */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
            <h3 className="font-semibold text-emerald-300">
              Règles d'or de la mémoire proprioceptive
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {lesson.guide_theorique.regles_or.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Speed tip */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-semibold text-violet-300">
              Astuce de vélocité
            </h3>
            <p className="text-xs text-slate-300 italic">
              "{lesson.guide_theorique.astuce_vitesse}"
            </p>
          </div>
        </div>

        {/* Modal Close Button */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white transition-colors"
          >
            Fermer et continuer l'exercice
          </button>
        </div>
      </div>
    </div>
  );
};
