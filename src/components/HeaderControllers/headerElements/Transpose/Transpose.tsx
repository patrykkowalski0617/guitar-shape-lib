import { Button } from "@/components/ui/parts";
import { useShapePlayerStore, useDataKeyStore, useMusicStore } from "@/store";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";
import { resolveTargetSharpNoteNames } from "@/utils";

export function Transpose() {
  const transposeShapePlayerBricks = useShapePlayerStore(
    (state) => state.transposeShapePlayerBricks,
  );
  const hasBricks = useShapePlayerStore(
    (state) => state.guitarShapePlayerBricks.length > 0,
  );
  const restoreCurrentBrick = useDataKeyStore(
    (state) => state.restoreCurrentBrick,
  );
  const replaceTargetSharpNoteNames = useMusicStore(
    (state) => state.replaceTargetSharpNoteNames,
  );

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

    const orderedLocations = getOrderedShapeVariantDataKeys({
      guitarShapeDataKey: currentBrick.guitarShapeDataKey,
      unifiedMusicKeysDataKey: currentBrick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: currentBrick.semitoneOffsetFromMajorRoot,
    });

    const sliderRange = currentBrick.sliderRange ?? [
      0,
      Math.max(0, orderedLocations.length - 1),
    ];

    const selectedShapesVariantDataKeys = orderedLocations.slice(
      sliderRange[0],
      sliderRange[1] + 1,
    );

    restoreCurrentBrick({
      baseChordDataKey: currentBrick.baseChordDataKey,
      unifiedMusicKeysDataKey: currentBrick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: currentBrick.semitoneOffsetFromMajorRoot,
      selectedShapesVariantDataKeys,
    });

    const sharpNoteNames = resolveTargetSharpNoteNames(
      currentBrick.unifiedMusicKeysDataKey,
      currentBrick.baseChordDataKey,
      currentBrick.guitarShapeDataKey,
      currentBrick.semitoneOffsetFromMajorRoot,
      currentBrick.targetNoteIndices ?? [1],
    );

    replaceTargetSharpNoteNames(sharpNoteNames);
  };

  return (
    <div>
      <Button onClick={() => handleTranspose(-1)} disabled={!hasBricks}>
        -
      </Button>
      <Button onClick={() => handleTranspose(1)} disabled={!hasBricks}>
        +
      </Button>
    </div>
  );
}
