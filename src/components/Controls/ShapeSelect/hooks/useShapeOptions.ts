import { useControlsStore } from "@/store";
import { shapes, type Shapes, UNIFIED_MUSIC_KEYS, type Note } from "@/data";
import { getNotes } from "@/utils";
import { getFilteredShapeOptions } from "../helpers/getFilteredShapeOptions";

export const useShapeOptions = () => {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);

  const musicKey = UNIFIED_MUSIC_KEYS[currentKeyId];
  if (!musicKey) return [];

  const relativeScale = getNotes({ firstNote: currentKeyId as Note, length: 12 });

  const rawOptions = getFilteredShapeOptions(currentRoleId, isMajorMode, currentKeyId);

  return rawOptions.map(({ shapeId, offset }) => {
    const shape = shapes[shapeId as keyof Shapes];

    const noteIndex = ((offset % 12) + 12) % 12;
    const noteObj = relativeScale[noteIndex];

    const rootNote = musicKey.isFlatTune ? noteObj.flatNoteName : noteObj.sharpNoteName;

    return {
      value: `${shapeId}|${offset}`,
      labelRootNote: rootNote,
      labelShapeName: `${shape.label} ${shape.type}`,
    };
  });
};
