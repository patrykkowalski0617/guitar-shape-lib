import { useShapePlayerStore, useUiStore, useDataKeyStore } from "@/store";
import { useShapePlayerBrickDisplay } from "../../hooks";

export const useEditShapeButton = (id: string) => {
  const guitarShapePlayerBrick = useShapePlayerStore((state) =>
    state.guitarShapePlayerBricks.find((b) => b.id === id),
  );

  const { guitarShapeName } = useShapePlayerBrickDisplay(
    guitarShapePlayerBrick,
  );

  const setEditingBrickId = useUiStore((s) => s.setEditingBrickId);
  const setKeyAndChordPickerExpanded = useUiStore(
    (s) => s.setKeyAndChordPickerExpanded,
  );
  const setShapePickerExpanded = useUiStore((s) => s.setShapePickerExpanded);

  const setBaseChordDataKey = useDataKeyStore((s) => s.setBaseChordDataKey);
  const setUnifiedMusicKeysDataKey = useDataKeyStore(
    (s) => s.setUnifiedMusicKeysDataKey,
  );
  const setShapeDataKey = useDataKeyStore((s) => s.setShapeDataKey);
  const setSemitoneOffsetFromMajorRoot = useDataKeyStore(
    (s) => s.setSemitoneOffsetFromMajorRoot,
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
