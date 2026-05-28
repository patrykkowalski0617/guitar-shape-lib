import { useShapePlayerStore } from "@/store";
import { useMasterTargetNotesSelect } from "./hooks/useMasterTargetNotesSelect";
import { MultiSelect } from "@/components/ui";

export const MasterTargetNotesSelect = () => {
  const bricks = useShapePlayerStore((s) => s.guitarShapePlayerBricks);
  const { options, toggleMasterNote } = useMasterTargetNotesSelect();

  if (bricks.length === 0) return null;

  return (
    <MultiSelect
      options={options.map(
        ({ positionInChord, label, isShared, isTargetNote }) => ({
          key: `master-option-${positionInChord}`,
          triggerLabel: label,
          optionLabel: label,
          isSelected: isTargetNote,
          isShared,
          positionInChord,
        }),
      )}
      onToggle={(key) => {
        const positionInChord = parseInt(key.replace("master-option-", ""));
        toggleMasterNote(positionInChord);
      }}
      placeholder="Select target notes..."
    />
  );
};
