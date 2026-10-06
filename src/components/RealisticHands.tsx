import React from 'react';
import { FINGERS, getKeyMotionInfo } from '../data/keyboardLayouts';
import { LayoutType, FingerId } from '../types';

interface RealisticHandsProps {
  targetChar?: string;
  lastCharTyped?: string;
  keyStrokeId?: number;
  lastCharCorrect?: boolean;
  layout: LayoutType;
}

export const RealisticHands: React.FC<RealisticHandsProps> = ({
  targetChar,
  lastCharTyped,
  keyStrokeId = 0,
  lastCharCorrect = true,
  layout,
}) => {
  const motionInfo = targetChar ? getKeyMotionInfo(targetChar, layout) : null;
  const activeFingerId = motionInfo?.finger;

  // Render an articulated finger with fluid kinematic spring movement
  const renderFinger = (
    fingerId: FingerId,
    name: string,
    hand: 'left' | 'right',
    restingHeight: number, // base height in px
    restingWidth: number,
    baseAngle: number, // slight natural outward angle
    isErgotHome: boolean = false
  ) => {
    const isActive = activeFingerId === fingerId;
    const isJustTapped = lastCharTyped && motionInfo?.finger === fingerId;
    const fingerInfo = FINGERS[fingerId];

    // Calculate dynamic motion translation
    const deltaY = isActive ? motionInfo?.deltaY || 0 : 0;
    const deltaX = isActive ? motionInfo?.deltaX || 0 : 0;

    return (
      <div
        key={fingerId}
        className={`relative flex flex-col items-center origin-bottom select-none ${
          isJustTapped ? 'animate-finger-tap' : ''
        }`}
        style={{
          transform: `translate(${deltaX}px, ${deltaY}px) rotate(${baseAngle}deg) ${
            isActive ? 'scaleY(1.05)' : 'scaleY(1)'
          }`,
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Dynamic target letter indicator guide */}
        {isActive && (
          <div
            className="absolute -top-8 sm:-top-10 flex flex-col items-center pointer-events-none z-30 transition-all duration-150"
            style={{ color: fingerInfo.color }}
          >
            <span
              className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 border shadow-xl backdrop-blur-sm"
              style={{
                borderColor: fingerInfo.color,
                boxShadow: `0 0 12px ${fingerInfo.color}50`,
              }}
            >
              {targetChar === ' ' ? 'Espace' : targetChar}
            </span>
            <div
              className="w-0.5 rounded-full animate-guide-beam"
              style={{ backgroundColor: fingerInfo.color }}
            />
          </div>
        )}

        {/* Fingertip & Nail Container */}
        <div
          className={`relative rounded-t-full border flex flex-col items-center justify-start pt-1.5 transition-all duration-150 ${
            isActive
              ? 'ring-2 ring-white/80 z-20 shadow-xl'
              : 'border-slate-700/80 bg-gradient-to-b from-slate-750 to-slate-800'
          }`}
          style={{
            width: `${restingWidth}px`,
            height: `${restingHeight}px`,
            backgroundColor: isActive ? fingerInfo.color : '#1e293b',
            borderColor: isActive ? '#ffffff' : '#334155',
            boxShadow: isActive
              ? `0 0 25px ${fingerInfo.color}90, inset 0 0 8px rgba(255,255,255,0.4)`
              : undefined,
          }}
        >
          {/* Animated Tap Ripple on Keypress */}
          {isJustTapped && (
            <span
              key={`hand-ripple-${keyStrokeId}`}
              className={`animate-key-shockwave absolute inset-0 rounded-t-full pointer-events-none ring-2 ${
                lastCharCorrect ? 'ring-emerald-400 bg-emerald-400/25' : 'ring-rose-400 bg-rose-400/25'
              }`}
            />
          )}

          {/* Nail highlight */}
          <div
            className={`w-3/5 h-2.5 sm:h-3 rounded-t-full transition-all ${
              isActive ? 'bg-white/50' : 'bg-slate-600/40'
            }`}
          />

          {/* Phalanx crease 1 */}
          <div className="w-4/5 h-[1px] bg-slate-600/30 my-auto" />

          {/* Ergot bump marker on F & J */}
          {isErgotHome && (
            <div
              className="w-3.5 h-1 rounded-full bg-slate-200 shadow-sm mt-auto mb-1.5"
              title="Ergot tactile d'ancrage (F ou J)"
            />
          )}

          {/* Phalanx crease 2 */}
          <div className="w-3/4 h-[1px] bg-slate-600/20 mb-1" />
        </div>

        {/* Label beneath finger */}
        <span
          className={`text-[9px] sm:text-[10px] mt-1 font-medium transition-colors ${
            isActive ? 'font-bold' : 'text-slate-500'
          }`}
          style={{ color: isActive ? fingerInfo.color : undefined }}
        >
          {name}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full bg-slate-950 border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden select-none">
      {/* Background ambient grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

      {/* Top Header of the Hands Deck */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
          <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
            Position & Mouvements Dynamiques des Mains (Style AgileFingers)
          </h3>
        </div>

        {/* Active Finger State Badge */}
        {motionInfo ? (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Doigt actif :</span>
            <span
              className="px-2.5 py-1 rounded-lg font-semibold text-white shadow-sm flex items-center gap-1.5"
              style={{ backgroundColor: FINGERS[motionInfo.finger].color }}
            >
              <span>{FINGERS[motionInfo.finger].name}</span>
              <span className="bg-black/30 px-1.5 py-0.2 rounded font-mono text-[11px]">
                {targetChar === ' ' ? 'Espace' : targetChar}
              </span>
            </span>
          </div>
        ) : (
          <span className="text-xs text-slate-400">
            Mains au repos sur la ligne de repos (F et J)
          </span>
        )}
      </div>

      {/* Interactive Hands Arena (Two anatomical hands positioned beneath keyboard columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-3 pb-1 relative z-10">
        {/* ================= LEFT HAND ================= */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            <span>Main Gauche</span>
            <span className="text-[10px] font-normal text-slate-400 font-mono">(Q S D F)</span>
          </div>

          {/* Palm and Fingers Cluster */}
          <div className="relative flex items-end justify-center gap-2 sm:gap-3.5 px-4 pt-11 pb-6 bg-slate-900/50 rounded-2xl border border-slate-800/80 shadow-inner w-full max-w-[360px]">
            {/* Left Pinky (Q/A) */}
            {renderFinger('left_pinky', 'Auri.', 'left', 52, 22, -6)}

            {/* Left Ring (S) */}
            {renderFinger('left_ring', 'Annu.', 'left', 64, 23, -2)}

            {/* Left Middle (D) */}
            {renderFinger('left_middle', 'Maj.', 'left', 72, 24, 0)}

            {/* Left Index (F - ergot) */}
            {renderFinger('left_index', 'Index', 'left', 64, 24, 3, true)}

            {/* Left Thumb (Space) */}
            {renderFinger('thumb', 'Pouce', 'left', 42, 26, 18)}

            {/* Natural Palm Base outline */}
            <div className="absolute -bottom-1 left-4 right-4 h-6 bg-gradient-to-t from-slate-900 to-transparent rounded-b-2xl pointer-events-none" />
          </div>

          {/* Ergot note for Left Index */}
          <span className="text-[10px] text-slate-400 mt-2 font-mono">
            Index posé sur l'ergot de F
          </span>
        </div>

        {/* ================= RIGHT HAND ================= */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            <span>Main Droite</span>
            <span className="text-[10px] font-normal text-slate-400 font-mono">(J K L M/;)</span>
          </div>

          {/* Palm and Fingers Cluster */}
          <div className="relative flex items-end justify-center gap-2 sm:gap-3.5 px-4 pt-11 pb-6 bg-slate-900/50 rounded-2xl border border-slate-800/80 shadow-inner w-full max-w-[360px]">
            {/* Right Thumb (Space) */}
            {renderFinger('thumb', 'Pouce', 'right', 42, 26, -18)}

            {/* Right Index (J - ergot) */}
            {renderFinger('right_index', 'Index', 'right', 64, 24, -3, true)}

            {/* Right Middle (K) */}
            {renderFinger('right_middle', 'Maj.', 'right', 72, 24, 0)}

            {/* Right Ring (L) */}
            {renderFinger('right_ring', 'Annu.', 'right', 64, 23, 2)}

            {/* Right Pinky (M / ;) */}
            {renderFinger('right_pinky', 'Auri.', 'right', 52, 22, 6)}

            {/* Natural Palm Base outline */}
            <div className="absolute -bottom-1 left-4 right-4 h-6 bg-gradient-to-t from-slate-900 to-transparent rounded-b-2xl pointer-events-none" />
          </div>

          {/* Ergot note for Right Index */}
          <span className="text-[10px] text-slate-400 mt-2 font-mono">
            Index posé sur l'ergot de J
          </span>
        </div>
      </div>

      {/* Movement Description Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Animation motrice continue : les doigts s'étirent et s'abaissent en rythme selon la rangée de la touche ciblée.</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Haut : extension</span>
          <span aria-hidden="true">·</span>
          <span>Bas : flexion</span>
          <span aria-hidden="true">·</span>
          <span>Centre : extension latérale</span>
        </div>
      </div>
    </div>
  );
};
