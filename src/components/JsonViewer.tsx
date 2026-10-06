import React, { useState } from 'react';
import { coursesData } from '../data/coursesData';
import { Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';

export const JsonViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'full' | 'summary'>('full');

  const jsonString = JSON.stringify(coursesData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'courses.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Compute curriculum stats
  const totalModules = coursesData.modules.length;
  const totalLessons = coursesData.modules.reduce((acc, m) => acc + m.lecons.length, 0);
  const totalExercises = coursesData.modules.reduce(
    (acc, m) => acc + m.lecons.reduce((lAcc, l) => lAcc + l.exercices.length, 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono mb-1">
            <FileCode size={14} />
            <span>Format Données : courses.json</span>
            <span aria-hidden="true">·</span>
            <span>100% Autonome & Exportable</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Structure Complète des Cours (JSON)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Données brutes prêtes pour intégration directe dans toute application web, mobile ou PWA hors-ligne.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-all shadow-sm"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Copié !' : 'Copier le JSON'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white transition-all shadow-md shadow-sky-500/10"
          >
            <Download size={14} />
            <span>Télécharger courses.json</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 block">Modules d'apprentissage</span>
          <span className="text-xl font-bold font-mono text-white tabular-nums">{totalModules}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 block">Leçons détaillées</span>
          <span className="text-xl font-bold font-mono text-white tabular-nums">{totalLessons}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 block">Exercices pratiques</span>
          <span className="text-xl font-bold font-mono text-white tabular-nums">{totalExercises}</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
          <span className="text-[11px] text-slate-400 block">Mode de stockage</span>
          <span className="text-xs font-semibold text-emerald-400 block mt-1">100% Offline / Standalone</span>
        </div>
      </div>

      {/* View Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveView('full')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeView === 'full'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            JSON Complet ({Math.round(jsonString.length / 1024)} Ko)
          </button>
          <button
            onClick={() => setActiveView('summary')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeView === 'summary'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Schéma & Structure Type
          </button>
        </div>

        <span className="text-xs text-slate-500 font-mono">
          courses.json (UTF-8)
        </span>
      </div>

      {/* Code Display Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 overflow-hidden shadow-2xl">
        {activeView === 'full' ? (
          <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto max-h-[600px] select-all">
            <code>{jsonString}</code>
          </pre>
        ) : (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <h3 className="font-bold text-white mb-2 text-sm">Exemple d'exercice extrait du fichier :</h3>
              <pre className="font-mono text-sky-300 overflow-x-auto">
{`{
  "id": "mod1_lec1_ex1",
  "type": "repetition",
  "title": "Guidage lent : Frappes isolées F et J",
  "instruction": "Place tes index sur les ergots de F et J. Tape chaque lettre sans regarder le clavier.",
  "target_wpm": 15,
  "min_accuracy": 95,
  "content": "ffff jjjj ff jj fj fj fff jjj fjfj f j f j ffjj jjff fff jjj fjf jfj"
}`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-white">Champs par Leçon :</h4>
              <ul className="space-y-1 list-disc list-inside text-slate-400">
                <li><code className="text-sky-300">id</code>: Identifiant unique (ex: mod1_lec1)</li>
                <li><code className="text-sky-300">titre</code>: Titre explicite</li>
                <li><code className="text-sky-300">objectif</code>: En une phrase, la compétence maîtrisée</li>
                <li><code className="text-sky-300">doigts_cibles</code>: Liste exacte des doigts sollicités</li>
                <li><code className="text-sky-300">touches_etudiees</code>: Caractères introduits</li>
                <li><code className="text-sky-300">guide_theorique</code>: Placement pas-à-pas, repères tactiles d'ergots, règles d'or, astuces</li>
                <li><code className="text-sky-300">exercices</code>: Tableaux de 3 exercices minimum (Guidage lent, Mots courts, Phrases continues)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
