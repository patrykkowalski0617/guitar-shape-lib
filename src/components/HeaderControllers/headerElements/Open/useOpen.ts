import { useRef } from "react";
import {
  useDataKeyStore,
  useMetronomeStore,
  useMusicStore,
  useShapePlayerStore,
  type ShapePlayerBrick,
} from "@/store";
import { importBricksFromJson } from "@/components/ShapePlayer/helpers/importBricksFromJson";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";

export function useOpen() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setBricks = useShapePlayerStore((state) => state.setBricks);
  const setExerciseTitle = useShapePlayerStore(
    (state) => state.setExerciseTitle,
  );
  const isPlaying = useMetronomeStore((state) => state.isPlaying);

  const restoreCurrentBrick = useDataKeyStore(
    (state) => state.restoreCurrentBrick,
  );
  const setShapeVariantDataKeys = useMusicStore(
    (state) => state.setShapeVariantDataKeys,
  );
  const setShapeVariantDataKeys_locked = useMusicStore(
    (state) => state.setShapeVariantDataKeys_locked,
  );

  const applyImportedBricks = (
    guitarShapePlayerBricks: ShapePlayerBrick[],
    exerciseTitle: string | null,
  ) => {
    setBricks(guitarShapePlayerBricks);

    if (exerciseTitle) {
      setExerciseTitle(exerciseTitle);
    }

    const firstBrick = guitarShapePlayerBricks[0];
    if (firstBrick) {
      const orderedLocations = getOrderedShapeVariantDataKeys({
        guitarShapeDataKey: firstBrick.guitarShapeDataKey,
        unifiedMusicKeysDataKey: firstBrick.unifiedMusicKeysDataKey,
        semitoneOffsetFromMajorRoot: firstBrick.semitoneOffsetFromMajorRoot,
      });

      const sliderRange = firstBrick.sliderRange ?? [
        0,
        Math.max(0, orderedLocations.length - 1),
      ];

      const selectedShapesVariantDataKeys = orderedLocations.slice(
        sliderRange[0],
        sliderRange[1] + 1,
      );

      restoreCurrentBrick({
        baseChordDataKey: firstBrick.baseChordDataKey,
        unifiedMusicKeysDataKey: firstBrick.unifiedMusicKeysDataKey,
        semitoneOffsetFromMajorRoot: firstBrick.semitoneOffsetFromMajorRoot,
        selectedShapesVariantDataKeys,
      });
    }

    setShapeVariantDataKeys(null);
    setShapeVariantDataKeys_locked(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    importBricksFromJson({
      file,
      onSuccess: applyImportedBricks,
      onError: (msg) => console.error(msg),
    });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return { fileInputRef, isPlaying, handleFileChange, handleClick };
}
