import { useControlsStore, useMusicStore } from "@/store";
import { type BaseChordId, type TuneKeyId } from "@/data";

export function useBaseChordToggle() {
  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);

  const handleValueChange = (combinedValue: string | null) => {
    if (!combinedValue) {
      return;
    }

    const [newTuneKeyId, newBaseChordId] = combinedValue.split(":");

    setBaseChordId(newBaseChordId as BaseChordId);
    setTuneKeyId(newTuneKeyId as TuneKeyId);
  };

  const handleKeyOnlyChange = (tuneKeyId: TuneKeyId) => {
    setTuneKeyId(tuneKeyId);
    setShapeVariantLocationData(null);
    setShapeVariantLocationData_locked(null);
  };

  const currentCombinedValue = baseChordId ? `${tuneKeyId}:${baseChordId}` : "";

  return {
    currentValue: currentCombinedValue,
    handleValueChange,
    handleKeyOnlyChange,
    currentTuneKeyId: tuneKeyId,
  };
}
