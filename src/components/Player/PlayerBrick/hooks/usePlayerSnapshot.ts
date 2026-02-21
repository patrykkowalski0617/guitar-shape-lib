import { useState } from "react";
import { useShapeRootNote } from "@/hooks/useShapeRootNote";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore, type ShapeVariantLocationData } from "@/store/useMusicStore";
import { shapes, type MusicKeyId, type RoleId, type Shapes } from "@/data";

export type Snapshot = {
  keyId: MusicKeyId;
  isMajorMode: boolean;
  currentRoleId: RoleId | null;
  currentShapeVariantLocationData: ShapeVariantLocationData | null;
  rootNote: string | null;
  shapeLabel: string | undefined;
  currentShapeSemitoneOffsetFromC: number | null;
  currentShapeId: string | null;
};

export function usePlayerSnapshot(isEditable: boolean, onToggleEdit: () => void) {
  // --- STORE DATA (LIVE) ---
  const currentKeyId = useControlsStore((s) => s.currentKeyId);
  const isMajorMode = useControlsStore((s) => s.isMajorMode);
  const currentRoleId = useControlsStore((s) => s.currentRoleId);
  const currentShapeId = useControlsStore((s) => s.currentShapeId);
  const currentShapeSemitoneOffsetFromC = useControlsStore((s) => s.currentShapeSemitoneOffsetFromC);
  const currentShapeVariantLocationData = useMusicStore((s) => s.currentShapeVariantLocationData);
  const activeRootNote = useShapeRootNote();

  const setCurrentKey = useControlsStore((s) => s.setCurrentKey);
  const setCurrentRoleId = useControlsStore((s) => s.setCurrentRoleId);
  const setIsMajorMode = useControlsStore((s) => s.setIsMajorMode);
  const setShape = useControlsStore((s) => s.setShape);
  const setCurrentShapeVariantLocationData = useMusicStore((s) => s.setCurrentShapeVariantLocationData);

  const activeShape = shapes[currentShapeId as keyof Shapes] || null;

  const currentLiveState: Snapshot = {
    keyId: currentKeyId,
    isMajorMode,
    currentRoleId,
    currentShapeVariantLocationData,
    rootNote: activeRootNote,
    shapeLabel: activeShape?.label,
    currentShapeSemitoneOffsetFromC,
    currentShapeId,
  };

  // --- STATE ---
  const [lockedSnapshot, setLockedSnapshot] = useState<Snapshot>(() => ({
    ...currentLiveState,
  }));

  // --- SYNCHRONIZACJA (PODCZAS RENDERU - BEZPIECZNA) ---
  // Jeśli jesteśmy w trybie edycji, "pompujemy" dane z Live do snapshotu.
  // Dzięki temu w momencie, gdy isEditable zmieni się na false (klikniesz inną cegiełkę),
  // lockedSnapshot posiada już ostatnie zmiany, które wprowadziłeś.
  if (isEditable) {
    // Sprawdzamy czy dane się różnią, żeby nie zapętlić renderu (choć React i tak to zoptymalizuje)
    if (
      lockedSnapshot.currentShapeVariantLocationData !== currentLiveState.currentShapeVariantLocationData ||
      lockedSnapshot.rootNote !== currentLiveState.rootNote
    ) {
      setLockedSnapshot({ ...currentLiveState });
    }
  }

  const displayData = isEditable ? currentLiveState : lockedSnapshot;

  const applySnapshotToStore = (data: Snapshot) => {
    setCurrentShapeVariantLocationData(data.currentShapeVariantLocationData);
    setCurrentKey(data.keyId);
    setCurrentRoleId(data.currentRoleId);
    setIsMajorMode(data.isMajorMode);
    setShape(data.currentShapeId, data.currentShapeSemitoneOffsetFromC);
  };

  // --- HANDLERS ---
  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isEditable) {
      // Wchodzimy w edycję: Najpierw wczytujemy stan cegiełki do aplikacji
      applySnapshotToStore(lockedSnapshot);
    }
    // Przy wychodzeniu z edycji (Save) snapshot jest już aktualny dzięki synchronizacji powyżej
    onToggleEdit();
  };

  const logLockedData = () => {
    if (isEditable) return;
    applySnapshotToStore(lockedSnapshot);
  };

  return {
    isEditable,
    displayData,
    toggleLock,
    logLockedData,
  };
}
