import { useDataKeyStore } from "@/store";
import { getFilteredAndFormatedShapes } from "../helpers/getFilteredAndFormatedShapes";
import { useShape } from "@/hooks/useShape";

export const useShapeOptions = () => {
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const { getShapeName } = useShape();

  const filteredAndFormatedShapes =
    getFilteredAndFormatedShapes(baseChordDataKey);

  if (!unifiedMusicKeysDataKey) return null;

  const options = filteredAndFormatedShapes.map(
    ({ shapeDataKey, semitoneOffsetFromMajorRoot }) => {
      const { shapeNoteName, shapeLabel, shapeType } = getShapeName({
        semitoneOffsetFromMajorRoot,
        unifiedMusicKeysDataKey,
        shapeDataKey,
      });

      const value = `${shapeDataKey}|${semitoneOffsetFromMajorRoot}`;
      const labelShapeName = `${shapeLabel ?? ""} ${shapeType ?? ""}`.trim();

      return {
        value,
        labelRootNote: shapeNoteName,
        labelShapeName,
      };
    },
  );

  return options;
};
