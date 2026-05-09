import { useEffect, useMemo } from "react";
import { useControlsStore, useMusicStore, usePlayerStore } from "@/store";
import {
  type UnifiedMusicKeysDataKeys,
  type BaseChordDataKey,
  type ShapeVariantDataKeys,
} from "@/data";
import { useApplySnapshotToStore } from "./useApplySnapshotToStore";

export type Snapshot = {
  unifiedMusicKeysDataKey: UnifiedMusicKeysDataKeys;
  baseChordDataKey: BaseChordDataKey;
  shapeVariantDataKeys: ShapeVariantDataKeys;
};

export function usePlayerSnapshot(brickId: number, isEditable: boolean) {
  const updateBrickSnapshot = usePlayerStore(
    (state) => state.updateBrickSnapshot,
  );
  const brick = usePlayerStore((state) =>
    state.bricks.find((b) => b.id === brickId),
  );

  const unifiedMusicKeysDataKey = useControlsStore(
    (state) => state.unifiedMusicKeysDataKey,
  );
  const baseChordDataKey = useControlsStore((state) => state.baseChordDataKey);
  const shapeVariantDataKeys = useMusicStore(
    (state) => state.shapeVariantDataKeys,
  );

  const setShapeVariantDataKeys_locked = useMusicStore(
    (state) => state.setShapeVariantDataKeys_locked,
  );
  const applySnapshotToStore = useApplySnapshotToStore();

  const currentLiveState: Snapshot = useMemo(
    () => ({
      unifiedMusicKeysDataKey: unifiedMusicKeysDataKey,
      baseChordDataKey,
      shapeVariantDataKeys,
    }),
    [unifiedMusicKeysDataKey, baseChordDataKey, shapeVariantDataKeys],
  );

  useEffect(() => {
    if (!isEditable) {
      return;
    }

    if (!brick) {
      return;
    }

    const currentStoredSnapshot = brick.snapshot;
    const isSame =
      JSON.stringify(currentStoredSnapshot) ===
      JSON.stringify(currentLiveState);

    if (isSame) {
      return;
    }

    updateBrickSnapshot(brickId, currentLiveState);
  }, [isEditable, currentLiveState, brickId, updateBrickSnapshot, brick]);

  const displayData = isEditable
    ? currentLiveState
    : brick?.snapshot || currentLiveState;

  const lockedSnapshot = brick?.snapshot || currentLiveState;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setShapeVariantDataKeys_locked(shapeVariantDataKeys);
  };

  return {
    isEditable,
    displayData,
    handleClick,
    lockedSnapshot,
    applySnapshotToStore,
  };
}
