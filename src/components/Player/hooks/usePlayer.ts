import { useCallback, useEffect } from "react";
import { useMetronome } from "./useMetronome";
import { usePlayerStore, useMusicStore, useControlsStore } from "@/store";

export function usePlayer() {
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const setTuneKeyId = useControlsStore((state) => state.setTuneKeyId);

  const bpm = usePlayerStore((state) => state.bpm);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isCountingIn = usePlayerStore((state) => state.isCountingIn);
  const bricks = usePlayerStore((state) => state.bricks);

  const nextStep = usePlayerStore((state) => state.nextStep);
  const handleTick = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);

  useEffect(() => {
    const isReadyToPrepareFretboard = isPlaying && isCountingIn;
    const firstBrick = bricks[0];

    if (isReadyToPrepareFretboard && firstBrick?.snapshot) {
      setShapeVariantLocationData(null);
      setShapeVariantLocationData_locked(
        firstBrick.snapshot.shapeVariantLocationData,
      );
      setTuneKeyId(firstBrick.snapshot.keyId);
    }
  }, [
    isPlaying,
    isCountingIn,
    bricks,
    setShapeVariantLocationData_locked,
    setShapeVariantLocationData,
    setTuneKeyId,
  ]);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);
}
