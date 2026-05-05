import {
  BASE_CHORDS,
  INTERVAL_SEMITONES,
  SCALE_SEMITONE_TEMPLATES,
  SHAPES,
  UNIFIED_MUSIC_KEYS,
} from "@/data";
import { useEnharmonicNoteName, usePersistentUnlock } from "@/hooks";
import { useControlsStore, useMusicStore } from "@/store";
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

  const selectedComponentNotes = useMusicStore(
    (state) => state.selectedComponentNotes,
  );
  const setSelectedComponentNotes = useMusicStore(
    (state) => state.setSelectedComponentNotes,
  );

  const isTemporarlyDisabled = usePersistentUnlock(!shapeId);
  const getEnharmonicNoteName = useEnharmonicNoteName();

  if (isTemporarlyDisabled) return;

  const isStateReady = !!(
    shapeId &&
    tuneKeyId &&
    baseChordId &&
    shapeSemitoneOffsetFromC !== null
  );

  let visibleColumnsIndices: number[] = [];
  let displayNoteNames: string[] = [];
  let onlyScaleNotesIndices: number[] = [];
  let shapeIndexes: number[] = [];
  let baseChordDisplayTitle = "";
  let shapeLabel = "";
  let visibleBaseNoteNames = new Set<string>();
  let visibleShapeNoteNames = new Set<string>();

  if (isStateReady) {
    const tuneKey = UNIFIED_MUSIC_KEYS[tuneKeyId!];
    const baseChord = BASE_CHORDS[baseChordId!];
    const shape = SHAPES[shapeId!];
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

    displayNoteNames = chordNotesObjects.map((note) =>
      getEnharmonicNoteName(note),
    );

    onlyScaleNotesIndices = chordNotesObjects
      .map((_, index) => index)
      .filter((index) => scaleTemplate.includes(index % 12));

    const shapeRootIndex =
      shapeSemitoneOffsetFromC! - baseChordOffsetFromMajorRoot < 0
        ? shapeSemitoneOffsetFromC! - baseChordOffsetFromMajorRoot + 12
        : shapeSemitoneOffsetFromC! - baseChordOffsetFromMajorRoot;

    const shapeRootName = displayNoteNames[shapeRootIndex];
    shapeLabel = `${shapeRootName} ${shape.label}`;

    shapeIndexes = shape.intervals.map((i) => i + shapeRootIndex);

    visibleColumnsIndices = chordNotesObjects
      .map((_, i) => i)
      .filter((i) => {
        const isVisibleInBaseChord = getIsScaleNoteVisible(
          i,
          onlyScaleNotesIndices,
        );
        const isVisibleInShape = getIsShapeNoteVisible(i, shapeIndexes);
        return isVisibleInBaseChord || isVisibleInShape;
      });

    baseChordDisplayTitle = `${chordRootName} ${baseChord.modeExtendedName}`;

    visibleBaseNoteNames = new Set<string>(
      visibleColumnsIndices
        .filter((i) => getIsScaleNoteVisible(i, onlyScaleNotesIndices))
        .map((i) => displayNoteNames[i]),
    );

    visibleShapeNoteNames = new Set<string>(
      visibleColumnsIndices
        .filter((i) => getIsShapeNoteVisible(i, shapeIndexes))
        .map((i) => displayNoteNames[i]),
    );
  }

  const checkIfShared = (noteName: string) =>
    noteName !== "" &&
    visibleBaseNoteNames.has(noteName) &&
    visibleShapeNoteNames.has(noteName);

  const MIN_NOTES = 12;
  const paddingSize = Math.max(0, MIN_NOTES - visibleColumnsIndices.length);
  const paddingArray = Array.from({ length: paddingSize });

  return (
    <S.NoteMatrixSection>
      <S.NoteMatrixSectionColumn>
        <S.RowTitle>
          Chord: {isStateReady ? `"${baseChordDisplayTitle}"` : ""}
        </S.RowTitle>
        <S.RowTitle>Solo: {isStateReady ? `"${shapeLabel}"` : ""}</S.RowTitle>
      </S.NoteMatrixSectionColumn>

      <S.NoteMatrixSectionColumn>
        <S.NotesRow>
          {visibleColumnsIndices.map((i) => {
            const isVisible = getIsScaleNoteVisible(i, onlyScaleNotesIndices);
            const noteName = isVisible ? displayNoteNames[i] : "";
            const isSharedNote = checkIfShared(noteName);
            const isSelected = selectedComponentNotes.includes(noteName);

            return (
              <S.NoteWrapper key={`base-wrapper-${i}`}>
                <S.IntervalContainer>
                  {
                    INTERVAL_SEMITONES.find((interval) => {
                      const semitones = Object.values(interval)[0];
                      return semitones === i % 24;
                    })?.name
                  }
                </S.IntervalContainer>
                <S.Note
                  $isVisible={isVisible}
                  $isSharedNote={isSharedNote}
                  onClick={() =>
                    isVisible && setSelectedComponentNotes(noteName)
                  }
                  $isSelected={isSelected}
                >
                  {noteName}
                </S.Note>
              </S.NoteWrapper>
            );
          })}
          {paddingArray.map((_, index) => (
            <S.NoteWrapper key={`base-padding-${index}`}>
              <S.IntervalContainer />
              <S.Note $isVisible={false} />
            </S.NoteWrapper>
          ))}
        </S.NotesRow>

        <S.NotesRow>
          {visibleColumnsIndices.map((i) => {
            const isVisible = getIsShapeNoteVisible(i, shapeIndexes);
            const noteName = isVisible ? displayNoteNames[i] : "";
            const isSharedNote = checkIfShared(noteName);
            const isSelected = selectedComponentNotes.includes(noteName);

            return (
              <S.Note
                key={`shape-${i}`}
                $isVisible={isVisible}
                $isSharedNote={isSharedNote}
                onClick={() => isVisible && setSelectedComponentNotes(noteName)}
                $isSelected={isSelected}
              >
                {noteName}
              </S.Note>
            );
          })}
          {paddingArray.map((_, index) => (
            <S.Note key={`shape-padding-${index}`} $isVisible={false} />
          ))}
        </S.NotesRow>
      </S.NoteMatrixSectionColumn>
    </S.NoteMatrixSection>
  );
};
