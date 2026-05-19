import { describe, it, expect } from "vitest";
import {
  GUITAR_SHAPES,
  type GuitarShapeDataKey,
  type VariantDataKey,
} from "@/data";
import { getAllFretboardNotes } from "@/components/GuitarFretboard/helpers/getAllFretboardNotes";
import { getOrderedShapeVariantDataKeys } from "@/components/ShapeExplorer/helpers/getOrderedShapeVariantDataKeys";
import { getShapeCoordinates } from "@/components/GuitarFretboard/helpers/getShapeCoordinates";
import { getNotes } from "@/utils";

const MOCK_KEY = "C" as const;
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
    (interval) => notes36[interval + firstSemitoneOffset]?.sharpNoteName ?? "?",
  );
  const intervalNoteNamesSet = new Set(intervalNoteNames);

  const variantDataKeys = getOrderedShapeVariantDataKeys({
    guitarShapeDataKey: guitarShapeDataKey as GuitarShapeDataKey,
    unifiedMusicKeysDataKey: MOCK_KEY,
    semitoneOffsetFromMajorRoot: firstSemitoneOffset,
  });

  const variants = variantDataKeys.map((variantKey) => {
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
    (k) => !returnedVariantKeys.includes(k as VariantDataKey),
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

describe("GUITAR_SHAPES", () => {
  it("should contain at least one shape", () => {
    expect(results.length).toBeGreaterThan(0);
  });

  results.forEach(
    ({ guitarShapeDataKey, mockedWith, variants, skippedVariants }) => {
      describe(`${guitarShapeDataKey} (mock: ${mockedWith.baseChordKey}[0]=${mockedWith.semitoneOffset})`, () => {
        it("should have at least one valid variant", () => {
          expect(variants.length).toBeGreaterThan(0);
        });

        variants.forEach(
          ({
            variantDataKeys,
            isValid,
            coordinateNoteNames,
            intervalNoteNames,
          }) => {
            const { stringId, variantDataKey, fretIndex } = variantDataKeys;

            it(`${stringId} / ${variantDataKey} / fret ${fretIndex} — coord notes [${[...new Set(coordinateNoteNames)].join(", ")}] should match interval notes [${[...new Set(intervalNoteNames)].join(", ")}]`, () => {
              expect(isValid).toBe(true);
            });
          },
        );

        if (skippedVariants.length) {
          it.skip(`skipped (out of fretboard): ${skippedVariants.join(", ")}`, () => {});
        }
      });
    },
  );
});
