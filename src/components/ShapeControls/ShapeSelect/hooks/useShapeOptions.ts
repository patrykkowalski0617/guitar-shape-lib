import { useControlsStore } from "@/store";
import { shapes, type Shapes, UNIFIED_MUSIC_KEYS, type Note } from "@/data";
import { getNotes } from "@/utils";
import { getFilteredAndFormatedShapes } from "../helpers/getFilteredAndFormatedShapes";

export const useShapeOptions = () => {
  const toggleBaseChordId = useControlsStore(
    (state) => state.toggleBaseChordId,
  );
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const filteredAndFormatedShapes =
    getFilteredAndFormatedShapes(toggleBaseChordId);

  const musicKey = UNIFIED_MUSIC_KEYS[tuneKeyId];
  if (!musicKey) return null;

  const relativeScale = getNotes({ firstNote: tuneKeyId as Note, length: 12 });

  const options = filteredAndFormatedShapes.map(
    ({ shapeId, shapeSemitoneOffsetFromC }) => {
      const shape = shapes[shapeId as keyof Shapes];

      const noteIndex = ((shapeSemitoneOffsetFromC % 12) + 12) % 12;
      const noteObj = relativeScale[noteIndex];

      const rootNote = musicKey.isFlatTune
        ? noteObj.flatNoteName
        : noteObj.sharpNoteName;

      return {
        value: `${shapeId}|${shapeSemitoneOffsetFromC}`,
        labelRootNote: rootNote,
        labelShapeName: `${shape.label} ${shape.type}`,
      };
    },
  );

  return options;
};
