import { useDataKeyStore } from "@/store";
import { getFilteredAndFormatedShapes } from "../helpers/getFilteredAndFormatedShapes";
import { getGuitarShapeName } from "@/hooks/guitarShapes/utils";

export const useShapeOptions = () => {
  const baseChordDataKey = useDataKeyStore((state) => state.baseChordDataKey);
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );

  const filteredAndFormatedShapes =
    getFilteredAndFormatedShapes(baseChordDataKey);

  if (!unifiedMusicKeysDataKey) return null;

  const options = filteredAndFormatedShapes.map(
    ({ guitarShapeDataKey, semitoneOffsetFromMajorRoot }) => {
      const { guitarShapeNoteName, guitarShapeLabel, guitarShapeType } =
        getGuitarShapeName({
          guitarShapeDataKey,
          unifiedMusicKeysDataKey,
          semitoneOffsetFromMajorRoot,
        });

      const value = `${guitarShapeDataKey}|${semitoneOffsetFromMajorRoot}`;
      const labelShapeName =
        `${guitarShapeLabel ?? ""} ${guitarShapeType ?? ""}`.trim();

      return {
        value,
        labelRootNote: guitarShapeNoteName,
        labelShapeName,
      };
    },
  );

  return options;
};
