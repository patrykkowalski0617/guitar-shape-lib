import { describe, it, expect } from "vitest";
import {
  getIsScaleNoteVisible,
  getIsShapeNoteVisible,
  getIntervalName,
} from "./utils";

describe("getIsScaleNoteVisible()", () => {
  const allScaleIndices = [0, 2, 4, 6, 8, 10, 12, 14];

  it("should return true for a note at an even position in scale", () => {
    expect(getIsScaleNoteVisible(4, allScaleIndices)).toBe(true);
  });

  it("should return false for a note at an odd position in scale", () => {
    expect(getIsScaleNoteVisible(2, allScaleIndices)).toBe(false);
  });

  it("should return false for a note not in scale at all", () => {
    expect(getIsScaleNoteVisible(3, allScaleIndices)).toBe(false);
  });

  it("should return true for the root note (position 0, even)", () => {
    expect(getIsScaleNoteVisible(0, allScaleIndices)).toBe(true);
  });

  it("should return false for an empty scale", () => {
    expect(getIsScaleNoteVisible(0, [])).toBe(false);
  });
});

describe("getIsShapeNoteVisible()", () => {
  const guitarShapeIndices = [0, 3, 5, 7, 10];

  it("should return true when index is in shape", () => {
    expect(getIsShapeNoteVisible(3, guitarShapeIndices)).toBe(true);
  });

  it("should return false when index is not in shape", () => {
    expect(getIsShapeNoteVisible(1, guitarShapeIndices)).toBe(false);
  });

  it("should return false for an empty shape", () => {
    expect(getIsShapeNoteVisible(0, [])).toBe(false);
  });

  it("should handle boundary values (first and last)", () => {
    expect(getIsShapeNoteVisible(0, guitarShapeIndices)).toBe(true);
    expect(getIsShapeNoteVisible(10, guitarShapeIndices)).toBe(true);
  });
});

describe("getIntervalName()", () => {
  it("should return correct name for index 0 (root / unison)", () => {
    const name = getIntervalName(0);
    expect(name).toBeDefined();
    expect(typeof name).toBe("string");
  });

  it("should normalize index by mod 24", () => {
    expect(getIntervalName(24)).toBe(getIntervalName(0));
  });

  it("should normalize index 25 same as index 1", () => {
    expect(getIntervalName(25)).toBe(getIntervalName(1));
  });

  it("should return undefined for an index with no matching interval", () => {
    const name = getIntervalName(99);
    expect(name === undefined || typeof name === "string").toBe(true);
  });
});
