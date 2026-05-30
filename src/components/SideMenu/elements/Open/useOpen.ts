import { useRef } from "react";
import {
  useMetronomeStore,
  useMusicStore,
  useShapePlayerStore,
  type ShapePlayerBrick,
} from "@/store";
import { importBricksFromJson } from "@/components/ShapePlayer/helpers/importBricksFromJson";
import { useRestoreBrick } from "@/hooks";

export function useOpen(onClose?: () => void) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setBricks = useShapePlayerStore((s) => s.setBricks);
  const setExerciseTitle = useShapePlayerStore((s) => s.setExerciseTitle);
  const isPlaying = useMetronomeStore((s) => s.isPlaying);

  const setShapeVariantDataKeys = useMusicStore(
    (s) => s.setShapeVariantDataKeys,
  );
  const setShapeVariantDataKeys_locked = useMusicStore(
    (s) => s.setShapeVariantDataKeys_locked,
  );
  const { restore } = useRestoreBrick();

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
      restore(firstBrick);
    }

    setShapeVariantDataKeys(null);
    setShapeVariantDataKeys_locked(null);

    if (fileInputRef.current) fileInputRef.current.value = "";

    onClose?.();
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
