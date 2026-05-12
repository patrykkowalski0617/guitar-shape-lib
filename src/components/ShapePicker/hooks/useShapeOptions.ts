import { useDataKeyStore } from "@/store";
import { SHAPES, UNIFIED_MUSIC_KEYS } from "@/data";
import { getNotes } from "@/utils";
import { getFilteredAndFormatedShapes } from "../helpers/getFilteredAndFormatedShapes";

export const useShapeOptions = () => {
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const filteredAndFormatedShapes =
    getFilteredAndFormatedShapes(baseChordDataKey);

  if (!unifiedMusicKeysDataKey) return null;

  const musicKey = UNIFIED_MUSIC_KEYS[unifiedMusicKeysDataKey];

  const relativeScale = getNotes({
    firstNote: unifiedMusicKeysDataKey,
    length: 12,
  });

  const options = filteredAndFormatedShapes.map(
    ({ shapeDataKey, semitoneOffsetFromMajorRoot }) => {
      const shape = SHAPES[shapeDataKey];

      const noteIndex = ((semitoneOffsetFromMajorRoot % 12) + 12) % 12;
      const noteObj = relativeScale[noteIndex];

      const rootNote = musicKey.isFlatTune
        ? noteObj.flatNoteName
        : noteObj.sharpNoteName;

      return {
        value: `${shapeDataKey}|${semitoneOffsetFromMajorRoot}`,
        labelRootNote: rootNote,
        labelShapeName: `${shape.label} ${shape.type}`,
      };
    },
  );

  return options;
};
