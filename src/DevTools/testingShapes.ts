import {
  GUITAR_SHAPES,
  type GuitarShapeDataKey,
  type ShapeVariantDataKeys,
  type FretboardCoordinate,
} from "@/data";
import { getAllFretboardNotes } from "@/components/GuitarFretboard/helpers/getAllFretboardNotes";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeMulitStepSliderExplorer/helpers/getOrderedShapeVariantDataKeys";
import { getShapeCoordinates } from "@/components/GuitarFretboard/helpers/getShapeCoordinates";
import { getNotes } from "@/utils";

const MOCK_KEY = "C" as const;

interface VariantResult {
  variantDataKeys: ShapeVariantDataKeys;
  coordinates: FretboardCoordinate[];
  coordinateNoteNames: string[];
  intervalNoteNames: string[];
  isValid: boolean;
}

interface ShapeTestResult {
  guitarShapeDataKey: GuitarShapeDataKey;
  mockedWith: {
    baseChordKey: string;
    semitoneOffset: number;
  };
  variants: VariantResult[];
  skippedVariants: string[];
}

export const testingShapes = (): ShapeTestResult[] => {
  const allFretboardNotes = getAllFretboardNotes();
  const notes36 = getNotes({ length: 36, firstNote: "C" });

  const results = Object.keys(GUITAR_SHAPES).map((guitarShapeDataKey) => {
    const shape = GUITAR_SHAPES[guitarShapeDataKey];

    const semitoneOffsetFromMajorRoot = shape.semitoneOffsetFromMajorRoot;
    const firstBaseChordKey = Object.keys(semitoneOffsetFromMajorRoot)[0];
    const firstSemitoneOffset =
      semitoneOffsetFromMajorRoot[
        firstBaseChordKey as keyof typeof semitoneOffsetFromMajorRoot
      ]![0];

    const intervalNoteNames = shape.intervals.map(
      (interval) =>
        notes36[interval + firstSemitoneOffset]?.sharpNoteName ?? "?",
    );
    const intervalNoteNamesSet = new Set(intervalNoteNames);

    const variantDataKeys = getOrderedShapeVariantDataKeys({
      guitarShapeDataKey: guitarShapeDataKey as GuitarShapeDataKey,
      unifiedMusicKeysDataKey: MOCK_KEY,
      semitoneOffsetFromMajorRoot: firstSemitoneOffset,
    });

    const variants: VariantResult[] = variantDataKeys.map((variantKey) => {
      const coordinates = getShapeCoordinates(variantKey);

      const coordinateNoteNames = coordinates.map(
        ([stringIndex, fretIndex]) =>
          allFretboardNotes[stringIndex]?.[fretIndex]?.sharpNoteName ?? "?",
      );

      const coordinateNoteNamesSet = new Set(coordinateNoteNames);
      const isValid =
        intervalNoteNamesSet.size === coordinateNoteNamesSet.size &&
        [...intervalNoteNamesSet].every((n) => coordinateNoteNamesSet.has(n));

      return {
        variantDataKeys: variantKey,
        coordinates,
        coordinateNoteNames,
        intervalNoteNames,
        isValid,
      };
    });

    const allVariantKeys = Object.values(shape.guitarShapeVariants).flatMap(
      (stringVariants) => Object.keys(stringVariants),
    );
    const returnedVariantKeys = variantDataKeys.map((v) => v.variantDataKey);
    const skippedVariants = allVariantKeys.filter(
      (k) => !returnedVariantKeys.includes(k as any),
    );

    return {
      guitarShapeDataKey: guitarShapeDataKey as GuitarShapeDataKey,
      mockedWith: {
        baseChordKey: firstBaseChordKey,
        semitoneOffset: firstSemitoneOffset,
      },
      variants,
      skippedVariants,
    };
  });

  results.forEach(
    ({ guitarShapeDataKey, mockedWith, variants, skippedVariants }) => {
      console.log(
        `\n=== ${guitarShapeDataKey} (mock: ${mockedWith.baseChordKey}[0]=${mockedWith.semitoneOffset}) ===`,
      );
      console.log(
        `  intervals → ${[...new Set(variants[0]?.intervalNoteNames ?? [])].join(", ")}`,
      );

      variants.forEach(
        ({ variantDataKeys, coordinates, coordinateNoteNames, isValid }) => {
          const { stringId, fretIndex, variantDataKey } = variantDataKeys;
          const status = isValid ? "✅" : "❌";
          console.log(
            `  ${status} ${stringId} / ${variantDataKey} / fret ${fretIndex}`,
          );
          console.log(`     coordinates:    ${JSON.stringify(coordinates)}`);
          console.log(`     coord notes:    ${coordinateNoteNames.join(", ")}`);
        },
      );

      if (skippedVariants.length) {
        console.log(
          `  ⚠️ skipped (out of fretboard): ${skippedVariants.join(", ")}`,
        );
      }
    },
  );

  return results;
};
