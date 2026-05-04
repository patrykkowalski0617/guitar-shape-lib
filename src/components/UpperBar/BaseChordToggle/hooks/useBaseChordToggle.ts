import { useControlsStore } from "@/store";
import { type BaseChordId, type TuneKeyId } from "@/data";

export function useBaseChordToggle() {
  const setToggleBaseChordId = useControlsStore(
    (state) => state.setToggleBaseChordId,
  );
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);
  const toggleBaseChordId = useControlsStore(
    (state) => state.toggleBaseChordId,
  );
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);

  const handleValueChange = (combinedValue: string | null) => {
    if (!combinedValue) {
      return;
    }

    const [newTuneKeyId, newBaseChordId] = combinedValue.split(":");

    setToggleBaseChordId(newBaseChordId as BaseChordId);
    setTuneKeyId(newTuneKeyId as TuneKeyId);
  };

  const handleKeyOnlyChange = (keyId: TuneKeyId) => {
    setTuneKeyId(keyId);
  };

  const currentCombinedValue = toggleBaseChordId
    ? `${tuneKeyId}:${toggleBaseChordId}`
    : "";

  return {
    currentValue: currentCombinedValue,
    handleValueChange,
    handleKeyOnlyChange,
    currentTuneKeyId: tuneKeyId,
  };
}
