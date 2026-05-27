import { useDataKeyStore } from "@/store";
import { getFilteredAndFormatedShapes } from "../helpers/getFilteredAndFormatedShapes";
import { getGuitarShapeName } from "@/hooks/guitarShapes";

export const useShapeOptions = () => {
  const baseChordDataKey = useDataKeyStore((s) => s.baseChordDataKey);
  const unifiedMusicKeysDataKey = useDataKeyStore(
    (s) => s.unifiedMusicKeysDataKey,
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
