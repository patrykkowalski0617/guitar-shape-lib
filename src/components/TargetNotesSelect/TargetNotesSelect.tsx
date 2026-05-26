import { useEffect } from "react";
import { useTargetNotesSelect } from "./hooks/useTargetNotesSelect";
import { useShapePlayerStore } from "@/store";
import { getIntervalName } from "./utils";
import type { NoteMatrixProps } from "./types";
import { useShapePlayerTargetNotes } from "../ShapePlayer/ShapePlayerBrick/hooks";
import * as S from "./parts";
import { useSelectDropdown } from "./hooks/useSelectDropdown";

export const TargetNotesSelect = ({
  unifiedMusicKeysDataKey,
  baseChordDataKey,
  guitarShapeOffset,
  guitarShapeDataKey,
  targetNoteIndices,
  brickId,
}: NoteMatrixProps) => {
  const { isOpen, setIsOpen, wrapperRef } = useSelectDropdown();

  const brick = useShapePlayerStore((s) =>
    s.guitarShapePlayerBricks.find((b) => b.id === brickId),
  );
  const { toggleTargetNote } = useShapePlayerTargetNotes(brick);

  const { columns } = useTargetNotesSelect({
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    guitarShapeOffset,
    guitarShapeDataKey,
    targetNoteIndices,
    brickId,
  });

  const options = columns.filter(
    ({ isInScale, isInShape }) => isInScale || isInShape,
  );

  const selectedLabels = options
    .filter(({ isTargetNote }) => isTargetNote)
    .map(({ index }) => getIntervalName(index))
    .join(", ");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <S.SelectWrapper ref={wrapperRef}>
      <S.SelectTrigger
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedLabels ? (
          <S.SelectValue>{selectedLabels}</S.SelectValue>
        ) : (
          <S.SelectPlaceholder>Select target notes...</S.SelectPlaceholder>
        )}
        <S.SelectChevron $isOpen={isOpen} />
      </S.SelectTrigger>

      {isOpen && (
        <S.SelectDropdown role="listbox" aria-multiselectable="true">
          {options.map(
            ({ index, noteName, isTargetNote, isShared, positionInChord }) => (
              <S.SelectOption
                key={`option-${index}`}
                role="option"
                aria-selected={isTargetNote}
                $isSharedNote={isShared}
                onClick={() => toggleTargetNote(positionInChord)}
              >
                <S.SelectCheckbox $isSelected={isTargetNote}>
                  {isTargetNote && <S.CheckIcon />}
                </S.SelectCheckbox>
                <S.SelectNoteName>{noteName}</S.SelectNoteName>
                <S.SelectIntervalName>
                  {getIntervalName(index)}
                </S.SelectIntervalName>
              </S.SelectOption>
            ),
          )}
        </S.SelectDropdown>
      )}
    </S.SelectWrapper>
  );
};
