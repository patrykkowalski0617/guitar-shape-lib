import { useShapePlayerStore, useUiStore, useDataKeyStore } from "@/store";
import { useShapePlayerBrickDisplay } from "../../hooks";

export const useEditShapeButton = (id: string) => {
  const guitarShapePlayerBrick = useShapePlayerStore((state) =>
    state.guitarShapePlayerBricks.find((b) => b.id === id),
  );

  const { guitarShapeName } = useShapePlayerBrickDisplay(
    guitarShapePlayerBrick,
  );

  const setEditingBrickId = useUiStore((state) => state.setEditingBrickId);
  const setKeyAndChordPickerExpanded = useUiStore(
    (state) => state.setKeyAndChordPickerExpanded,
  );
  const setShapePickerExpanded = useUiStore(
    (state) => state.setShapePickerExpanded,
  );

  const setBaseChordDataKey = useDataKeyStore(
    (state) => state.setBaseChordDataKey,
  );
  const setUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.setUnifiedMusicKeysDataKey,
  );
  const setShapeDataKey = useDataKeyStore((state) => state.setShapeDataKey);
  const setSemitoneOffsetFromMajorRoot = useDataKeyStore(
    (state) => state.setSemitoneOffsetFromMajorRoot,
  );

  const handleEditShape = () => {
    if (!guitarShapePlayerBrick) return;

    setEditingBrickId(id);
    setUnifiedMusicKeysDataKey(guitarShapePlayerBrick.unifiedMusicKeysDataKey);
    setBaseChordDataKey(guitarShapePlayerBrick.baseChordDataKey);
    setShapeDataKey(guitarShapePlayerBrick.guitarShapeDataKey);
    setSemitoneOffsetFromMajorRoot(
      guitarShapePlayerBrick.semitoneOffsetFromMajorRoot,
    );
    setShapePickerExpanded(true);
    setKeyAndChordPickerExpanded(false);
  };

  return { guitarShapeName, handleEditShape };
};
