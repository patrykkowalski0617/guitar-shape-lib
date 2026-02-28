import { describe, it, expect } from "vitest";
import { getShapeFretRange } from "./getShapeFretRange";

describe("getShapeFretRange", () => {
  it("should return correct min and max frets from coordinates", () => {
    const coords = [
      [1, 5],
      [2, 3],
      [3, 7],
    ];
    expect(getShapeFretRange(coords)).toEqual({ min: 3, max: 7 });
  });

  it("should return 0 for both if input is empty", () => {
    expect(getShapeFretRange([])).toEqual({ min: 0, max: 0 });
  });

  it("should return 0 for both if input is null/undefined", () => {
    // @ts-expect-error Testing null input handling
    expect(getShapeFretRange(null)).toEqual({ min: 0, max: 0 });
  });

  it("should handle a single note correctly", () => {
    const coords = [[1, 12]];
    expect(getShapeFretRange(coords)).toEqual({ min: 12, max: 12 });
  });

  it("should return 0 if frets are not valid numbers (Infinity safety)", () => {
    const result = getShapeFretRange([]);
    expect(result.min).toBe(0);
    expect(result.max).toBe(0);
  });
});
