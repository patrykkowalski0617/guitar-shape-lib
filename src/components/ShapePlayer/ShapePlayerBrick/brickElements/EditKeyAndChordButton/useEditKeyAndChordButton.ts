import { useShapePlayerStore, useUiStore, useDataKeyStore } from "@/store";
import { useShapePlayerBrickDisplay } from "../../hooks";

export const useEditKeyAndChordButton = (
  id: string,
  displayMode: "key" | "chord",
) => {
  const guitarShapePlayerBrick = useShapePlayerStore((state) =>
    state.guitarShapePlayerBricks.find((b) => b.id === id),
  );

  const { keyName, baseChordName } = useShapePlayerBrickDisplay(
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

  const handleEditKeyAndChord = () => {
    if (!guitarShapePlayerBrick) return;

    setEditingBrickId(id);
    setUnifiedMusicKeysDataKey(guitarShapePlayerBrick.unifiedMusicKeysDataKey);
    setBaseChordDataKey(guitarShapePlayerBrick.baseChordDataKey);
    setKeyAndChordPickerExpanded(true);
    setShapePickerExpanded(false);
  };

  const buttonText = displayMode === "key" ? keyName : baseChordName;

  return { buttonText, handleEditKeyAndChord };
};
