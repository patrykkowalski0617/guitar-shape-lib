import { useControlsStore } from "@/store";
import { SHAPES, type Shapes, UNIFIED_MUSIC_KEYS, type Note } from "@/data";
import { getNotes } from "@/utils";
import { getFilteredAndFormatedShapes } from "../helpers/getFilteredAndFormatedShapes";

export const useShapeOptions = () => {
  const baseChordId = useControlsStore((state) => state.baseChordId);
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const filteredAndFormatedShapes = getFilteredAndFormatedShapes(baseChordId);

  const musicKey = UNIFIED_MUSIC_KEYS[tuneKeyId];
  if (!musicKey) return null;

  const relativeScale = getNotes({ firstNote: tuneKeyId as Note, length: 12 });

  const options = filteredAndFormatedShapes.map(
    ({ shapeId, semitoneOffsetFromMajorTonicRoot }) => {
      const shape = SHAPES[shapeId as keyof Shapes];

      const noteIndex = ((semitoneOffsetFromMajorTonicRoot % 12) + 12) % 12;
      const noteObj = relativeScale[noteIndex];

      const rootNote = musicKey.isFlatTune
        ? noteObj.flatNoteName
        : noteObj.sharpNoteName;

      return {
        value: `${shapeId}|${semitoneOffsetFromMajorTonicRoot}`,
        labelRootNote: rootNote,
        labelShapeName: `${shape.label} ${shape.type}`,
      };
    },
  );

  return options;
};
