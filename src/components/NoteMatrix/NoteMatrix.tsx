import * as S from "./parts";
import { useNoteMatrix } from "./hooks/useNoteMatrix";
import { getIntervalName } from "./utils";
import type { NoteMatrixProps } from "./types";

export const NoteMatrix = ({
  unifiedMusicKeysDataKey,
  baseChordDataKey,
  guitarShapeOffset,
  guitarShapeDataKey,
}: NoteMatrixProps) => {
  const { columns, setSelectedNotes } = useNoteMatrix({
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    guitarShapeOffset,
    guitarShapeDataKey,
  });

  return (
    <S.NoteMatrixSection>
      {columns.map(({ index, noteName, isInScale, isShared, isSelected }) => (
        <S.NoteWrapper key={`base-wrapper-${index}`}>
          {isInScale && (
            <>
              <S.IntervalContainer>
                {getIntervalName(index)}
              </S.IntervalContainer>
              <S.Note
                $isSharedNote={isShared}
                $isSelected={isSelected}
                onClick={() => {
                  if (isShared && noteName) setSelectedNotes(noteName);
                }}
              >
                {noteName}
              </S.Note>
            </>
          )}
        </S.NoteWrapper>
      ))}
    </S.NoteMatrixSection>
  );
};
