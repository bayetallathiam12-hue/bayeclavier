import React from 'react';
import { ShieldCheck, Eye, Sparkles, CheckCircle, XCircle } from 'lucide-react';

export const PostureGuide: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs text-sky-400 font-medium mb-1">
          <ShieldCheck size={14} />
          <span>Ergonomie & Santé Dactylographique</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Guide Postural & Prévention des Tensions
        </h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Une dactylographie véloce et durable repose d'abord sur une posture corporelle irréprochable. Évitez les tendinites et développez une aisance naturelle grâce à ces repères fondamentaux.
        </p>
      </div>

      {/* Grid of Posture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Poignets et Mains */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-base">
            <Sparkles size={18} />
            <h2>1. Poignets Flottants & Voûte des Mains</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Vos mains doivent former une arche douce, comme si vous teniez une balle de tennis. Vos poignets ne doivent <strong className="text-white">jamais casser vers le bas</strong> ni reposer lourdement sur la table pendant la frappe : ils doivent flotter légèrement à l'horizontale.
          </p>
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-start gap-2 text-xs text-emerald-300">
              <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>Avant-bras aligné avec le plan du clavier (angle du coude ~90°).</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-rose-300">
              <XCircle size={14} className="mt-0.5 shrink-0 text-rose-400" />
              <span>Ne pliez jamais vos poignets vers l'extérieur pour atteindre des touches latérales.</span>
            </div>
          </div>
        </div>

        {/* Pillar 2: Regard & Écran */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-base">
            <Eye size={18} />
            <h2>2. La Règle d'Or du Regard</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pour développer la mémoire proprioceptive des 10 doigts, <strong className="text-white">votre regard ne doit JAMAIS quitter l'écran</strong>. Si vous baissez les yeux vers vos mains, vous réinitialisez le cycle d'apprentissage réflexe.
          </p>
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-start gap-2 text-xs text-emerald-300">
              <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>Haut de l'écran situé à hauteur des yeux pour soulager les cervicales.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-emerald-300">
              <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>Fiez-vous aux ergots de F et J pour vous réorienter les yeux fermés.</span>
            </div>
          </div>
        </div>

        {/* Pillar 3: Position Assise */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-base">
            <span className="text-lg">🪑</span>
            <h2>3. Ancrage Corporel & Siège</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Asseyez-vous le dos droit, appuyé contre le dossier de votre chaise. Les deux pieds doivent être posés à plat sur le sol (ou sur un repose-pieds). Les épaules sont détendues et abaissées.
          </p>
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-start gap-2 text-xs text-emerald-300">
              <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>Pieds à plat au sol, genoux à un angle de 90° à 100°.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-rose-300">
              <XCircle size={14} className="mt-0.5 shrink-0 text-rose-400" />
              <span>Ne croisez pas les jambes pendant l'entraînement de dactylographie.</span>
            </div>
          </div>
        </div>

        {/* Pillar 4: Rythme Respiratoire */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-base">
            <span className="text-lg">🫁</span>
            <h2>4. Respiration & Rythme Métronomique</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            La tension psychologique bloque la vélocité. Respirez calmement avec le ventre. Ne retenez pas votre respiration avant un mot difficile : ralentissez légèrement la cadence pour conserver une pulsation uniforme.
          </p>
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-start gap-2 text-xs text-emerald-300">
              <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>Pratiquez des sessions de 15 à 20 minutes par jour pour ancrer la mémoire.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-emerald-300">
              <CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>Secouez doucement vos poignets entre chaque module pour détendre les fascias.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
