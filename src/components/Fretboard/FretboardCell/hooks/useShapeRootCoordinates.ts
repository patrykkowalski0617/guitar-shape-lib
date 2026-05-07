import { useShapeRootSharpNote } from "@/hooks";
import { getNotes } from "@/utils";
import { numberOfFrets, STRINGS_CONFIG } from "../../constants";

export const useShapeRootCoordinates = () => {
  const shapeRootSharpNote = useShapeRootSharpNote();

  const allCoordinates = STRINGS_CONFIG.flatMap((string, stringIndex) => {
    const isExcludedString = stringIndex < 3;
    if (isExcludedString) return [];

    const rowNotes = getNotes({
      firstNote: string.firstNoteInRow,
      length: numberOfFrets,
    });

    const initialCoordinates: number[][] = [];

    const matchingFretIndexes = rowNotes.reduce(
      (foundIndexes, note, fretIndex) => {
        const isTargetNote = note.sharpNoteName === shapeRootSharpNote;

        if (isTargetNote) {
          const coordinatePair = [stringIndex, fretIndex];
          foundIndexes.push(coordinatePair);
        }

        return foundIndexes;
      },
      initialCoordinates,
    );

    return matchingFretIndexes;
  });

  return allCoordinates;
};
