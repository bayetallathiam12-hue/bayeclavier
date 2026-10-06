import React from 'react';
import { getFingerForKey, FINGERS } from '../data/keyboardLayouts';
import { LayoutType, FingerId } from '../types';

interface HandsGuideProps {
  targetChar?: string;
  layout: LayoutType;
}

export const HandsGuide: React.FC<HandsGuideProps> = ({ targetChar, layout }) => {
  const currentFinger = targetChar ? getFingerForKey(targetChar, layout) : null;

  const isFingerActive = (fingerId: FingerId) => {
    return currentFinger?.id === fingerId;
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Visual Indicator text */}
      <div className="flex items-center gap-3">
        {currentFinger ? (
          <div className="flex items-center gap-2.5">
            <span
              className="w-3.5 h-3.5 rounded-full ring-2 ring-white/20 animate-pulse"
              style={{ backgroundColor: currentFinger.color }}
            />
            <div>
              <p className="text-xs text-slate-400">Doigt sollicité pour la touche suivante :</p>
              <p className="text-sm font-semibold text-white">
                {currentFinger.name}{' '}
                <span className="font-mono text-sky-400 font-bold ml-1">
                  [{targetChar === ' ' ? 'Espace' : targetChar}]
                </span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400">Positionnez vos 10 doigts sur la ligne de repos</p>
        )}
      </div>

      {/* SVG Hands Schematic */}
      <div className="flex items-center gap-6 select-none">
        {/* Main Gauche */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-semibold text-slate-400 mb-1 tracking-wider">Main Gauche</span>
          <div className="flex items-end gap-1 h-12 px-2 py-1 bg-slate-950/70 border border-slate-800 rounded-lg">
            {/* Auriculaire */}
            <div
              title="Auriculaire gauche"
              className={`w-2.5 rounded-t transition-all ${
                isFingerActive('left_pinky')
                  ? 'h-8 ring-2 ring-white scale-110 shadow-lg'
                  : 'h-6 bg-slate-700/60'
              }`}
              style={{
                backgroundColor: isFingerActive('left_pinky') ? FINGERS.left_pinky.color : undefined,
              }}
            />
            {/* Annulaire */}
            <div
              title="Annulaire gauche"
              className={`w-2.5 rounded-t transition-all ${
                isFingerActive('left_ring')
                  ? 'h-10 ring-2 ring-white scale-110 shadow-lg'
                  : 'h-8 bg-slate-700/60'
              }`}
              style={{
                backgroundColor: isFingerActive('left_ring') ? FINGERS.left_ring.color : undefined,
              }}
            />
            {/* Majeur */}
            <div
              title="Majeur gauche"
              className={`w-2.5 rounded-t transition-all ${
                isFingerActive('left_middle')
                  ? 'h-11 ring-2 ring-white scale-110 shadow-lg'
                  : 'h-9 bg-slate-700/60'
              }`}
              style={{
                backgroundColor: isFingerActive('left_middle') ? FINGERS.left_middle.color : undefined,
              }}
            />
            {/* Index (Ergot F) */}
            <div
              title="Index gauche (F)"
              className={`w-2.5 rounded-t transition-all relative ${
                isFingerActive('left_index')
                  ? 'h-9 ring-2 ring-white scale-110 shadow-lg'
                  : 'h-7 bg-slate-700/60'
              }`}
              style={{
                backgroundColor: isFingerActive('left_index') ? FINGERS.left_index.color : undefined,
              }}
            >
              <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-slate-400 rounded-full" />
            </div>
            {/* Pouce */}
            <div
              title="Pouce gauche"
              className={`w-3 rounded-t transition-all ml-1 ${
                isFingerActive('thumb') && currentFinger?.hand === 'left'
                  ? 'h-6 ring-2 ring-white scale-110'
                  : 'h-4 bg-slate-700/60'
              }`}
              style={{
                backgroundColor: isFingerActive('thumb') ? FINGERS.thumb.color : undefined,
              }}
            />
          </div>
        </div>

        {/* Main Droite */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-semibold text-slate-400 mb-1 tracking-wider">Main Droite</span>
          <div className="flex items-end gap-1 h-12 px-2 py-1 bg-slate-950/70 border border-slate-800 rounded-lg">
            {/* Pouce */}
            <div
              title="Pouce droit"
              className={`w-3 rounded-t transition-all mr-1 ${
                isFingerActive('thumb')
                  ? 'h-6 ring-2 ring-white scale-110'
                  : 'h-4 bg-slate-700/60'
              }`}
              style={{
                backgroundColor: isFingerActive('thumb') ? FINGERS.thumb.color : undefined,
              }}
            />
            {/* Index (Ergot J) */}
            <div
              title="Index droit (J)"
              className={`w-2.5 rounded-t transition-all relative ${
                isFingerActive('right_index')
                  ? 'h-9 ring-2 ring-white scale-110 shadow-lg'
                  : 'h-7 bg-slate-700/60'
              }`}
              style={{
                backgroundColor: isFingerActive('right_index') ? FINGERS.right_index.color : undefined,
              }}
            >
              <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-slate-400 rounded-full" />
            </div>
            {/* Majeur */}
            <div
              title="Majeur droit"
              className={`w-2.5 rounded-t transition-all ${
                isFingerActive('right_middle')
                  ? 'h-11 ring-2 ring-white scale-110 shadow-lg'
                  : 'h-9 bg-slate-700/60'
              }`}
              style={{
                backgroundColor: isFingerActive('right_middle') ? FINGERS.right_middle.color : undefined,
              }}
            />
            {/* Annulaire */}
            <div
              title="Annulaire droit"
              className={`w-2.5 rounded-t transition-all ${
                isFingerActive('right_ring')
                  ? 'h-10 ring-2 ring-white scale-110 shadow-lg'
                  : 'h-8 bg-slate-700/60'
              }`}
              style={{
                backgroundColor: isFingerActive('right_ring') ? FINGERS.right_ring.color : undefined,
              }}
            />
            {/* Auriculaire */}
            <div
              title="Auriculaire droit"
              className={`w-2.5 rounded-t transition-all ${
                isFingerActive('right_pinky')
                  ? 'h-8 ring-2 ring-white scale-110 shadow-lg'
                  : 'h-6 bg-slate-700/60'
              }`}
              style={{
                backgroundColor: isFingerActive('right_pinky') ? FINGERS.right_pinky.color : undefined,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
