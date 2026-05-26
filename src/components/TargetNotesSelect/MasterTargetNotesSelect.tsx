import * as S from "./parts";
import { useShapePlayerStore } from "@/store";
import { useSelectDropdown } from "./hooks/useSelectDropdown";
import { useMasterTargetNotesSelect } from "./hooks/useMasterTargetNotesSelect";

export const MasterTargetNotesSelect = () => {
  const bricks = useShapePlayerStore((s) => s.guitarShapePlayerBricks);
  const { options, toggleMasterNote } = useMasterTargetNotesSelect();
  const { isOpen, setIsOpen, wrapperRef } = useSelectDropdown();

  if (bricks.length === 0) return null;

  const selectedLabels = options
    .filter(({ isTargetNote }) => isTargetNote)
    .map(({ label }) => label)
    .join(", ");

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
          {options.map(({ positionInChord, label, isShared, isTargetNote }) => (
            <S.SelectOption
              key={`master-option-${positionInChord}`}
              role="option"
              aria-selected={isTargetNote}
              $isSharedNote={isShared}
              onClick={() => toggleMasterNote(positionInChord)}
            >
              <S.SelectCheckbox $isSelected={isTargetNote}>
                {isTargetNote && <S.CheckIcon />}
              </S.SelectCheckbox>
              <S.SelectNoteName>{label}</S.SelectNoteName>
            </S.SelectOption>
          ))}
        </S.SelectDropdown>
      )}
    </S.SelectWrapper>
  );
};
