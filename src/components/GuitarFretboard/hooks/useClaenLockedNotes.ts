import { useEffect } from "react";
import { useGuitarShape } from "@/hooks";
import { useMusicStore } from "@/store";

export const useClaenLockedNotes = () => {
  const resetActiveLockedNoteIds = useMusicStore(
    (state) => state.resetActiveLockedNoteIds,
  );

  const guitarShape = useGuitarShape();

  useEffect(() => {
    if (guitarShape) {
      resetActiveLockedNoteIds();
    }
  }, [guitarShape, resetActiveLockedNoteIds]);
};
