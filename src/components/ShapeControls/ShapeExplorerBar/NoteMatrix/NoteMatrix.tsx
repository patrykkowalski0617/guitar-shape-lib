import {
  BASE_CHORDS,
  SCALE_SEMITONE_TEMPLATES,
  SHAPES,
  UNIFIED_MUSIC_KEYS,
} from "@/data";
import { useEnharmonicNoteName } from "@/hooks";
import { useControlsStore } from "@/store";
import { getNotes } from "@/utils";
import * as S from "./parts";
import { getIsScaleNoteVisible, getIsShapeNoteVisible } from "./utils";

export const NoteMatrix = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const shapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.shapeSemitoneOffsetFromC,
  );

  const getEnharmonicNoteName = useEnharmonicNoteName();

  const isStateReady =
    shapeId && tuneKeyId && baseChordId && shapeSemitoneOffsetFromC !== null;

  if (!isStateReady) return null;

  const tuneKey = UNIFIED_MUSIC_KEYS[tuneKeyId];
  const baseChord = BASE_CHORDS[baseChordId];
  const shape = SHAPES[shapeId];
  const scaleTemplate = SCALE_SEMITONE_TEMPLATES[baseChord.baseScaleId];
  const baseChordOffsetFromMajorRoot =
    baseChord.semitoneOffsetFromMajorScaleRoot;

  const allNotesStartingFromC = getNotes({});
  const tuneKeyRootNoteObject = allNotesStartingFromC[tuneKey.offsetFromC];

  const tuneKeyScaleNotes = getNotes({
    firstNote: tuneKeyRootNoteObject.sharpNoteName,
  });

  const tuneKeyEnharmonicNames = tuneKeyScaleNotes.map((note) =>
    getEnharmonicNoteName(note),
  );

  const chordRootName = tuneKeyEnharmonicNames[baseChordOffsetFromMajorRoot];

  const chordNotesObjects = getNotes({
    firstNote: chordRootName,
    length: 24,
  });

  const displayNoteNames = chordNotesObjects.map((note) =>
    getEnharmonicNoteName(note),
  );

  const onlyScaleNotesIndices = chordNotesObjects
    .map((_, index) => index)
    .filter((index) => scaleTemplate.includes(index % 12));

  const shapeRootIndex =
    shapeSemitoneOffsetFromC - baseChordOffsetFromMajorRoot;
  const shapeRootName = displayNoteNames[shapeRootIndex];
  const shapeLabel = `${shapeRootName}${shape.label}`;

  const shapeIndexes = shape.intervals.map((i) => i + shapeRootIndex);

  const visibleColumnsIndices = chordNotesObjects
    .map((_, i) => i)
    .filter((i) => {
      const isVisibleInBaseChord = getIsScaleNoteVisible(
        i,
        onlyScaleNotesIndices,
      );
      const isVisibleInShape = getIsShapeNoteVisible(i, shapeIndexes);
      return isVisibleInBaseChord || isVisibleInShape;
    });
  const baseChordDisplayTitle = `${chordRootName}${baseChord.modeExtendedName}`;
  return (
    <S.NerdSection>
      <S.NerdSectionColumn>
        <S.RowTitle>Base Chord: {baseChordDisplayTitle}</S.RowTitle>
        <S.RowTitle>Shape: {shapeLabel}</S.RowTitle>
      </S.NerdSectionColumn>
      <S.NerdSectionColumn>
        <S.NotesRow>
          {visibleColumnsIndices.map((i) => (
            <S.Note
              key={`base-${i}`}
              $isVisible={getIsScaleNoteVisible(i, onlyScaleNotesIndices)}
            >
              {displayNoteNames[i]}
            </S.Note>
          ))}
        </S.NotesRow>

        <S.NotesRow>
          {visibleColumnsIndices.map((i) => (
            <S.Note
              key={`shape-${i}`}
              $isVisible={getIsShapeNoteVisible(i, shapeIndexes)}
            >
              {displayNoteNames[i]}
            </S.Note>
          ))}
        </S.NotesRow>
      </S.NerdSectionColumn>
    </S.NerdSection>
  );
};
