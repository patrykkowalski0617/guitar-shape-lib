import { Button } from "@/components/ui/parts";
import { useShapePlayerStore, useDataKeyStore } from "@/store";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";

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

  const handleTranspose = (semitones: 1 | -1) => {
    transposeShapePlayerBricks(semitones);

    const firstBrick =
      useShapePlayerStore.getState().guitarShapePlayerBricks[0];
    if (!firstBrick) return;

    const orderedLocations = getOrderedShapeVariantDataKeys({
      guitarShapeDataKey: firstBrick.guitarShapeDataKey,
      unifiedMusicKeysDataKey: firstBrick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: firstBrick.semitoneOffsetFromMajorRoot,
    });

    const sliderRange = firstBrick.sliderRange ?? [
      0,
      Math.max(0, orderedLocations.length - 1),
    ];

    restoreCurrentBrick({
      baseChordDataKey: firstBrick.baseChordDataKey,
      unifiedMusicKeysDataKey: firstBrick.unifiedMusicKeysDataKey,
      semitoneOffsetFromMajorRoot: firstBrick.semitoneOffsetFromMajorRoot,
      selectedShapesVariantDataKeys: orderedLocations.slice(
        sliderRange[0],
        sliderRange[1] + 1,
      ),
    });
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
