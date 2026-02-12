import { STRINGS_CONFIG } from "@/components/Fretboard/FretboardRow/helpers/constants";
import { STRING_MAP } from "@/components/Fretboard/FretCell/helpers";
import { useMusicStore } from "@/store/useMusicStore";
import { getNotes, type Note } from "@/utils";
import shapes from "@/utils/shapes";
import { useEffect, useState } from "react";

export const useRandomizeShapeVariant = () => {
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const [fretIdx, setFretIdx] = useState<number | null>(null);
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
      length: 24,
    });
    const validFrets = rowNotes
      .map((note, idx) => (note.sharpNoteName === shapeRootSharpNote ? idx : null))
      .filter((idx): idx is number => idx !== null);
    const randomFret = validFrets[Math.floor(Math.random() * validFrets.length)];

    setStringId(stringId);
    setFretIdx(randomFret);
    setShapeId(shapeId);
  };

  useEffect(() => {
    // set variant
    if (fretIdx === null || stringId === null) return;
    const fretboardCoordinatesVariants = shapeId ? shapes[shapeId].fretboardCoordinatesVariants : null;
    const variantsOfCurrentString =
      fretboardCoordinatesVariants?.[stringId as keyof typeof fretboardCoordinatesVariants];
    if (variantsOfCurrentString === undefined) return;
    const variantKeys = Object.keys(variantsOfCurrentString);
    const randomVariantId = variantKeys[Math.floor(Math.random() * variantKeys.length)];

    setCurrentShapeVariantLocationData({
      currentShapeId: shapeId,
      stringId,
      fretIdx,
      variantId: randomVariantId,
    });
  }, [shapeId, fretIdx, stringId, setCurrentShapeVariantLocationData]);

  return setRandomShapeVariant;
};
