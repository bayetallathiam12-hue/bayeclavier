import React, { useEffect, useState } from 'react';
import { AZERTY_ROWS, QWERTY_ROWS, FINGERS, KeyDefinition } from '../data/keyboardLayouts';
import { LayoutType } from '../types';

interface VirtualKeyboardProps {
  layout: LayoutType;
  targetChar?: string;
  lastCharTyped?: string;
  keyStrokeId?: number;
  lastCharCorrect?: boolean;
  onKeyClick?: (char: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  layout,
  targetChar,
  lastCharTyped,
  keyStrokeId = 0,
  lastCharCorrect = true,
  onKeyClick,
}) => {
  const rows = layout === 'azerty' ? AZERTY_ROWS : QWERTY_ROWS;
  const normalizedTarget = targetChar ? targetChar.toLowerCase() : '';

  // Track active animated key for ripple & popup effect
  const [activePressedKey, setActivePressedKey] = useState<{
    code: string;
    char: string;
    correct: boolean;
    id: number;
  } | null>(null);

  useEffect(() => {
    if (!lastCharTyped || keyStrokeId === 0) return;

    // Find key code for lastCharTyped
    const lower = lastCharTyped.toLowerCase();
    let foundCode = '';
    for (const row of rows) {
      for (const k of row) {
        if (
          (lastCharTyped === ' ' && k.code === 'Space') ||
          k.primary.toLowerCase() === lower ||
          k.primary === lastCharTyped ||
          k.secondary === lastCharTyped ||
          k.altGr === lastCharTyped
        ) {
          foundCode = k.code;
          break;
        }
      }
      if (foundCode) break;
    }

    if (foundCode) {
      setActivePressedKey({
        code: foundCode,
        char: lastCharTyped === ' ' ? '␣' : lastCharTyped,
        correct: lastCharCorrect,
        id: keyStrokeId,
      });

      const timer = setTimeout(() => {
        setActivePressedKey(prev => (prev?.id === keyStrokeId ? null : prev));
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [keyStrokeId, lastCharTyped, lastCharCorrect, rows]);

  const isKeyTargeted = (key: KeyDefinition) => {
    if (!targetChar) return false;
    if (targetChar === ' ' && key.code === 'Space') return true;
    if (key.primary.toLowerCase() === normalizedTarget) return true;
    if (key.secondary && key.secondary.toLowerCase() === normalizedTarget) return true;
    if (key.altGr && key.altGr === targetChar) return true;
    return false;
  };

  const isKeyActivePressed = (key: KeyDefinition) => {
    return activePressedKey?.code === key.code;
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-5 shadow-2xl relative overflow-hidden select-none">
      {/* Visual header */}
      <div className="flex items-center justify-between mb-3 px-1 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-medium text-slate-300">
            Clavier Dynamique Réactif
          </span>
          <span className="text-slate-500 font-mono">({layout.toUpperCase()})</span>
        </div>
        {targetChar && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400">Prochaine frappe :</span>
            <span className="px-2 py-0.5 rounded font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
              {targetChar === ' ' ? 'Espace' : targetChar}
            </span>
          </div>
        )}
      </div>

      {/* Keyboard Matrix */}
      <div className="space-y-1.5 max-w-4xl mx-auto overflow-x-auto pb-1">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center min-w-[620px]">
            {row.map((key, keyIndex) => {
              const targeted = isKeyTargeted(key);
              const isPressed = isKeyActivePressed(key);
              const fingerInfo = FINGERS[key.finger];

              // Base width
              const widthClass = key.width ? key.width : 'w-9 sm:w-11 md:w-12';

              return (
                <button
                  key={`${rowIndex}-${keyIndex}-${key.code}`}
                  type="button"
                  onClick={() => onKeyClick && onKeyClick(key.primary)}
                  className={`relative h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-mono font-medium flex flex-col items-center justify-center transition-all duration-100 ease-out active:scale-95 active:translate-y-0.5 ${widthClass} ${
                    isPressed
                      ? activePressedKey?.correct
                        ? 'bg-emerald-500/30 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] translate-y-1 scale-95'
                        : 'bg-rose-500/30 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] translate-y-1 scale-95'
                      : targeted
                      ? 'text-white z-20 font-bold animate-target-pulse'
                      : 'bg-slate-800/90 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-750'
                  }`}
                  style={{
                    borderBottomWidth: '3px',
                    borderColor: isPressed
                      ? activePressedKey?.correct
                        ? '#10b981'
                        : '#f43f5e'
                      : targeted
                      ? fingerInfo.color
                      : undefined,
                    backgroundColor: targeted && !isPressed ? `${fingerInfo.color}25` : undefined,
                  }}
                >
                  {/* Floating iOS-style popover feedback on key press */}
                  {isPressed && (
                    <div
                      key={activePressedKey?.id}
                      className={`animate-key-popover absolute -top-1 pointer-events-none z-30 px-2 py-1 rounded-md text-xs font-bold font-mono shadow-2xl flex items-center justify-center border ${
                        activePressedKey?.correct
                          ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/30'
                          : 'bg-rose-600 text-white border-rose-400 shadow-rose-600/30'
                      }`}
                    >
                      {activePressedKey?.char}
                    </div>
                  )}

                  {/* Shockwave ripple ring on keystroke */}
                  {isPressed && (
                    <span
                      key={`ripple-${activePressedKey?.id}`}
                      className={`animate-key-shockwave absolute inset-0 rounded-lg pointer-events-none ring-2 ${
                        activePressedKey?.correct
                          ? 'ring-emerald-400 bg-emerald-400/25'
                          : 'ring-rose-400 bg-rose-400/25'
                      }`}
                    />
                  )}

                  {/* Secondary/Shift character */}
                  {key.secondary && (
                    <span className="text-[10px] text-slate-400 leading-none">
                      {key.secondary}
                    </span>
                  )}

                  {/* Primary character */}
                  <span
                    className={`leading-tight ${
                      targeted ? 'font-bold text-white' : ''
                    }`}
                  >
                    {key.primary}
                  </span>

                  {/* Ergot tactile on F and J */}
                  {key.isHome && (
                    <div
                      className="absolute bottom-1 w-3 sm:w-4 h-0.5 rounded-full bg-slate-400"
                      title="Ergot tactile d'ancrage"
                    />
                  )}

                  {/* Finger color dot indicator */}
                  <div
                    className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: fingerInfo.color,
                      opacity: targeted ? 1 : 0.6,
                      boxShadow: targeted ? `0 0 6px ${fingerInfo.color}` : undefined,
                    }}
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Finger Legend */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: FINGERS.left_pinky.color }} />
          <span>Auriculaire G</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: FINGERS.left_ring.color }} />
          <span>Annulaire G</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: FINGERS.left_middle.color }} />
          <span>Majeur G</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: FINGERS.left_index.color }} />
          <span>Index G (F)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: FINGERS.thumb.color }} />
          <span>Pouces (Espace)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: FINGERS.right_index.color }} />
          <span>Index D (J)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: FINGERS.right_middle.color }} />
          <span>Majeur D</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: FINGERS.right_ring.color }} />
          <span>Annulaire D</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: FINGERS.right_pinky.color }} />
          <span>Auriculaire D</span>
        </div>
      </div>
    </div>
  );
};
