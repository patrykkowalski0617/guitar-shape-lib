import { useEffect } from "react";
import { useMusicStore, useShapePlayerStore } from "@/store";

export const useClaenLockedNotes = () => {
  const resetActiveLockedNoteIds = useMusicStore(
    (state) => state.resetActiveLockedNoteIds,
  );

  const guitarShapePlayerBricks = useShapePlayerStore(
    (s) => s.guitarShapePlayerBricks,
  );

  useEffect(() => {
    if (guitarShapePlayerBricks.length) {
      resetActiveLockedNoteIds();
    }
  }, [guitarShapePlayerBricks, resetActiveLockedNoteIds]);
};
