import { useEffect, useMemo } from "react";
import { useShapeRootNote } from "@/hooks";
import {
  useControlsStore,
  useMusicStore,
  usePlayerStore,
  type ShapeVariantLocationData,
} from "@/store";
import { SHAPES, type TuneKeyId, type Shapes, type RoleId } from "@/data";
import { useApplySnapshotToStore } from "./useApplySnapshotToStore";

export type Snapshot = {
  keyId: TuneKeyId;
  isMajorMode: boolean;
  roleId: RoleId | null;
  shapeVariantLocationData: ShapeVariantLocationData | null;
  rootNote: string | null;
  shapeLabel: string | undefined;
  shapeSemitoneOffsetFromC: number | null;
  shapeId: string | null;
};

export function usePlayerSnapshot(
  brickId: number,
  isEditable: boolean,
  onToggleEdit: () => void,
) {
  const updateBrickSnapshot = usePlayerStore(
    (state) => state.updateBrickSnapshot,
  );
  const brick = usePlayerStore((state) =>
    state.bricks.find((b) => b.id === brickId),
  );

  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const roleId = useControlsStore((state) => state.roleId);
  const shapeId = useControlsStore((state) => state.shapeId);
  const shapeSemitoneOffsetFromC = useControlsStore(
    (state) => state.shapeSemitoneOffsetFromC,
  );
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const activeRootNote = useShapeRootNote();
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const applySnapshotToStore = useApplySnapshotToStore();

  const activeShape = SHAPES[shapeId as keyof Shapes] || null;

  const currentLiveState: Snapshot = useMemo(
    () => ({
      keyId: tuneKeyId,
      isMajorMode,
      roleId,
      shapeVariantLocationData,
      rootNote: activeRootNote,
      shapeLabel: activeShape?.label,
      shapeSemitoneOffsetFromC,
      shapeId,
    }),
    [
      tuneKeyId,
      isMajorMode,
      roleId,
      shapeVariantLocationData,
      activeRootNote,
      activeShape,
      shapeSemitoneOffsetFromC,
      shapeId,
    ],
  );

  useEffect(() => {
    const prefix = `[EFFECT][Brick:${brickId}]`;

    if (!isEditable) {
      // Logujemy tylko raz przy zmianie na false, żeby nie spamować
      return;
    }

    if (!brick) {
      console.warn(`${prefix} Brick not found in store!`);
      return;
    }

    const currentStoredSnapshot = brick.snapshot;
    const isSame =
      JSON.stringify(currentStoredSnapshot) ===
      JSON.stringify(currentLiveState);

    console.log(`${prefix} Checking update...`, {
      isEditable,
      hasStoredSnapshot: !!currentStoredSnapshot,
      isSameWithLive: isSame,
      storedData: JSON.stringify(currentStoredSnapshot),
      liveData: JSON.stringify(currentLiveState),
    });

    if (isSame) {
      console.log(`${prefix} Update skipped: Data is identical.`);
      return;
    }

    console.log(`${prefix} ACTION: updateBrickSnapshot called!`);
    updateBrickSnapshot(brickId, currentLiveState);
  }, [isEditable, currentLiveState, brickId, updateBrickSnapshot, brick]);

  // DIAGNOSTYKA RENDERU
  const displayData = isEditable
    ? currentLiveState
    : brick?.snapshot || currentLiveState;

  const lockedSnapshot = brick?.snapshot || currentLiveState;

  console.log(`[RENDER][Brick:${brickId}]`, {
    isEditable,
    source: isEditable ? "LIVE" : brick?.snapshot ? "STORE" : "FALLBACK_LIVE",
    displayRootNote: displayData.rootNote,
    fullDisplayData: JSON.stringify(displayData),
  });

  const handleClick = (e: React.MouseEvent) => {
    const prefix = `[CLICK][Brick:${brickId}]`;
    console.log(`${prefix} Clicked!`, { isEditable });

    e.stopPropagation();

    console.log(`${prefix} Setting location lock...`);
    setShapeVariantLocationData_locked(shapeVariantLocationData);

    if (!isEditable && lockedSnapshot.rootNote !== null) {
      console.log(`${prefix} ACTION: applySnapshotToStore called!`, {
        snapshotToApply: JSON.stringify(lockedSnapshot),
      });
      applySnapshotToStore(lockedSnapshot);
    }

    console.log(`${prefix} Calling onToggleEdit...`);
    onToggleEdit();
  };

  return {
    isEditable,
    displayData,
    handleClick,
    lockedSnapshot,
    applySnapshotToStore,
  };
}
