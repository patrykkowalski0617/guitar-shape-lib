import { useMetronomeStore, useDataKeyStore } from "@/store";
import {
  useCAGED_System,
  useBaseChordsShapes,
  useShapeCoordinates,
  useNextTargetShapeCoordinates,
  useBassNoteId,
} from "./";

export const useMultiShapeCoordinates = () => {
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const currentSelectedShapesVariantDataKeys = useDataKeyStore(
    (s) => s.selectedShapesVariantDataKeys,
  );
  const currentBaseChordDataKey = useDataKeyStore((s) => s.baseChordDataKey);
  const currentUnifiedMusicKeysDataKey = useDataKeyStore(
    (s) => s.unifiedMusicKeysDataKey,
  );
  const nextSelectedShapesVariantDataKeys = useDataKeyStore(
    (s) => s.nextSelectedShapesVariantDataKeys,
  );

  const getBaseChordsShapes = useBaseChordsShapes({
    baseChordDataKey: currentBaseChordDataKey,
    unifiedMusicKeysDataKey: currentUnifiedMusicKeysDataKey,
  });

  const getCAGED_System = useCAGED_System({
    baseChordDataKey: currentBaseChordDataKey,
    unifiedMusicKeysDataKey: currentUnifiedMusicKeysDataKey,
  });

  const coordinates = useShapeCoordinates({
    selectedShapesVariantDataKeys: currentSelectedShapesVariantDataKeys,
    getBaseChordsShapes,
    getCAGED_System,
  });

  const nextTargetShapeCoordinates = useNextTargetShapeCoordinates(
    nextSelectedShapesVariantDataKeys,
    isPlaying,
  );

  useBassNoteId({
    selectedShapesVariantDataKeys: currentSelectedShapesVariantDataKeys,
    getBaseChordsShapes,
  });

  return {
    ...coordinates,
    nextTargetShapeCoordinates,
  };
};
