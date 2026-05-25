import * as S from "./parts";
import { useNoteMatrix } from "./hooks/useNoteMatrix";
import { useShapePlayerStore } from "@/store";
import { getIntervalName } from "./utils";
import type { NoteMatrixProps } from "./types";
import { useShapePlayerTargetNotes } from "../ShapePlayer/ShapePlayerBrick/hooks";

export const NoteMatrix = ({
  unifiedMusicKeysDataKey,
  baseChordDataKey,
  guitarShapeOffset,
  guitarShapeDataKey,
  targetNoteIndices,
  brickId,
}: NoteMatrixProps) => {
  const brick = useShapePlayerStore((s) =>
    s.guitarShapePlayerBricks.find((b) => b.id === brickId),
  );
  const { toggleTargetNote } = useShapePlayerTargetNotes(brick);

  const { columns } = useNoteMatrix({
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    guitarShapeOffset,
    guitarShapeDataKey,
    targetNoteIndices,
    brickId,
  });

  return (
    <S.NoteMatrixSection>
      {columns
        .filter(({ isInScale, isInShape }) => isInScale || isInShape)
        .map(({ index, noteName, isShared, isTargetNote, positionInChord }) => (
          <S.NoteWrapper key={`note-wrapper-${index}`}>
            <S.IntervalContainer>{getIntervalName(index)}</S.IntervalContainer>
            <S.Note
              $isSharedNote={isShared}
              $isTargetNote={isTargetNote}
              onClick={() => {
                toggleTargetNote(positionInChord);
              }}
            >
              {noteName}
            </S.Note>
          </S.NoteWrapper>
        ))}
    </S.NoteMatrixSection>
  );
};
