/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { getRandomStringIndex, getRandomFret, getRandomVariantId } from "./useRandomizeShapeVariant";
import type { Note } from "@/data";

vi.mock("@/data", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/data")>();
  return {
    ...actual,
    shapes: {
      "test-shape": {
        fretboardCoordinatesVariants: {
          "string-E": { v1: {}, v2: {}, v3: {}, v4: {} },
        },
      },
    },
  };
});

describe("RandomizeShapeVariant Logic", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getRandomStringIndex()", () => {
    it("should return a value from the valid indexes [2, 3, 4, 5]", () => {
      const validIndexes = [2, 3, 4, 5];
      for (let i = 0; i < 10; i++) {
        expect(validIndexes).toContain(getRandomStringIndex());
      }
    });
  });

  describe("getRandomFret()", () => {
    it("should pick a fret using Math.random without failing on missing data", () => {
      vi.spyOn(Math, "random").mockReturnValue(0);

      const fret = getRandomFret("C" as Note, 0, 5);

      expect(typeof fret).toBe("number");
    });
  });

  describe("getRandomVariantId()", () => {
    const shapeId = "test-shape";
    const stringId = "string-E";

    it("should return the first half when fretIndex is low", () => {
      vi.spyOn(Math, "random").mockReturnValue(0);
      const variantId = getRandomVariantId(shapeId, stringId, 1);
      expect(variantId).toBe("v1");
    });

    it("should return the last half when fretIndex is high", () => {
      vi.spyOn(Math, "random").mockReturnValue(0);

      const variantId = getRandomVariantId(shapeId, stringId, 100);

      expect(variantId).toBe("v3");
    });

    it("should return any variant when fret is in the middle", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.99);
      const variantId = getRandomVariantId(shapeId, stringId, 10);
      expect(variantId).toBe("v4");
    });
  });
});
