import { useControlsStore } from "@/store";
import { shapes, type Shapes, UNIFIED_MUSIC_KEYS, type Note } from "@/data";
import { getNotes } from "@/utils";
import { getFilteredShapeOptions } from "../helpers/getFilteredShapeOptions";

export const useShapeOptions = () => {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const roleId = useControlsStore((state) => state.roleId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);

  const musicKey = UNIFIED_MUSIC_KEYS[tuneKeyId];
  if (!musicKey) return [];

  const relativeScale = getNotes({ firstNote: tuneKeyId as Note, length: 12 });

  const rawOptions = getFilteredShapeOptions(roleId, isMajorMode, tuneKeyId);

  return rawOptions.map(({ shapeId, shapeSemitoneOffsetFromC }) => {
    const shape = shapes[shapeId as keyof Shapes];

    const noteIndex = ((shapeSemitoneOffsetFromC % 12) + 12) % 12;
    const noteObj = relativeScale[noteIndex];

    const rootNote = musicKey.isFlatTune ? noteObj.flatNoteName : noteObj.sharpNoteName;

    return {
      value: `${shapeId}|${shapeSemitoneOffsetFromC}`,
      labelRootNote: rootNote,
      labelShapeName: `${shape.label} ${shape.type}`,
    };
  });
};
