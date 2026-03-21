import { useControlsStore, useMusicStore } from "@/store";
import { type BaseChordId } from "@/data";

export function useBaseChordToggle() {
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);
  const baseChordId = useControlsStore((state) => state.baseChordId);

  const handleValueChange = (value: string | null) => {
    setShapeVariantLocationData(null);

    const newBaseChordId = value ? (value as BaseChordId) : null;
    setBaseChordId(newBaseChordId);
  };

  return {
    currentValue: baseChordId,
    handleValueChange,
  };
}
