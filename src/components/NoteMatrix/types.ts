import type { UNIFIED_MUSIC_KEYS, BASE_CHORDS, GUITAR_SHAPES } from "@/data";
import type { NoteName } from "@/data";

export type UnifiedMusicKeysDataKey = keyof typeof UNIFIED_MUSIC_KEYS;
export type BaseChordDataKey = keyof typeof BASE_CHORDS;
export type GuitarShapeDataKey = keyof typeof GUITAR_SHAPES;

export interface NoteMatrixProps {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey;
  baseChordDataKey: BaseChordDataKey;
  guitarShapeOffset: number;
  guitarShapeDataKey: GuitarShapeDataKey;
}

export interface MatrixData {
  displayNoteNames: NoteName[];
  allScaleIndices: number[];
  guitarShapeIndices: number[];
  visibleColumnsIndices: number[];
  baseChordDisplayTitle: string;
  guitarShapeLabel: string;
}

export interface NoteColumnInfo {
  index: number;
  noteName: NoteName | "";
  isInScale: boolean;
  isInShape: boolean;
  isShared: boolean;
  isSelected: boolean;
}
