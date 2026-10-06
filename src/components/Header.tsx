import React from 'react';
import { Volume2, VolumeX, Keyboard } from 'lucide-react';
import { LayoutType } from '../types';

interface HeaderProps {
  activeTab: 'practice' | 'courses' | 'posture' | 'json' | 'stats';
  setActiveTab: (tab: 'practice' | 'courses' | 'posture' | 'json' | 'stats') => void;
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  layout,
  setLayout,
  soundEnabled,
  setSoundEnabled,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('practice')}
          className="text-lg font-bold tracking-tight text-white hover:text-sky-400 transition-colors flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
          Agile Fingers
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('practice')}
            className={`transition-colors pb-0.5 ${
              activeTab === 'practice'
                ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Entraînement
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`transition-colors pb-0.5 ${
              activeTab === 'courses'
                ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Programme & Cours
          </button>
          <button
            onClick={() => setActiveTab('posture')}
            className={`transition-colors pb-0.5 ${
              activeTab === 'posture'
                ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Guide Posture
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`transition-colors pb-0.5 ${
              activeTab === 'json'
                ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Données JSON
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`transition-colors pb-0.5 ${
              activeTab === 'stats'
                ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Progression
          </button>
        </nav>

        {/* Zone 3: Interactive controls */}
        <div className="flex items-center gap-3">
          {/* Layout Selector */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setLayout('azerty')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                layout === 'azerty'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Clavier AZERTY Français"
            >
              AZERTY
            </button>
            <button
              onClick={() => setLayout('qwerty')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                layout === 'qwerty'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Clavier QWERTY Standard"
            >
              QWERTY
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg border transition-colors ${
              soundEnabled
                ? 'bg-slate-800 border-slate-700 text-sky-400 hover:bg-slate-700'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
            title={soundEnabled ? 'Son activé (Mécanique & Carillons)' : 'Son coupé'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden border-t border-slate-800 px-3 py-2 justify-around text-xs font-medium bg-slate-900">
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-2 py-1 rounded ${activeTab === 'practice' ? 'text-sky-400 font-semibold' : 'text-slate-400'}`}
        >
          Entraînement
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-2 py-1 rounded ${activeTab === 'courses' ? 'text-sky-400 font-semibold' : 'text-slate-400'}`}
        >
          Cours
        </button>
        <button
          onClick={() => setActiveTab('posture')}
          className={`px-2 py-1 rounded ${activeTab === 'posture' ? 'text-sky-400 font-semibold' : 'text-slate-400'}`}
        >
          Posture
        </button>
        <button
          onClick={() => setActiveTab('json')}
          className={`px-2 py-1 rounded ${activeTab === 'json' ? 'text-sky-400 font-semibold' : 'text-slate-400'}`}
        >
          JSON
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-2 py-1 rounded ${activeTab === 'stats' ? 'text-sky-400 font-semibold' : 'text-slate-400'}`}
        >
          Stats
        </button>
      </div>
    </header>
  );
};
