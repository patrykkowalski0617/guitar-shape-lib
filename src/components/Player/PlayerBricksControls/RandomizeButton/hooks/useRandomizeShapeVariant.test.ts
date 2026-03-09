/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  getRandomStringIndex,
  getRandomFret,
  getRandomVariantId,
  useRandomizeShapeVariant,
} from "./useRandomizeShapeVariant";
import { useMusicStore } from "@/store";
import type { Note, FretboardStringId } from "@/data";

vi.mock("@/store", () => ({
  useMusicStore: vi.fn(),
}));

vi.mock("@/data", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/data")>();
  return {
    ...actual,
    shapes: {
      "test-shape": {
        label: "Test Shape",
        fretboardCoordinatesVariants: {
          strE: {
            v1: [[5, 0]],
            v2: [[5, 1]],
            v3: [[5, 0]],
            v4: [[5, 1]],
          },
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
    it("should pick a fret using Math.random and require shapeId", () => {
      vi.spyOn(Math, "random").mockReturnValue(0);

      const fret = getRandomFret("C" as Note, 0, 5, "test-shape");

      expect(typeof fret).toBe("number");
    });
  });

  describe("getRandomVariantId()", () => {
    const shapeId = "test-shape";
    const stringId: FretboardStringId = "strE";

    it("should return a valid variant ID (e.g., v1) when random is 0", () => {
      vi.spyOn(Math, "random").mockReturnValue(0);
      const variantId = getRandomVariantId(shapeId, stringId, 5);

      expect(variantId).toBe("v1");
    });

    it("should return null if fret is out of bounds", () => {
      const variantId = getRandomVariantId(shapeId, stringId, 100);

      expect(variantId).toBeNull();
    });
  });
});

describe("useRandomizeShapeVariant() hook", () => {
  const setShapeVariantLocationDataMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useMusicStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ setShapeVariantLocationData: setShapeVariantLocationDataMock }),
    );
  });

  it("should return an object with setRandomShapeVariant method", () => {
    const { result } = renderHook(() => useRandomizeShapeVariant());

    expect(result.current).toHaveProperty("setRandomShapeVariant");
    expect(typeof result.current.setRandomShapeVariant).toBe("function");
  });
});
