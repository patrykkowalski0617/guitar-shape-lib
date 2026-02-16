import { numberOfFrets, STRINGS_CONFIG } from "@/components/Fretboard/FretboardRow/helpers/constants";
import { STRING_ID_MAP } from "@/components/Fretboard/helpers/constants";
import { useMusicStore } from "@/store/useMusicStore";
import { getNotes } from "@/utils";
import { shapes, type Note } from "@/data";
import { useEffect, useState } from "react";

const MAX_FRET = numberOfFrets - 4;
const MIN_FRET = 3;

export const getRandomStringIndex = () => {
  const validIndexes = [2, 3, 4, 5];
  const randomIndex = Math.floor(Math.random() * validIndexes.length);
  return validIndexes[randomIndex];
};

export const getRandomFret = (randomKey: Note, offset: number, stringIndex: number) => {
  const notesSharp = getNotes({ firstNote: randomKey }).map((n) => n.sharpNoteName);
  const shapeRootSharpNote = offset !== null ? notesSharp[offset % 12] : null;
  const stringConfig = STRINGS_CONFIG[stringIndex];

  const rowNotes = getNotes({
    firstNote: stringConfig.firstNoteInRow as Note,
    length: numberOfFrets,
  });

  const allValidFrets = rowNotes
    .map((note, index) => (note.sharpNoteName === shapeRootSharpNote ? index : null))
    .filter((index): index is number => index !== null);

  const constrainedFrets = allValidFrets.filter((fret) => fret >= MIN_FRET && fret <= MAX_FRET);
  const finalFrets = constrainedFrets.length > 0 ? constrainedFrets : allValidFrets;

  return finalFrets[Math.floor(Math.random() * finalFrets.length)];
};

export const getRandomVariantId = (shapeId: string, stringId: string, fretIndex: number) => {
  const variants = shapes[shapeId].fretboardCoordinatesVariants;
  const variantsOfCurrentString = variants?.[stringId as keyof typeof variants];

  if (!variantsOfCurrentString) return null;

  const variantIds = Object.keys(variantsOfCurrentString);
  let availableVariants = [...variantIds];

  if (fretIndex <= MIN_FRET) {
    availableVariants = variantIds.slice(0, Math.ceil(variantIds.length / 2));
  } else if (fretIndex >= MAX_FRET) {
    availableVariants = variantIds.slice(Math.floor(variantIds.length / 2));
  }

  return availableVariants[Math.floor(Math.random() * availableVariants.length)];
};

export const useRandomizeShapeVariant = () => {
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const [fretIndex, setFretIndex] = useState<number | null>(null);
  const [stringId, setStringId] = useState<string | null>(null);
  const [shapeId, setShapeId] = useState<string | null>(null);

  const setRandomShapeVariant = (randomKey: Note, offset: number, incomingShapeId: string) => {
    const stringIndex = getRandomStringIndex();
    const randomFret = getRandomFret(randomKey, offset, stringIndex);

    setStringId(STRING_ID_MAP[stringIndex]);
    setFretIndex(randomFret);
    setShapeId(incomingShapeId);
  };

  useEffect(() => {
    if (fretIndex === null || stringId === null || !shapeId) return;

    const variantId = getRandomVariantId(shapeId, stringId, fretIndex);

    if (!variantId) return;

    setCurrentShapeVariantLocationData({
      shapeId,
      stringId,
      fretIndex,
      variantId,
    });
  }, [shapeId, fretIndex, stringId, setCurrentShapeVariantLocationData]);

  return setRandomShapeVariant;
};
