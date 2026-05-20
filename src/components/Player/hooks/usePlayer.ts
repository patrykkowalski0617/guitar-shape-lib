import { useCallback, useEffect, useRef } from "react";
import { useMetronome } from "./useMetronome";
import { usePlayerStore, useMusicStore, useControlsStore } from "@/store";

export function usePlayer() {
  const setEditableBrickId = usePlayerStore(
    (state) => state.setEditableBrickId,
  );
  const setShapeVariantDataKeys_locked = useMusicStore(
    (state) => state.setShapeVariantDataKeys_locked,
  );
  const setShapeVariantDataKeys = useMusicStore(
    (state) => state.setShapeVariantDataKeys,
  );
  const setUnifiedMusicKeysDataKeys = useControlsStore(
    (state) => state.setUnifiedMusicKeysDataKeys,
  );
  const setBaseChordDataKey = useControlsStore(
    (state) => state.setBaseChordDataKey,
  );

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
      setShapeVariantDataKeys(null);
      setShapeVariantDataKeys_locked(null);
      setEditableBrickId(null);
    }

    if (!isCountingIn) return;

    if (hasPreparedCountInRef.current) return;

    const firstBrick = bricks[0];
    if (!firstBrick?.snapshot) return;

    setShapeVariantDataKeys(null);
    hasPreparedCountInRef.current = true;
  }, [
    isPlaying,
    isCountingIn,
    bricks,
    setShapeVariantDataKeys_locked,
    setShapeVariantDataKeys,
    setUnifiedMusicKeysDataKeys,
    setBaseChordDataKey,
    setEditableBrickId,
  ]);

  useEffect(() => {
    toggleMetronome(isPlaying);
    return () => toggleMetronome(false);
  }, [isPlaying, toggleMetronome]);
}
