import {
  UNIFIED_MUSIC_KEYS,
  BASE_CHORDS,
  GUITAR_SHAPES,
  SCALE_SEMITONE_TEMPLATES,
  INTERVAL_SEMITONES,
  type NoteName,
} from "@/data";
import { getNotes, type NoteObject } from "@/utils";

export const getIsScaleNoteVisible = (
  index: number,
  allScaleIndices: number[],
) => {
  const positionInScale = allScaleIndices.indexOf(index);
  const isInScale = positionInScale !== -1;
  const isTertiarySelected = positionInScale % 2 === 0;
  return isInScale && isTertiarySelected;
};

export const getIsShapeNoteVisible = (
  index: number,
  guitarShapeIndices: number[],
) => {
  return guitarShapeIndices.includes(index);
};

export const getIntervalName = (index: number) => {
  const normalizedIndex = index % 24;
  const interval = INTERVAL_SEMITONES.find(
    (item) => Object.values(item)[0] === normalizedIndex,
  );
  return interval?.name;
};

export const calculateMatrixData = (
  unifiedMusicKeysDataKey: keyof typeof UNIFIED_MUSIC_KEYS,
  baseChordDataKey: keyof typeof BASE_CHORDS,
  guitarShapeDataKey: keyof typeof GUITAR_SHAPES,
  guitarShapeOffset: number,
  getEnharmonicName: (noteObject: NoteObject) => NoteName,
) => {
  const musicKey =
    UNIFIED_MUSIC_KEYS[
      unifiedMusicKeysDataKey as keyof typeof UNIFIED_MUSIC_KEYS
    ];
  const baseChord = BASE_CHORDS[baseChordDataKey];
  const guitarShape = GUITAR_SHAPES[guitarShapeDataKey];
  const scaleTemplate = SCALE_SEMITONE_TEMPLATES[baseChord.baseScaleDataKey];
  const chordOffset = baseChord.semitoneOffsetFromMajorRoot;

  const allNotes = getNotes({});
  const rootNote = allNotes[musicKey.semitonOffsetFromC];
  const tuneScale = getNotes({ firstNote: rootNote.sharpNoteName });
  const tuneEnharmonics = tuneScale.map(getEnharmonicName);

  const chordRootName = tuneEnharmonics[chordOffset];
  const chordNotesObjects = getNotes({ firstNote: chordRootName, length: 24 });
  const displayNoteNames = chordNotesObjects.map(getEnharmonicName);

  const allScaleIndices = chordNotesObjects
    .map((_, i) => i)
    .filter((i) => scaleTemplate.includes(i % 12));

  const rawShapeRootIndex = guitarShapeOffset - chordOffset;
  const guitarShapeRootIndex =
    rawShapeRootIndex < 0 ? rawShapeRootIndex + 12 : rawShapeRootIndex;
  const guitarShapeRootName = displayNoteNames[guitarShapeRootIndex];
  const guitarShapeIndices = guitarShape.intervals.map(
    (i) => i + guitarShapeRootIndex,
  );

  const visibleColumnsIndices = chordNotesObjects
    .map((_, i) => i)
    .filter((i) => {
      const isVisibleInChord = getIsScaleNoteVisible(i, allScaleIndices);
      const isVisibleInShape = getIsShapeNoteVisible(i, guitarShapeIndices);
      return isVisibleInChord || isVisibleInShape;
    });

  return {
    displayNoteNames,
    allScaleIndices,
    guitarShapeIndices,
    visibleColumnsIndices,
    baseChordDisplayTitle: `${chordRootName} (${baseChord.modeExtendedName})`,
    guitarShapeLabel: `${guitarShapeRootName} ${guitarShape.label}`,
  };
};
