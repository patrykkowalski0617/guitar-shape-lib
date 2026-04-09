import { useControlsStore, useMusicStore } from "@/store";
import { type BaseChordId, type TuneKeyId } from "@/data";

export function useBaseChordToggle() {
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
  const setShape = useControlsStore((state) => state.setShape);
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);

  const handleValueChange = (combinedValue: string | null) => {
    setShapeVariantLocationData(null);
    if (combinedValue !== "") {
      setShape(null, null);
    }
    if (!combinedValue) {
      return;
    }

    const [newTuneKeyId, newBaseChordId] = combinedValue.split(":");

    setBaseChordId(newBaseChordId as BaseChordId);
    setTuneKeyId(newTuneKeyId as TuneKeyId);
  };

  const handleKeyOnlyChange = (keyId: TuneKeyId) => {
    setTuneKeyId(keyId);
  };

  const currentCombinedValue = baseChordId ? `${tuneKeyId}:${baseChordId}` : "";

  return {
    currentValue: currentCombinedValue,
    handleValueChange,
    handleKeyOnlyChange,
    currentTuneKeyId: tuneKeyId,
  };
}
