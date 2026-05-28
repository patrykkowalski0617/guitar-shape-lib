import { useShapePlayerStore } from "@/store";
import { useTargetNotesSelect } from "./hooks/useTargetNotesSelect";
import { useShapePlayerTargetNotes } from "../ShapePlayer/ShapePlayerBrick/hooks";
import { getIntervalName } from "./utils";
import type { NoteMatrixProps } from "./types";
import { MultiSelect } from "@/components/ui";

export const TargetNotesSelect = ({
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

  const { columns } = useTargetNotesSelect({
    unifiedMusicKeysDataKey,
    baseChordDataKey,
    guitarShapeOffset,
    guitarShapeDataKey,
    targetNoteIndices,
    brickId,
  });

  const options = columns
    .filter(({ isInScale, isInShape }) => isInScale || isInShape)
    .map(({ index, noteName, isTargetNote, isShared, positionInChord }) => ({
      key: `option-${index}`,
      triggerLabel: getIntervalName(index) ?? noteName,
      optionLabel: noteName,
      intervalName: getIntervalName(index),
      isSelected: isTargetNote,
      isShared,
      positionInChord,
    }));

  return (
    <MultiSelect
      triggerPrefix={(count) =>
        count === 1 ? "Target note:" : "Target notes:"
      }
      $w={5}
      options={options}
      onToggle={(key) => {
        const opt = options.find((o) => o.key === key);
        if (opt) toggleTargetNote(opt.positionInChord);
      }}
      placeholder="Select target notes..."
    />
  );
};
