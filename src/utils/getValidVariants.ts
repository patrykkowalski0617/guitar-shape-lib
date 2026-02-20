import { numberOfFrets } from "@/components/Fretboard/FretboardRow/helpers/constants";
import { type VariantId } from "@/data"; // Importujemy Twój typ v${number}

export type Coordinate = number[];
export type VariantsRecord = Record<VariantId, Coordinate[]>;

export const getValidVariants = (rootFretIndex: number, allVariants: VariantsRecord): [VariantId, Coordinate[]][] => {
  return (Object.entries(allVariants) as [VariantId, Coordinate[]][]).filter(([, coords]) => {
    return coords.every((coord) => {
      const absoluteFret = rootFretIndex + coord[1];
      return absoluteFret >= 0 && absoluteFret < numberOfFrets;
    });
  });
};
