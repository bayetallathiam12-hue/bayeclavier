import { FingerId, FingerInfo, LayoutType } from '../types';

export const FINGERS: Record<FingerId, FingerInfo> = {
  left_pinky: { id: 'left_pinky', name: 'Auriculaire gauche', hand: 'left', color: '#EC4899' }, // Pink
  left_ring: { id: 'left_ring', name: 'Annulaire gauche', hand: 'left', color: '#A855F7' },  // Purple
  left_middle: { id: 'left_middle', name: 'Majeur gauche', hand: 'left', color: '#3B82F6' }, // Blue
  left_index: { id: 'left_index', name: 'Index gauche', hand: 'left', color: '#06B6D4' },   // Cyan
  right_index: { id: 'right_index', name: 'Index droit', hand: 'right', color: '#10B981' },  // Emerald
  right_middle: { id: 'right_middle', name: 'Majeur droit', hand: 'right', color: '#F59E0B' },// Amber
  right_ring: { id: 'right_ring', name: 'Annulaire droit', hand: 'right', color: '#F97316' }, // Orange
  right_pinky: { id: 'right_pinky', name: 'Auriculaire droit', hand: 'right', color: '#EF4444' },// Red/Coral
  thumb: { id: 'thumb', name: 'Pouces (Espace)', hand: 'left', color: '#64748B' }             // Slate
};

export interface KeyDefinition {
  primary: string;
  secondary?: string;
  altGr?: string;
  finger: FingerId;
  width?: string; // e.g. 'flex-1', 'w-16', 'w-20'
  isHome?: boolean; // Ergot tactile
  code: string;
}

export const AZERTY_ROWS: KeyDefinition[][] = [
  // Row 1: Numbers & Specials
  [
    { primary: '²', finger: 'left_pinky', code: 'Backquote' },
    { primary: '&', secondary: '1', finger: 'left_pinky', code: 'Digit1' },
    { primary: 'é', secondary: '2', altGr: '~', finger: 'left_pinky', code: 'Digit2' },
    { primary: '"', secondary: '3', altGr: '#', finger: 'left_ring', code: 'Digit3' },
    { primary: '\'', secondary: '4', altGr: '{', finger: 'left_middle', code: 'Digit4' },
    { primary: '(', secondary: '5', altGr: '[', finger: 'left_index', code: 'Digit5' },
    { primary: '-', secondary: '6', altGr: '|', finger: 'left_index', code: 'Digit6' },
    { primary: 'è', secondary: '7', altGr: '`', finger: 'right_index', code: 'Digit7' },
    { primary: '_', secondary: '8', altGr: '\\', finger: 'right_index', code: 'Digit8' },
    { primary: 'ç', secondary: '9', altGr: '^', finger: 'right_middle', code: 'Digit9' },
    { primary: 'à', secondary: '0', altGr: '@', finger: 'right_ring', code: 'Digit0' },
    { primary: ')', secondary: '°', altGr: ']', finger: 'right_pinky', code: 'Minus' },
    { primary: '=', secondary: '+', altGr: '}', finger: 'right_pinky', code: 'Equal' },
    { primary: '⌫', finger: 'right_pinky', width: 'w-16 md:w-20', code: 'Backspace' }
  ],
  // Row 2: Top Row
  [
    { primary: 'Tab', finger: 'left_pinky', width: 'w-14 md:w-16', code: 'Tab' },
    { primary: 'a', secondary: 'A', finger: 'left_pinky', code: 'KeyA' },
    { primary: 'z', secondary: 'Z', finger: 'left_ring', code: 'KeyW' },
    { primary: 'e', secondary: 'E', altGr: '€', finger: 'left_middle', code: 'KeyE' },
    { primary: 'r', secondary: 'R', finger: 'left_index', code: 'KeyR' },
    { primary: 't', secondary: 'T', finger: 'left_index', code: 'KeyT' },
    { primary: 'y', secondary: 'Y', finger: 'right_index', code: 'KeyY' },
    { primary: 'u', secondary: 'U', finger: 'right_index', code: 'KeyU' },
    { primary: 'i', secondary: 'I', finger: 'right_middle', code: 'KeyI' },
    { primary: 'o', secondary: 'O', finger: 'right_ring', code: 'KeyO' },
    { primary: 'p', secondary: 'P', finger: 'right_pinky', code: 'KeyP' },
    { primary: '^', secondary: '¨', finger: 'right_pinky', code: 'BracketLeft' },
    { primary: '$', secondary: '£', altGr: '¤', finger: 'right_pinky', code: 'BracketRight' },
    { primary: '↵', finger: 'right_pinky', width: 'w-14 md:w-16', code: 'Enter' }
  ],
  // Row 3: Home Row
  [
    { primary: 'Verr Maj', finger: 'left_pinky', width: 'w-16 md:w-20', code: 'CapsLock' },
    { primary: 'q', secondary: 'Q', finger: 'left_pinky', code: 'KeyQ' },
    { primary: 's', secondary: 'S', finger: 'left_ring', code: 'KeyS' },
    { primary: 'd', secondary: 'D', finger: 'left_middle', code: 'KeyD' },
    { primary: 'f', secondary: 'F', finger: 'left_index', isHome: true, code: 'KeyF' },
    { primary: 'g', secondary: 'G', finger: 'left_index', code: 'KeyG' },
    { primary: 'h', secondary: 'H', finger: 'right_index', code: 'KeyH' },
    { primary: 'j', secondary: 'J', finger: 'right_index', isHome: true, code: 'KeyJ' },
    { primary: 'k', secondary: 'K', finger: 'right_middle', code: 'KeyK' },
    { primary: 'l', secondary: 'L', finger: 'right_ring', code: 'KeyL' },
    { primary: 'm', secondary: 'M', finger: 'right_pinky', code: 'KeyM' },
    { primary: 'ù', secondary: '%', finger: 'right_pinky', code: 'Quote' },
    { primary: '*', secondary: 'µ', finger: 'right_pinky', code: 'Backslash' }
  ],
  // Row 4: Bottom Row
  [
    { primary: 'Shift', finger: 'left_pinky', width: 'w-20 md:w-24', code: 'ShiftLeft' },
    { primary: '<', secondary: '>', finger: 'left_pinky', code: 'IntlBackslash' },
    { primary: 'w', secondary: 'W', finger: 'left_pinky', code: 'KeyZ' },
    { primary: 'x', secondary: 'X', finger: 'left_ring', code: 'KeyX' },
    { primary: 'c', secondary: 'C', finger: 'left_middle', code: 'KeyC' },
    { primary: 'v', secondary: 'V', finger: 'left_index', code: 'KeyV' },
    { primary: 'b', secondary: 'B', finger: 'left_index', code: 'KeyB' },
    { primary: 'n', secondary: 'N', finger: 'right_index', code: 'KeyN' },
    { primary: ',', secondary: '?', finger: 'right_index', code: 'Comma' },
    { primary: ';', secondary: '.', finger: 'right_middle', code: 'Period' },
    { primary: ':', secondary: '/', finger: 'right_ring', code: 'Slash' },
    { primary: '!', secondary: '§', finger: 'right_pinky', code: 'Minus' },
    { primary: 'Shift', finger: 'right_pinky', width: 'w-20 md:w-24', code: 'ShiftRight' }
  ],
  // Row 5: Space row
  [
    { primary: 'Ctrl', finger: 'left_pinky', width: 'w-14', code: 'ControlLeft' },
    { primary: 'Alt', finger: 'thumb', width: 'w-14', code: 'AltLeft' },
    { primary: 'Espace', finger: 'thumb', width: 'flex-1', code: 'Space' },
    { primary: 'Alt Gr', finger: 'thumb', width: 'w-16', code: 'AltRight' },
    { primary: 'Ctrl', finger: 'right_pinky', width: 'w-14', code: 'ControlRight' }
  ]
];

export const QWERTY_ROWS: KeyDefinition[][] = [
  // Row 1
  [
    { primary: '`', secondary: '~', finger: 'left_pinky', code: 'Backquote' },
    { primary: '1', secondary: '!', finger: 'left_pinky', code: 'Digit1' },
    { primary: '2', secondary: '@', finger: 'left_ring', code: 'Digit2' },
    { primary: '3', secondary: '#', finger: 'left_middle', code: 'Digit3' },
    { primary: '4', secondary: '$', finger: 'left_index', code: 'Digit4' },
    { primary: '5', secondary: '%', finger: 'left_index', code: 'Digit5' },
    { primary: '6', secondary: '^', finger: 'right_index', code: 'Digit6' },
    { primary: '7', secondary: '&', finger: 'right_index', code: 'Digit7' },
    { primary: '8', secondary: '*', finger: 'right_middle', code: 'Digit8' },
    { primary: '9', secondary: '(', finger: 'right_ring', code: 'Digit9' },
    { primary: '0', secondary: ')', finger: 'right_pinky', code: 'Digit0' },
    { primary: '-', secondary: '_', finger: 'right_pinky', code: 'Minus' },
    { primary: '=', secondary: '+', finger: 'right_pinky', code: 'Equal' },
    { primary: '⌫', finger: 'right_pinky', width: 'w-16 md:w-20', code: 'Backspace' }
  ],
  // Row 2
  [
    { primary: 'Tab', finger: 'left_pinky', width: 'w-14 md:w-16', code: 'Tab' },
    { primary: 'q', secondary: 'Q', finger: 'left_pinky', code: 'KeyQ' },
    { primary: 'w', secondary: 'W', finger: 'left_ring', code: 'KeyW' },
    { primary: 'e', secondary: 'E', finger: 'left_middle', code: 'KeyE' },
    { primary: 'r', secondary: 'R', finger: 'left_index', code: 'KeyR' },
    { primary: 't', secondary: 'T', finger: 'left_index', code: 'KeyT' },
    { primary: 'y', secondary: 'Y', finger: 'right_index', code: 'KeyY' },
    { primary: 'u', secondary: 'U', finger: 'right_index', code: 'KeyU' },
    { primary: 'i', secondary: 'I', finger: 'right_middle', code: 'KeyI' },
    { primary: 'o', secondary: 'O', finger: 'right_ring', code: 'KeyO' },
    { primary: 'p', secondary: 'P', finger: 'right_pinky', code: 'KeyP' },
    { primary: '[', secondary: '{', finger: 'right_pinky', code: 'BracketLeft' },
    { primary: ']', secondary: '}', finger: 'right_pinky', code: 'BracketRight' },
    { primary: '\\', secondary: '|', finger: 'right_pinky', width: 'w-12', code: 'Backslash' }
  ],
  // Row 3
  [
    { primary: 'Caps Lock', finger: 'left_pinky', width: 'w-16 md:w-20', code: 'CapsLock' },
    { primary: 'a', secondary: 'A', finger: 'left_pinky', code: 'KeyA' },
    { primary: 's', secondary: 'S', finger: 'left_ring', code: 'KeyS' },
    { primary: 'd', secondary: 'D', finger: 'left_middle', code: 'KeyD' },
    { primary: 'f', secondary: 'F', finger: 'left_index', isHome: true, code: 'KeyF' },
    { primary: 'g', secondary: 'G', finger: 'left_index', code: 'KeyG' },
    { primary: 'h', secondary: 'H', finger: 'right_index', code: 'KeyH' },
    { primary: 'j', secondary: 'J', finger: 'right_index', isHome: true, code: 'KeyJ' },
    { primary: 'k', secondary: 'K', finger: 'right_middle', code: 'KeyK' },
    { primary: 'l', secondary: 'L', finger: 'right_ring', code: 'KeyL' },
    { primary: ';', secondary: ':', finger: 'right_pinky', code: 'Semicolon' },
    { primary: '\'', secondary: '"', finger: 'right_pinky', code: 'Quote' },
    { primary: 'Enter', finger: 'right_pinky', width: 'w-16 md:w-20', code: 'Enter' }
  ],
  // Row 4
  [
    { primary: 'Shift', finger: 'left_pinky', width: 'w-20 md:w-24', code: 'ShiftLeft' },
    { primary: 'z', secondary: 'Z', finger: 'left_pinky', code: 'KeyZ' },
    { primary: 'x', secondary: 'X', finger: 'left_ring', code: 'KeyX' },
    { primary: 'c', secondary: 'C', finger: 'left_middle', code: 'KeyC' },
    { primary: 'v', secondary: 'V', finger: 'left_index', code: 'KeyV' },
    { primary: 'b', secondary: 'B', finger: 'left_index', code: 'KeyB' },
    { primary: 'n', secondary: 'N', finger: 'right_index', code: 'KeyN' },
    { primary: 'm', secondary: 'M', finger: 'right_index', code: 'KeyM' },
    { primary: ',', secondary: '<', finger: 'right_middle', code: 'Comma' },
    { primary: '.', secondary: '>', finger: 'right_ring', code: 'Period' },
    { primary: '/', secondary: '?', finger: 'right_pinky', code: 'Slash' },
    { primary: 'Shift', finger: 'right_pinky', width: 'w-20 md:w-24', code: 'ShiftRight' }
  ],
  // Row 5
  [
    { primary: 'Ctrl', finger: 'left_pinky', width: 'w-14', code: 'ControlLeft' },
    { primary: 'Alt', finger: 'thumb', width: 'w-14', code: 'AltLeft' },
    { primary: 'Space', finger: 'thumb', width: 'flex-1', code: 'Space' },
    { primary: 'Alt', finger: 'thumb', width: 'w-14', code: 'AltRight' },
    { primary: 'Ctrl', finger: 'right_pinky', width: 'w-14', code: 'ControlRight' }
  ]
];

export interface KeyMotionInfo {
  finger: FingerId;
  rowIndex: number; // 0: numbers, 1: top, 2: home, 3: bottom, 4: space
  isCenterKey: boolean; // G, H, T, Y, B, N
  isLateralExtension: boolean; // P, A, Q, Enter, Shift
  hand: 'left' | 'right';
  deltaY: number; // Vertical translation in px towards key
  deltaX: number; // Horizontal translation in px towards key
}

export function getKeyMotionInfo(char: string, layout: LayoutType = 'azerty'): KeyMotionInfo {
  if (char === ' ') {
    return {
      finger: 'thumb',
      rowIndex: 4,
      isCenterKey: false,
      isLateralExtension: false,
      hand: 'right', // standard space thumb
      deltaY: 6,
      deltaX: 0,
    };
  }

  const rows = layout === 'azerty' ? AZERTY_ROWS : QWERTY_ROWS;
  const lowerChar = char.toLowerCase();

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let c = 0; c < row.length; c++) {
      const key = row[c];
      if (
        key.primary === lowerChar ||
        key.primary === char ||
        key.secondary === char ||
        key.altGr === char
      ) {
        const fingerInfo = FINGERS[key.finger];
        const isCenter = ['g', 'h', 't', 'y', 'b', 'n', '5', '6', '7'].includes(lowerChar);
        const isLateral = ['a', 'q', 'p', 'm', 'w', 'z'].includes(lowerChar);

        // Calculate delta Y based on row
        // r = 0 (numbers): -28px reach
        // r = 1 (top): -20px reach
        // r = 2 (home): 0px (resting or 3px press)
        // r = 3 (bottom): +16px reach
        // r = 4 (space): +8px
        let deltaY = 0;
        if (r === 0) deltaY = -28;
        else if (r === 1) deltaY = -20;
        else if (r === 2) deltaY = -2;
        else if (r === 3) deltaY = 16;
        else if (r === 4) deltaY = 6;

        // Calculate delta X
        let deltaX = 0;
        if (isCenter) {
          deltaX = fingerInfo.hand === 'left' ? 14 : -14;
        } else if (isLateral) {
          deltaX = fingerInfo.hand === 'left' ? -8 : 8;
        }

        return {
          finger: key.finger,
          rowIndex: r,
          isCenterKey: isCenter,
          isLateralExtension: isLateral,
          hand: fingerInfo.hand,
          deltaY,
          deltaX,
        };
      }
    }
  }

  return {
    finger: 'left_index',
    rowIndex: 2,
    isCenterKey: false,
    isLateralExtension: false,
    hand: 'left',
    deltaY: 0,
    deltaX: 0,
  };
}

export function getFingerForKey(char: string, layout: LayoutType = 'azerty'): FingerInfo {
  if (char === ' ') return FINGERS.thumb;
  const rows = layout === 'azerty' ? AZERTY_ROWS : QWERTY_ROWS;
  const lowerChar = char.toLowerCase();

  for (const row of rows) {
    for (const key of row) {
      if (
        key.primary === lowerChar ||
        key.primary === char ||
        key.secondary === char ||
        key.altGr === char
      ) {
        return FINGERS[key.finger];
      }
    }
  }

  // Fallback defaults
  return FINGERS.left_index;
}
