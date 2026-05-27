import { useShapePlayerStore, useUiStore, useDataKeyStore } from "@/store";
import { useShapePlayerBrickDisplay } from "../../hooks";
import { getBaseChordRoleNumName } from "@/hooks/baseChord/useBaseChordRoleNumName";

export const useEditKeyAndChordButton = (id: string) => {
  const guitarShapePlayerBrick = useShapePlayerStore((state) =>
    state.guitarShapePlayerBricks.find((b) => b.id === id),
  );

  const { keyName, baseChordName } = useShapePlayerBrickDisplay(
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

  const handleEditKeyAndChord = () => {
    if (!guitarShapePlayerBrick) return;

    setEditingBrickId(id);
    setUnifiedMusicKeysDataKey(guitarShapePlayerBrick.unifiedMusicKeysDataKey);
    setBaseChordDataKey(guitarShapePlayerBrick.baseChordDataKey);
    setKeyAndChordPickerExpanded(true);
    setShapePickerExpanded(false);
  };

  const roleNumName = guitarShapePlayerBrick
    ? getBaseChordRoleNumName(
        guitarShapePlayerBrick.baseChordDataKey,
        guitarShapePlayerBrick.isMajorMode,
      )
    : "";

  const buttonText = `${roleNumName ? `${roleNumName} ` : ""}${keyName} ${baseChordName}`;

  return { buttonText, handleEditKeyAndChord };
};
