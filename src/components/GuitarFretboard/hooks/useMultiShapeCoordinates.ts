import { useMetronomeStore, useDataKeyStore } from "@/store";
import {
  useCAGED_System,
  useBaseChordsShapes,
  useShapeCoordinates,
  useNextTargetShapeCoordinates,
  useBassNoteId,
} from "./";

export const useMultiShapeCoordinates = () => {
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const currentSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.selectedShapesVariantDataKeys,
  );
  const currentBaseChordDataKey = useDataKeyStore(
    (state) => state.baseChordDataKey,
  );
  const currentUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const nextSelectedShapesVariantDataKeys = useDataKeyStore(
    (state) => state.nextSelectedShapesVariantDataKeys,
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
