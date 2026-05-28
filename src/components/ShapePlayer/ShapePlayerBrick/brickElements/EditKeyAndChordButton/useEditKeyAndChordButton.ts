import { useShapePlayerStore, useUiStore, useDataKeyStore } from "@/store";
import { useShapePlayerBrickDisplay } from "../../hooks";
import { getBaseChordRoleNumName } from "@/hooks/baseChord/useBaseChordRoleNumName";
import { useUnifiedMusicKey } from "@/hooks";

export const useEditKeyAndChordButton = (id: string) => {
  const guitarShapePlayerBrick = useShapePlayerStore((state) =>
    state.guitarShapePlayerBricks.find((b) => b.id === id),
  );

  const { baseChordName } = useShapePlayerBrickDisplay(guitarShapePlayerBrick);

  const unifiedMusicKey = useUnifiedMusicKey(
    guitarShapePlayerBrick?.unifiedMusicKeysDataKey,
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

  const isMajorMode = guitarShapePlayerBrick?.isMajorMode ?? true;

  const roleNumName = guitarShapePlayerBrick
    ? getBaseChordRoleNumName(
        guitarShapePlayerBrick.baseChordDataKey,
        isMajorMode,
      )
    : "";

  const majorName = unifiedMusicKey?.majorName ?? "";
  const relativeMinorName = unifiedMusicKey?.relativeMinorName ?? "";

  return {
    buttonParts: {
      majorName,
      relativeMinorName,
      roleNumName,
      baseChordName: baseChordName ?? "",
      isMajorMode,
    },
    handleEditKeyAndChord,
  };
};
