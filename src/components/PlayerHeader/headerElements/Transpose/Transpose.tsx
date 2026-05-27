import { useShapePlayerStore, useDataKeyStore } from "@/store";
import { useRestoreBrick } from "@/hooks";
import { Button, FadeInOut } from "@/components/ui";
import { Minus, Plus } from "lucide-react";

export function Transpose() {
  const transposeShapePlayerBricks = useShapePlayerStore(
    (s) => s.transposeShapePlayerBricks,
  );
  const hasBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks.length > 0,
  );

  const { restore } = useRestoreBrick();

  const handleTranspose = (semitones: 1 | -1) => {
    const currentDataKeyState = useDataKeyStore.getState();
    const bricksBeforeTranspose =
      useShapePlayerStore.getState().guitarShapePlayerBricks;

    const activeBrickIndex = bricksBeforeTranspose.findIndex(
      (brick) =>
        brick.unifiedMusicKeysDataKey ===
          currentDataKeyState.unifiedMusicKeysDataKey &&
        brick.baseChordDataKey === currentDataKeyState.baseChordDataKey &&
        brick.semitoneOffsetFromMajorRoot ===
          currentDataKeyState.semitoneOffsetFromMajorRoot,
    );

    const indexToRestore = Math.max(0, activeBrickIndex);

    transposeShapePlayerBricks(semitones);

    const transposedBricks =
      useShapePlayerStore.getState().guitarShapePlayerBricks;
    const currentBrick = transposedBricks[indexToRestore];

    if (!currentBrick) return;

    restore(currentBrick);
  };

  return (
    <FadeInOut isVisible={hasBricks} isPersistent>
      <Button onClick={() => handleTranspose(-1)} disabled={!hasBricks}>
        <Minus />
      </Button>
      <Button onClick={() => handleTranspose(1)} disabled={!hasBricks}>
        <Plus />
      </Button>
    </FadeInOut>
  );
}
