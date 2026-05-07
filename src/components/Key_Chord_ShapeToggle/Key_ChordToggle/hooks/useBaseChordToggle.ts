import { useControlsStore } from "@/store";
import { type BaseChordId, type TuneKeyId } from "@/data";

export function useBaseChordToggle() {
  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
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
  };

  const currentCombinedValue = baseChordId ? `${tuneKeyId}:${baseChordId}` : "";

  return {
    currentValue: currentCombinedValue,
    handleValueChange,
    handleKeyOnlyChange,
    currentTuneKeyId: tuneKeyId,
  };
}
