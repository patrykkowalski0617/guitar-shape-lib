import { numberOfFrets, STRINGS_CONFIG } from "@/components/Fretboard/FretboardRow/helpers/constants";
import { STRING_MAP } from "@/components/Fretboard/helpers/constants";
import { useMusicStore } from "@/store/useMusicStore";
import { getNotes } from "@/utils";
import { shapes, type Note } from "@/data";
import { useEffect, useState } from "react";

const MAX_FRET = numberOfFrets - 4;
const MIN_FRET = 3;

export const useRandomizeShapeVariant = () => {
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const [fretIndex, setFretIdx] = useState<number | null>(null);
  const [stringId, setStringId] = useState<string | null>(null);
  const [shapeId, setShapeId] = useState<string | null>(null);

  const setRandomShapeVariant = (randomKey: Note, offset: number, shapeId: string) => {
    // find string
    const validIndexes = [2, 3, 4, 5];
    const randomIndex = Math.floor(Math.random() * validIndexes.length);
    const randomStringIdx = validIndexes[randomIndex];
    const stringId = STRING_MAP[randomStringIdx];

    // find fret
    const notesSharp = getNotes({ firstNote: randomKey }).map((n) => n.sharpNoteName);
    const shapeRootSharpNote = offset !== null ? notesSharp[offset % 12] : null;
    const stringConfig = STRINGS_CONFIG[randomStringIdx];

    const rowNotes = getNotes({
      firstNote: stringConfig.firstNoteInRow as Note,
      length: numberOfFrets,
    });

    const allValidFrets = rowNotes
      .map((note, idx) => (note.sharpNoteName === shapeRootSharpNote ? idx : null))
      .filter((idx): idx is number => idx !== null);

    const constrainedFrets = allValidFrets.filter((fret) => fret >= MIN_FRET && fret <= MAX_FRET);

    const finalFrets = constrainedFrets.length > 0 ? constrainedFrets : allValidFrets;
    const randomFret = finalFrets[Math.floor(Math.random() * finalFrets.length)];

    setStringId(stringId);
    setFretIdx(randomFret);
    setShapeId(shapeId);
  };

  // set variant
  useEffect(() => {
    if (fretIndex === null || stringId === null || !shapeId) return;

    const fretboardCoordinatesVariants = shapes[shapeId].fretboardCoordinatesVariants;
    const variantsOfCurrentString =
      fretboardCoordinatesVariants?.[stringId as keyof typeof fretboardCoordinatesVariants];

    if (variantsOfCurrentString === undefined) return;

    const variantIds = Object.keys(variantsOfCurrentString);

    let availableVariants = [...variantIds];

    if (fretIndex <= MIN_FRET) {
      const half = Math.ceil(variantIds.length / 2);
      availableVariants = variantIds.slice(0, half);
    } else if (fretIndex >= MAX_FRET) {
      const half = Math.floor(variantIds.length / 2);
      availableVariants = variantIds.slice(half);
    }
    const randomVariantId = availableVariants[Math.floor(Math.random() * availableVariants.length)];

    setCurrentShapeVariantLocationData({
      shapeId,
      stringId,
      fretIndex,
      variantId: randomVariantId,
    });
  }, [shapeId, fretIndex, stringId, setCurrentShapeVariantLocationData]);

  return setRandomShapeVariant;
};
