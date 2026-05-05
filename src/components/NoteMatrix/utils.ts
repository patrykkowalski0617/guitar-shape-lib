import {
  UNIFIED_MUSIC_KEYS,
  BASE_CHORDS,
  SHAPES,
  SCALE_SEMITONE_TEMPLATES,
  INTERVAL_SEMITONES,
  type Note,
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
  shapeIndices: number[],
) => {
  return shapeIndices.includes(index);
};

export const getIntervalName = (index: number) => {
  const normalizedIndex = index % 24;
  const interval = INTERVAL_SEMITONES.find(
    (item) => Object.values(item)[0] === normalizedIndex,
  );
  return interval?.name;
};

export const calculateMatrixData = (
  tuneKeyId: keyof typeof UNIFIED_MUSIC_KEYS,
  baseChordId: keyof typeof BASE_CHORDS,
  shapeId: keyof typeof SHAPES,
  shapeOffset: number,
  getEnharmonicName: (note: NoteObject) => Note,
) => {
  const tuneKey =
    UNIFIED_MUSIC_KEYS[tuneKeyId as keyof typeof UNIFIED_MUSIC_KEYS];
  const baseChord = BASE_CHORDS[baseChordId];
  const shape = SHAPES[shapeId];
  const scaleTemplate = SCALE_SEMITONE_TEMPLATES[baseChord.baseScaleId];
  const chordOffset = baseChord.semitoneOffsetFromMajorScaleRoot;

  const allNotes = getNotes({});
  const rootNote = allNotes[tuneKey.offsetFromC];
  const tuneScale = getNotes({ firstNote: rootNote.sharpNoteName });
  const tuneEnharmonics = tuneScale.map(getEnharmonicName);

  const chordRootName = tuneEnharmonics[chordOffset];
  const chordNotesObjects = getNotes({ firstNote: chordRootName, length: 24 });
  const displayNoteNames = chordNotesObjects.map(getEnharmonicName);

  const allScaleIndices = chordNotesObjects
    .map((_, i) => i)
    .filter((i) => scaleTemplate.includes(i % 12));

  const rawShapeRootIndex = shapeOffset - chordOffset;
  const shapeRootIndex =
    rawShapeRootIndex < 0 ? rawShapeRootIndex + 12 : rawShapeRootIndex;
  const shapeRootName = displayNoteNames[shapeRootIndex];
  const shapeIndices = shape.intervals.map((i) => i + shapeRootIndex);

  const visibleColumnsIndices = chordNotesObjects
    .map((_, i) => i)
    .filter((i) => {
      const isVisibleInChord = getIsScaleNoteVisible(i, allScaleIndices);
      const isVisibleInShape = getIsShapeNoteVisible(i, shapeIndices);
      return isVisibleInChord || isVisibleInShape;
    });

  return {
    displayNoteNames,
    allScaleIndices,
    shapeIndices,
    visibleColumnsIndices,
    baseChordDisplayTitle: `${chordRootName} ${baseChord.modeExtendedName}`,
    shapeLabel: `${shapeRootName} ${shape.label}`,
  };
};
