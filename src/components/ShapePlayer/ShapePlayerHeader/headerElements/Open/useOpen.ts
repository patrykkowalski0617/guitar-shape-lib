import { useRef } from "react";
import {
  useDataKeyStore,
  useMetronomeStore,
  useMusicStore,
  useShapePlayerStore,
  type ShapePlayerBrick,
} from "@/store";
import { importBricksFromJson } from "@/components/ShapePlayer/helpers/importBricksFromJson";

export function useOpen() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setBricks = useShapePlayerStore((state) => state.setBricks);
  const setExerciseTitle = useShapePlayerStore(
    (state) => state.setExerciseTitle,
  );
  const isPlaying = useMetronomeStore((state) => state.isPlaying);

  const setUnifiedMusicKeysDataKey = useDataKeyStore(
    (state) => state.setUnifiedMusicKeysDataKey,
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
      setUnifiedMusicKeysDataKey(firstBrick.unifiedMusicKeysDataKey);
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
