export type LayoutType = 'azerty' | 'qwerty';

export type FingerId =
  | 'left_pinky'
  | 'left_ring'
  | 'left_middle'
  | 'left_index'
  | 'right_index'
  | 'right_middle'
  | 'right_ring'
  | 'right_pinky'
  | 'thumb';

export interface FingerInfo {
  id: FingerId;
  name: string;
  hand: 'left' | 'right';
  color: string;
}

export type ExerciseType = 'repetition' | 'words' | 'sentences' | 'evaluation';

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  instruction: string;
  target_wpm: number;
  min_accuracy: number;
  // Content can have variant per layout if appropriate, or universal content
  content: string;
  content_qwerty?: string;
}

export interface TheoreticalGuide {
  placement: string[];
  reperes_tactiles: string;
  regles_or: string[];
  astuce_vitesse: string;
}

export interface Lesson {
  id: string;
  titre: string;
  objectif: string;
  doigts_cibles: string[];
  touches_etudiees: string[];
  guide_theorique: TheoreticalGuide;
  exercices: Exercise[];
}

export interface Module {
  id: string;
  titre: string;
  description: string;
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  duree_estimee: string;
  lecons: Lesson[];
  evaluation_module?: Exercise;
}

export interface CourseCatalog {
  titre_programme: string;
  description_globale: string;
  version: string;
  mode: string;
  modules: Module[];
}

export interface ExerciseStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  elapsedTime: number; // in seconds
  completedAt: string;
  stars: number;
}

export interface UserProgress {
  completedExercises: Record<string, ExerciseStats>;
  currentModuleId: string;
  currentLessonId: string;
  currentExerciseIndex: number;
  layout: LayoutType;
  soundEnabled: boolean;
  theme: 'dark' | 'light';
}
