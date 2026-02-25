import { describe, it, expect } from "vitest";
import { sortShapeOptionsByNote } from "./sortShapeOptionsByNote";
import { type ShapeOption } from "./getFilteredShapeOptions";

describe("sortShapeOptionsByNote", () => {
  const mockOptions: ShapeOption[] = [
    { shapeId: "M7", offset: 7 },
    { shapeId: "M7", offset: 0 },
    { shapeId: "M7", offset: 2 },
    { shapeId: "m7", offset: 0 },
  ];

  it("should sort starting from offset 0 (Tonic) regardless of key", () => {
    const sortedC = sortShapeOptionsByNote(mockOptions, "C");
    expect(sortedC[0].offset).toBe(0);
    expect(sortedC[1].offset).toBe(0);
    expect(sortedC[2].offset).toBe(2);
    expect(sortedC[3].offset).toBe(7);

    const sortedDb = sortShapeOptionsByNote(mockOptions, "Db");

    expect(sortedDb[0].offset).toBe(0);
    expect(sortedDb[1].offset).toBe(0);
    expect(sortedDb[2].offset).toBe(2);
    expect(sortedDb[3].offset).toBe(7);
  });

  it("should maintain musical interval order", () => {
    const mixedOptions: ShapeOption[] = [
      { shapeId: "fifth", offset: 7 },
      { shapeId: "fourth", offset: 5 },
      { shapeId: "tonic", offset: 0 },
    ];

    const sorted = sortShapeOptionsByNote(mixedOptions, "G");

    expect(sorted[0].offset).toBe(0);
    expect(sorted[1].offset).toBe(5);
    expect(sorted[2].offset).toBe(7);
  });

  it("should perform stable alphabetical sort for the same offsets", () => {
    const sameNoteOptions: ShapeOption[] = [
      { shapeId: "z_shape", offset: 0 },
      { shapeId: "a_shape", offset: 0 },
    ];
    const sorted = sortShapeOptionsByNote(sameNoteOptions, "C");

    expect(sorted[0].shapeId).toBe("a_shape");
    expect(sorted[1].shapeId).toBe("z_shape");
  });
});
