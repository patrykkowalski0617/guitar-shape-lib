import { useCallback, useEffect, useRef } from "react";
import { useMetronome } from "./useMetronome";
import { usePlayerStore, useMusicStore, useControlsStore } from "@/store";

export function usePlayer() {
  const setEditableBrickId = usePlayerStore(
    (state) => state.setEditableBrickId,
  );
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
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
    return nextStep();
  }, [nextStep]);

  const { toggleMetronome } = useMetronome(bpm, handleTick);

  const hasPreparedCountInRef = useRef(false);

  useEffect(() => {
    if (!isPlaying) {
      hasPreparedCountInRef.current = false;
    }

    if (bricks.length === 0) {
      setShapeVariantLocationData(null);
      setShapeVariantLocationData_locked(null);
      setEditableBrickId(null);
      setIsMajorMode(true);
    }

    if (!isCountingIn) return;

    if (hasPreparedCountInRef.current) return;

    const firstBrick = bricks[0];
    if (!firstBrick?.snapshot) return;

    setShapeVariantLocationData(null);
    setShapeVariantLocationData_locked(
      firstBrick.snapshot.shapeVariantLocationData,
    );
    setTuneKeyId(firstBrick.snapshot.keyId);
    hasPreparedCountInRef.current = true;
  }, [
    isPlaying,
    isCountingIn,
    bricks,
    setShapeVariantLocationData_locked,
    setShapeVariantLocationData,
    setTuneKeyId,
    setEditableBrickId,
    setIsMajorMode,
  ]);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);
}
