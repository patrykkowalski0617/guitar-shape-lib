import { useControlsStore, usePlayerStore } from "@/store";
import { UNIFIED_MUSIC_KEYS } from "@/data";
import { ROLE_AND_MODE_BASE_COORDINATES } from "../constants/constants";

export const useBaseChordCoords = () => {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  if (isPlaying || shapeId) return [];

  const tuneKeyOffsetFromC = UNIFIED_MUSIC_KEYS[tuneKeyId].offsetFromC;

  const baseChordCellsCoords = ROLE_AND_MODE_BASE_COORDINATES.map(
    ([stringIdx, fretIdx]) => [stringIdx, fretIdx + tuneKeyOffsetFromC],
  );

  return baseChordCellsCoords;
};
