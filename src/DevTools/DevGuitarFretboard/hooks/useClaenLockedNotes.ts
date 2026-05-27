import { useEffect } from "react";
import { useGuitarShape } from "@/hooks";
import { useMusicStore } from "@/store";

export const useClaenLockedNotes = () => {
  const resetActiveLockedNoteIds = useMusicStore(
    (s) => s.resetActiveLockedNoteIds,
  );

  const guitarShape = useGuitarShape();

  useEffect(() => {
    if (guitarShape) {
      resetActiveLockedNoteIds();
    }
  }, [guitarShape, resetActiveLockedNoteIds]);
};
