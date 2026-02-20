import { numberOfFrets, STRINGS_CONFIG } from "@/components/Fretboard/FretboardRow/helpers/constants";
import { STRING_ID_MAP } from "@/components/Fretboard/helpers/constants";
import { useMusicStore } from "@/store/useMusicStore";
import { shapes, type FretboardStringId, type Note, type VariantId } from "@/data";
import { useEffect, useState } from "react";
import { getNotes, getValidVariants, type VariantsRecord } from "@/utils";

export const getRandomStringIndex = () => {
  const validIndexes = [2, 3, 4, 5];
  const randomIndex = Math.floor(Math.random() * validIndexes.length);
  return validIndexes[randomIndex];
};

export const getRandomFret = (randomKey: Note, offset: number, stringIndex: number, shapeId: string) => {
  const notesSharp = getNotes({ firstNote: randomKey }).map((n) => n.sharpNoteName);
  const shapeRootSharpNote = offset !== null ? notesSharp[offset % 12] : null;
  const stringConfig = STRINGS_CONFIG[stringIndex];
  const stringId = STRING_ID_MAP[stringIndex] as FretboardStringId;

  const rowNotes = getNotes({
    firstNote: stringConfig.firstNoteInRow as Note,
    length: numberOfFrets,
  });

  const allPotentialFrets = rowNotes
    .map((note, index) => (note.sharpNoteName === shapeRootSharpNote ? index : null))
    .filter((index): index is number => index !== null);

  const validFrets = allPotentialFrets.filter((fIdx) => {
    const variants = shapes[shapeId].fretboardCoordinatesVariants?.[stringId];

    if (!variants) return false;
    return getValidVariants(fIdx, variants as VariantsRecord).length > 0;
  });

  const finalFrets = validFrets.length > 0 ? validFrets : allPotentialFrets;
  return finalFrets[Math.floor(Math.random() * finalFrets.length)];
};

export const getRandomVariantId = (shapeId: string, stringId: FretboardStringId, fretIndex: number) => {
  const allVariants = shapes[shapeId].fretboardCoordinatesVariants?.[stringId];

  if (!allVariants) return null;

  const availableVariants = getValidVariants(fretIndex, allVariants as VariantsRecord);

  if (availableVariants.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * availableVariants.length);
  return availableVariants[randomIndex][0] as VariantId;
};

export const useRandomizeShapeVariant = () => {
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const [fretIndex, setFretIndex] = useState<number | null>(null);
  const [stringId, setStringId] = useState<FretboardStringId | null>(null);
  const [shapeId, setShapeId] = useState<string | null>(null);

  const setRandomShapeVariant = (randomKey: Note, offset: number, incomingShapeId: string) => {
    const stringIndex = getRandomStringIndex();
    const randomFret = getRandomFret(randomKey, offset, stringIndex, incomingShapeId);

    setStringId(STRING_ID_MAP[stringIndex]);
    setFretIndex(randomFret);
    setShapeId(incomingShapeId);
  };

  useEffect(() => {
    if (fretIndex === null || stringId === null || !shapeId) return;

    const variantId = getRandomVariantId(shapeId, stringId as FretboardStringId, fretIndex);

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
