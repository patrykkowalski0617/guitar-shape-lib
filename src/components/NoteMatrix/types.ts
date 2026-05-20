import type {
  UNIFIED_MUSIC_KEYS,
  BASE_CHORDS,
  GUITAR_SHAPES,
  SharpNoteName,
} from "@/data";
import type { NoteName } from "@/data";

export type UnifiedMusicKeysDataKey = keyof typeof UNIFIED_MUSIC_KEYS;
export type BaseChordDataKey = keyof typeof BASE_CHORDS;
export type GuitarShapeDataKey = keyof typeof GUITAR_SHAPES;

export interface NoteMatrixProps {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  baseChordDataKey: BaseChordDataKey;
  guitarShapeOffset: number;
  guitarShapeDataKey: GuitarShapeDataKey;
  targetSharpNoteNames: SharpNoteName[];
  onToggleNote: (sharpNoteName: SharpNoteName) => void;
}

export interface MatrixData {
  noteNames: NoteName[];
  sharpNoteNames: SharpNoteName[];
  allScaleIndices: number[];
  guitarShapeIndices: number[];
  visibleColumnsIndices: number[];
  baseChordDisplayTitle: string;
  guitarShapeLabel: string;
}

export interface NoteColumnInfo {
  index: number;
  noteName: NoteName | "";
  sharpNoteName: SharpNoteName | null;
  isInScale: boolean;
  isInShape: boolean;
  isShared: boolean;
  isTargetNote: boolean;
}

export interface UseNoteMatrixReturn {
  data: MatrixData | null;
  checkIsShared: (sharpNoteName: SharpNoteName) => boolean;
  columns: NoteColumnInfo[];
}
