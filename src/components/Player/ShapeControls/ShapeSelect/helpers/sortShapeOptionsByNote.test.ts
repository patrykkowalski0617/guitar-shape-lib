import { describe, it, expect } from "vitest";
import { sortShapeOptionsByNote } from "./sortShapeOptionsByNote";
import { type ShapeOption } from "./getFilteredShapeOptions";

describe("sortShapeOptionsByNote", () => {
  const mockOptions: ShapeOption[] = [
    { shapeId: "M7", shapeSemitoneOffsetFromC: 7 },
    { shapeId: "M7", shapeSemitoneOffsetFromC: 0 },
    { shapeId: "M7", shapeSemitoneOffsetFromC: 2 },
    { shapeId: "m7", shapeSemitoneOffsetFromC: 0 },
  ];

  it("should sort starting from shapeSemitoneOffsetFromC 0 (Tonic) regardless of key", () => {
    const sortedC = sortShapeOptionsByNote(mockOptions, "C");
    expect(sortedC[0].shapeSemitoneOffsetFromC).toBe(0);
    expect(sortedC[1].shapeSemitoneOffsetFromC).toBe(0);
    expect(sortedC[2].shapeSemitoneOffsetFromC).toBe(2);
    expect(sortedC[3].shapeSemitoneOffsetFromC).toBe(7);

    const sortedDb = sortShapeOptionsByNote(mockOptions, "Db");

    expect(sortedDb[0].shapeSemitoneOffsetFromC).toBe(0);
    expect(sortedDb[1].shapeSemitoneOffsetFromC).toBe(0);
    expect(sortedDb[2].shapeSemitoneOffsetFromC).toBe(2);
    expect(sortedDb[3].shapeSemitoneOffsetFromC).toBe(7);
  });

  it("should maintain musical interval order", () => {
    const mixedOptions: ShapeOption[] = [
      { shapeId: "fifth", shapeSemitoneOffsetFromC: 7 },
      { shapeId: "fourth", shapeSemitoneOffsetFromC: 5 },
      { shapeId: "tonic", shapeSemitoneOffsetFromC: 0 },
    ];

    const sorted = sortShapeOptionsByNote(mixedOptions, "G");

    expect(sorted[0].shapeSemitoneOffsetFromC).toBe(0);
    expect(sorted[1].shapeSemitoneOffsetFromC).toBe(5);
    expect(sorted[2].shapeSemitoneOffsetFromC).toBe(7);
  });

  it("should perform stable alphabetical sort for the same shapeSemitoneOffsetFromCs", () => {
    const sameNoteOptions: ShapeOption[] = [
      { shapeId: "z_shape", shapeSemitoneOffsetFromC: 0 },
      { shapeId: "a_shape", shapeSemitoneOffsetFromC: 0 },
    ];
    const sorted = sortShapeOptionsByNote(sameNoteOptions, "C");

    expect(sorted[0].shapeId).toBe("a_shape");
    expect(sorted[1].shapeId).toBe("z_shape");
  });
});
