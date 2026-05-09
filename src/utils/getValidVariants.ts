import { numberOfFrets } from "@/components/Fretboard/constants";
import {
  type VariantDataKey,
  type StringVariants,
  type FretboardCoordinate,
} from "@/data";

export const getValidVariants = (
  rootFretIndex: number,
  allVariants: StringVariants,
): [VariantDataKey, { coordinates: FretboardCoordinate[] }][] => {
  const variantEntries = Object.entries(allVariants) as [
    VariantDataKey,
    { coordinates: FretboardCoordinate[] },
  ][];

  const validVariants = variantEntries.filter(([, variantObj]) => {
    return variantObj.coordinates.every((coord) => {
      const fretOffset = coord[1];
      const absoluteFret = rootFretIndex + fretOffset;

      const isWithinFretboardLimits =
        absoluteFret >= 0 && absoluteFret < numberOfFrets;

      return isWithinFretboardLimits;
    });
  });

  return validVariants;
};
