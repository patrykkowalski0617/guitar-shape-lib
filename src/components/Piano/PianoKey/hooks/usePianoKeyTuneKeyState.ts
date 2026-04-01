import { majorScale } from "@/data";
import { useCurrentTuneKeyOffsetFromC } from "@/hooks";

export const usePianoKeyTuneKeyState = (pianoKeyindex: number) => {
  const { offsetFromC } = useCurrentTuneKeyOffsetFromC();
  const baseIndex = 8;
  const tuneKeyBaseIndex = baseIndex + offsetFromC;
  const tuneNoteIndexes = majorScale;

  const isTuneNote = tuneNoteIndexes.includes(pianoKeyindex - tuneKeyBaseIndex);

  return { isTuneNote };
};
