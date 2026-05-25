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
  const noteNames = chordNotesObjects.map((note) =>
    getEnharmonicNoteName(note, unifiedMusicKeysDataKey),
  );
  const sharpNoteNames = chordNotesObjects.map((note) => note.sharpNoteName);

  const allScaleIndices = chordNotesObjects
    .map((_, i) => i)
    .filter((i) => scaleTemplate.includes(i % 12));

  const chordNoteIndices = allScaleIndices.filter((_, pos) => pos % 2 === 0);
  const chordSharpNoteNames = new Set(
    chordNoteIndices.map((i) => sharpNoteNames[i]),
  );

  const guitarShapeRootIndex = normalizeToOctave(
    guitarShapeOffset - chordOffset,
  );
  const guitarShapeRootName = noteNames[guitarShapeRootIndex];
  const guitarShapeIndices = guitarShape.intervals.map(
    (i) => i + guitarShapeRootIndex,
  );
  const guitarShapeSharpNoteNames = new Set(
    guitarShapeIndices.map((i) => sharpNoteNames[i]).filter(Boolean),
  );

  const seenSharpNames = new Set<string>();
  const alterationIndices = chordNotesObjects
    .map((_, i) => i)
    .filter((i) => {
      const name = sharpNoteNames[i];
      if (!guitarShapeSharpNoteNames.has(name)) return false;
      if (chordSharpNoteNames.has(name)) return false;
      if (seenSharpNames.has(name)) return false;
      seenSharpNames.add(name);
      return true;
    });

  const visibleColumnsIndices = [
    ...chordNoteIndices,
    ...alterationIndices,
  ].sort((a, b) => a - b);

  return {
    noteNames,
    sharpNoteNames,
    allScaleIndices,
    chordNoteIndices,
    guitarShapeIndices,
    visibleColumnsIndices,
    baseChordDisplayTitle: `${chordRootName} (${baseChord.modeExtendedName})`,
    guitarShapeLabel: `${guitarShapeRootName} ${guitarShape.label}`,
  };
};
