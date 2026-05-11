import { useControlsStore, useMusicStore } from "@/store";
import { useCurrentBaseChordName } from "@/hooks";
import { useSortedShapeOptions } from "./hooks/useSortedShapeOptions";

export default function ShapePicker() {
  const setShape = useControlsStore((state) => state.setShape);
  const setShapeVariantDataKeys = useMusicStore(
    (state) => state.setShapeVariantDataKeys,
  );
  const resetActiveLockedNoteIds = useMusicStore(
    (state) => state.resetActiveLockedNoteIds,
  );
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const setBaseChordDataKey = useControlsStore(
    (state) => state.setBaseChordDataKey,
  );
  const activeShapeDataKey = useControlsStore((state) => state.shapeDataKey);
  const activeOffset = useControlsStore(
    (state) => state.semitoneOffsetFromMajorRoot,
  );

  const options = useSortedShapeOptions();
  const selectedChordLabel = useCurrentBaseChordName();

  const activeValue = `${activeShapeDataKey}|${activeOffset}`;

  const handleSelectShape = (value: string) => {
    const [id, offsetStr] = value.split("|");
    const offset = parseInt(offsetStr, 10);

    setShapeVariantDataKeys(null);
    setShape(id, offset);
    resetActiveLockedNoteIds();
    setBaseChordDataKey(baseChordDataKey);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-center py-1 text-xs text-muted-foreground">
        Choose a shape to solo over the {selectedChordLabel} chord
      </div>
      <ul className="flex flex-col border rounded-md overflow-hidden">
        {options?.map((option) => {
          const isSelected = option.value === activeValue;

          return (
            <li
              key={option.value}
              onClick={() => handleSelectShape(option.value)}
              className={`
                px-4 py-2 text-sm cursor-pointer transition-colors
                ${isSelected ? "bg-primary text-primary-foreground" : "hover:bg-accent"}
              `}
            >
              <span className="opacity-50 mr-2">{option.labelRootNote}</span>
              <span>{option.labelShapeName}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
