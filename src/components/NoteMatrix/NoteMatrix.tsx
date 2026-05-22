import * as S from "./parts";
import { useNoteMatrix } from "./hooks/useNoteMatrix";
import { getIntervalName } from "./utils";
import type { NoteMatrixProps } from "./types";

export const NoteMatrix = ({
  unifiedMusicKeysDataKey,
  baseChordDataKey,
  guitarShapeOffset,
  guitarShapeDataKey,
  targetSharpNoteNames,
  onToggleNote,
}: NoteMatrixProps) => {
  const { columns } = useNoteMatrix({
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    guitarShapeOffset,
    guitarShapeDataKey,
    targetSharpNoteNames,
    onToggleNote,
  });

  return (
    <S.NoteMatrixSection>
      {columns
        .filter(({ isInScale }) => isInScale)
        .map(({ index, noteName, sharpNoteName, isShared, isTargetNote }) => (
          <S.NoteWrapper key={`note-wrapper-${index}`}>
            <S.IntervalContainer>{getIntervalName(index)}</S.IntervalContainer>
            <S.Note
              $isSharedNote={isShared}
              $isTargetNote={isTargetNote}
              onClick={() => {
                if (isShared && sharpNoteName) {
                  onToggleNote(sharpNoteName);
                }
              }}
            >
              {noteName}
            </S.Note>
          </S.NoteWrapper>
        ))}
    </S.NoteMatrixSection>
  );
};
