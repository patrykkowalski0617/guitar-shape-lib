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

export const NerdSection = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const shapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.shapeSemitoneOffsetFromC,
  );

  const getEnharmonicNoteName = useEnharmonicNoteName();

  if (
    !shapeId ||
    !tuneKeyId ||
    !baseChordId ||
    shapeSemitoneOffsetFromC === null
  )
    return;

  const tuneKey = UNIFIED_MUSIC_KEYS[tuneKeyId];
  const tuneKeyOffsetFromC = tuneKey.offsetFromC;

  const baseChord = BASE_CHORDS[baseChordId];
  const baseChordOffsetFromMajorRoot =
    baseChord.semitoneOffsetFromMajorScaleRoot;
  const scaleTemplate = SCALE_SEMITONE_TEMPLATES[baseChord.baseScaleId];

  const allNotesStartingFromC = getNotes({});
  const tuneKeyRootName =
    allNotesStartingFromC[tuneKeyOffsetFromC].sharpNoteName;

  const tuneKeyScaleNotes = getNotes({ firstNote: tuneKeyRootName });
  const tuneKeyEnharmonicNotes = tuneKeyScaleNotes.map((note) =>
    getEnharmonicNoteName(note),
  );

  const chordRootNote = tuneKeyEnharmonicNotes[baseChordOffsetFromMajorRoot];
  const notes = getNotes({
    firstNote: chordRootNote,
    length: 24,
  });

  const onlyScaleNotesIndices = notes
    .map((_, index) => index)
    .filter((index) => scaleTemplate.includes(index % 12));

  const shape = SHAPES[shapeId];
  const shapeIntervals = shape.intervals;
  const shapeRootNote = getEnharmonicNoteName(
    notes[shapeSemitoneOffsetFromC - baseChordOffsetFromMajorRoot],
  );
  const shapeLabel = `${shapeRootNote}${shape.label}`;
  const shapeIndexes = shapeIntervals.map(
    (i) => i + shapeSemitoneOffsetFromC - baseChordOffsetFromMajorRoot,
  );

  return (
    <S.NerdSection>
      <S.NerdSectionRow>
        <S.RowTitle>Base Chord: C</S.RowTitle>
        <S.NotesRow>
          {notes.map((note, i) => {
            const positionInScale = onlyScaleNotesIndices.indexOf(i);

            const isInScale = positionInScale !== -1;
            const isTertiarySelected = positionInScale % 2 === 0;

            const isVisible = isInScale && isTertiarySelected;

            return (
              <S.Note $isVisible={isVisible} key={`${tuneKey}-${i}`}>
                {getEnharmonicNoteName(note)}
              </S.Note>
            );
          })}
        </S.NotesRow>
      </S.NerdSectionRow>
      <S.NerdSectionRow>
        <S.RowTitle>Shape: {shapeLabel}</S.RowTitle>
        <S.NotesRow>
          {notes.map((note, i) => {
            const isVisible = shapeIndexes.includes(i);
            return (
              <S.Note $isVisible={isVisible} key={i}>
                {getEnharmonicNoteName(note)}
              </S.Note>
            );
          })}
        </S.NotesRow>
      </S.NerdSectionRow>
    </S.NerdSection>
  );
};
