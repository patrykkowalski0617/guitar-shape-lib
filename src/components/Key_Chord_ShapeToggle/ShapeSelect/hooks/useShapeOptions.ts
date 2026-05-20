import { useControlsStore } from "@/store";
import { type NoteName, SHAPES, type Shapes, UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";
import { getFilteredAndFormatedShapes } from "../helpers/getFilteredAndFormatedShapes";

export const useShapeOptions = () => {
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const filteredAndFormatedShapes =
    getFilteredAndFormatedShapes(baseChordDataKey);

  const musicKey = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey];
  if (!musicKey) return null;

  const relativeScale = getNotes({
    firstNote: unifiedMusicKeysDataKey as NoteName,
    length: 12,
  });

  const options = filteredAndFormatedShapes.map(
    ({ shapeDataKey, semitoneOffsetFromMajorTonicRoot }) => {
      const shape = SHAPES[shapeDataKey as keyof Shapes];

      const noteIndex = ((semitoneOffsetFromMajorTonicRoot % 12) + 12) % 12;
      const noteObj = relativeScale[noteIndex];

      const rootNote = musicKey.isFlatTune
        ? noteObj.flatNoteName
        : noteObj.sharpNoteName;

      return {
        value: `${shapeDataKey}|${semitoneOffsetFromMajorTonicRoot}`,
        labelRootNote: rootNote,
        labelShapeName: `${shape.label} ${shape.type}`,
      };
    },
  );

  return options;
};
