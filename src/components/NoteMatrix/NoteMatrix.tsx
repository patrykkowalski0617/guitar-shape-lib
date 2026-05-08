import * as S from "./parts";
import { useNoteMatrix } from "./hooks/useNoteMatrix";
import {
  getIsScaleNoteVisible,
  getIsShapeNoteVisible,
  getIntervalName,
} from "./utils";

export const NoteMatrix = () => {
  const {
    isStateReady,
    data,
    selectedNotes,
    setSelectedNotes,
    checkIsShared,
    paddingArray,
  } = useNoteMatrix();

  return (
    <S.NoteMatrixSection>
      <S.NoteMatrixSectionColumn>
        <S.RowTitle $isStateReady={isStateReady}>
          {isStateReady
            ? `Chord: "${data?.baseChordDisplayTitle}"`
            : "Chord notes:"}
        </S.RowTitle>
        <S.RowTitle $isStateReady={isStateReady}>
          {isStateReady
            ? `Solo Shape: "${data?.shapeLabel}"`
            : "Solo Shape notes:"}
        </S.RowTitle>
      </S.NoteMatrixSectionColumn>

      <S.NoteMatrixSectionColumn>
        <S.NotesRow>
          {data?.visibleColumnsIndices.map((i) => {
            const isVisible = getIsScaleNoteVisible(i, data.allScaleIndices);
            const noteName = isVisible ? data.displayNoteNames[i] : "";
            const isShared = checkIsShared(noteName);
            // const isSelected = selectedNotes.includes(noteName);

            return (
              <S.NoteWrapper key={`base-wrapper-${i}`}>
                <S.IntervalContainer>{getIntervalName(i)}</S.IntervalContainer>
                <S.Note $isVisible={isVisible} $isSharedNote={isShared}>
                  {noteName}
                </S.Note>
              </S.NoteWrapper>
            );
          })}
          {paddingArray.map((_, idx) => (
            <S.NoteWrapper key={`base-pad-${idx}`}>
              <S.IntervalContainer />
              <S.Note $isVisible={false} />
            </S.NoteWrapper>
          ))}
        </S.NotesRow>

        <S.NotesRow>
          {data?.visibleColumnsIndices.map((i) => {
            const isVisible = getIsShapeNoteVisible(i, data.shapeIndices);
            const noteName = isVisible ? data.displayNoteNames[i] : "";
            const isShared = checkIsShared(noteName);
            const isSelected =
              noteName !== "" && selectedNotes.includes(noteName);

            return (
              <S.Note
                key={`shape-${i}`}
                $isVisible={isVisible}
                $isSharedNote={isShared}
                $isSelected={isSelected}
                onClick={() =>
                  isVisible && noteName && setSelectedNotes(noteName)
                }
              >
                {noteName}
              </S.Note>
            );
          })}
          {paddingArray.map((_, idx) => (
            <S.Note key={`shape-pad-${idx}`} $isVisible={false} />
          ))}
        </S.NotesRow>
      </S.NoteMatrixSectionColumn>
    </S.NoteMatrixSection>
  );
};
