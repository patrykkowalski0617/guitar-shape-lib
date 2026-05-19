import {
  UNIFIED_MUSIC_KEYS,
  BASE_CHORDS,
  GUITAR_SHAPES,
  SCALE_SEMITONE_TEMPLATES,
  INTERVAL_SEMITONES,
} from "@/data";
import { getNotes } from "@/utils";
import { getEnharmonicNoteName } from "@/hooks/enharmonicNoteName";
import type {
  UnifiedMusicKeysDataKey,
  BaseChordDataKey,
  GuitarShapeDataKey,
  MatrixData,
} from "./types";

export const getIsScaleNoteVisible = (
  index: number,
  allScaleIndices: number[],
): boolean => {
  const positionInScale = allScaleIndices.indexOf(index);

  return positionInScale !== -1 && positionInScale % 2 === 0;
};

export const getIsShapeNoteVisible = (
  index: number,
  guitarShapeIndices: number[],
): boolean => guitarShapeIndices.includes(index);

export const getIntervalName = (index: number): string | undefined => {
  const normalizedIndex = index % 24;
  const interval = INTERVAL_SEMITONES.find(
    (item) => Object.values(item)[0] === normalizedIndex,
  );
  return interval?.name;
};

const normalizeToOctave = (offset: number): number => ((offset % 12) + 12) % 12;

export const calculateMatrixData = (
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKey,
  baseChordDataKey: BaseChordDataKey,
  guitarShapeDataKey: GuitarShapeDataKey,
  guitarShapeOffset: number,
): MatrixData => {
  const musicKey = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey];
  const baseChord = BASE_CHORDS[baseChordDataKey];
  const guitarShape = GUITAR_SHAPES[guitarShapeDataKey];
  const scaleTemplate =
    SCALE_SEMITONE_TEMPLATES[baseChord.baseScaleDataKey].template;
  const chordOffset = baseChord.semitoneOffsetFromMajorRoot;

  const allNotes = getNotes({});
  const rootNote = allNotes[musicKey.semitonOffsetFromC];
  const tuneScale = getNotes({ firstNote: rootNote.sharpNoteName });
  const tuneEnharmonics = tuneScale.map((note) =>
    getEnharmonicNoteName(note, unifiedMusicKeysDataKey),
  );

  const chordRootName = tuneEnharmonics[chordOffset];
  const chordNotesObjects = getNotes({ firstNote: chordRootName, length: 24 });
  const displayNoteNames = chordNotesObjects.map((note) =>
    getEnharmonicNoteName(note, unifiedMusicKeysDataKey),
  );

  const allScaleIndices = chordNotesObjects
    .map((_, i) => i)
    .filter((i) => scaleTemplate.includes(i % 12));

  const guitarShapeRootIndex = normalizeToOctave(
    guitarShapeOffset - chordOffset,
  );
  const guitarShapeRootName = displayNoteNames[guitarShapeRootIndex];
  const guitarShapeIndices = guitarShape.intervals.map(
    (i) => i + guitarShapeRootIndex,
  );

  const visibleColumnsIndices = chordNotesObjects
    .map((_, i) => i)
    .filter(
      (i) =>
        getIsScaleNoteVisible(i, allScaleIndices) ||
        getIsShapeNoteVisible(i, guitarShapeIndices),
    );

  return {
    displayNoteNames,
    allScaleIndices,
    guitarShapeIndices,
    visibleColumnsIndices,
    baseChordDisplayTitle: `${chordRootName} (${baseChord.modeExtendedName})`,
    guitarShapeLabel: `${guitarShapeRootName} ${guitarShape.label}`,
  };
};
