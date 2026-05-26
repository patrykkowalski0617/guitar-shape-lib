import { describe, it, expect } from "vitest";
import { calculateMatrixData } from "./utils";
import { resolveTargetSharpNoteNames } from "@/utils/resolveTargetSharpNoteNames";

const C_IONIAN = {
  unifiedMusicKeysDataKey: "C" as const,
  baseChordDataKey: "BaseChord1" as const,
  guitarShapeDataKey: "M7" as const,
  semitoneOffset: 0,
};

describe("calculateMatrixData()", () => {
  describe("C / BaseChord1 / M7 shape — no alterations", () => {
    const data = calculateMatrixData(
      C_IONIAN.unifiedMusicKeysDataKey,
      C_IONIAN.baseChordDataKey,
      C_IONIAN.guitarShapeDataKey,
      C_IONIAN.semitoneOffset,
    );

    it("chordNoteIndices contains 7 notes", () => {
      expect(data.chordNoteIndices).toHaveLength(7);
    });

    it("chord notes are C E G B D F A", () => {
      const names = data.chordNoteIndices.map((i) => data.sharpNoteNames[i]);
      expect(names).toEqual(["C", "E", "G", "B", "D", "F", "A"]);
    });

    it("no alterations — visibleColumnsIndices equals chordNoteIndices", () => {
      expect(data.visibleColumnsIndices).toEqual(data.chordNoteIndices);
    });

    it("all M7 notes (C E G B) are in guitarShapeIndices", () => {
      const shapeNames = data.guitarShapeIndices.map(
        (i) => data.sharpNoteNames[i],
      );
      expect(shapeNames).toContain("C");
      expect(shapeNames).toContain("E");
      expect(shapeNames).toContain("G");
      expect(shapeNames).toContain("B");
    });
  });

  describe("alterations — shape contains notes outside the chord", () => {
    it("visibleColumnsIndices contains more indices than chordNoteIndices when alterations exist", () => {
      const data = calculateMatrixData("C", "BaseChord6", "M7", 9);
      expect(data.visibleColumnsIndices.length).toBeGreaterThan(
        data.chordNoteIndices.length,
      );
    });

    it("alteration indices have sharpNoteNames not present in chordNoteIndices", () => {
      const data = calculateMatrixData("C", "BaseChord6", "M7", 9);
      const chordNames = new Set(
        data.chordNoteIndices.map((i) => data.sharpNoteNames[i]),
      );
      const alterationIndices = data.visibleColumnsIndices.filter(
        (i) => !data.chordNoteIndices.includes(i),
      );
      alterationIndices.forEach((i) => {
        expect(chordNames.has(data.sharpNoteNames[i])).toBe(false);
      });
    });

    it("visibleColumnsIndices is sorted ascending", () => {
      const data = calculateMatrixData("C", "BaseChord6", "M7", 9);
      const sorted = [...data.visibleColumnsIndices].sort((a, b) => a - b);
      expect(data.visibleColumnsIndices).toEqual(sorted);
    });
  });

  describe("isShared — note belongs to both chord and shape", () => {
    it("shared notes have sharpNoteName present in both chord and shape sets", () => {
      const data = calculateMatrixData(
        C_IONIAN.unifiedMusicKeysDataKey,
        C_IONIAN.baseChordDataKey,
        C_IONIAN.guitarShapeDataKey,
        C_IONIAN.semitoneOffset,
      );
      const chordNames = new Set(
        data.chordNoteIndices.map((i) => data.sharpNoteNames[i]),
      );
      const shapeNames = new Set(
        data.guitarShapeIndices.map((i) => data.sharpNoteNames[i]),
      );
      ["C", "E", "G", "B"].forEach((name) => {
        expect(chordNames.has(name as any)).toBe(true);
        expect(shapeNames.has(name as any)).toBe(true);
      });
    });
  });
});

describe("resolveTargetSharpNoteNames()", () => {
  it("targetNoteIndices [0] returns first chord note (C in C Ionian)", () => {
    const result = resolveTargetSharpNoteNames("C", "BaseChord1", "M7", 0, [0]);
    expect(result).toContain("C");
    expect(result).toHaveLength(1);
  });

  it("targetNoteIndices [1] returns second chord note (E in C Ionian)", () => {
    const result = resolveTargetSharpNoteNames("C", "BaseChord1", "M7", 0, [1]);
    expect(result).toContain("E");
    expect(result).toHaveLength(1);
  });

  it("targetNoteIndices [0, 2] returns first and third chord notes", () => {
    const result = resolveTargetSharpNoteNames(
      "C",
      "BaseChord1",
      "M7",
      0,
      [0, 2],
    );
    expect(result).toContain("C");
    expect(result).toContain("G");
    expect(result).toHaveLength(2);
  });

  it("empty indices array returns empty array", () => {
    const result = resolveTargetSharpNoteNames("C", "BaseChord1", "M7", 0, []);
    expect(result).toEqual([]);
  });

  it("out-of-range index returns empty array", () => {
    const result = resolveTargetSharpNoteNames(
      "C",
      "BaseChord1",
      "M7",
      0,
      [99],
    );
    expect(result).toEqual([]);
  });

  it("result contains no duplicates", () => {
    const result = resolveTargetSharpNoteNames(
      "C",
      "BaseChord1",
      "M7",
      0,
      [0, 0],
    );
    const unique = [...new Set(result)];
    expect(result).toEqual(unique);
  });

  it("changing music key changes the result", () => {
    const inC = resolveTargetSharpNoteNames("C", "BaseChord1", "M7", 0, [0]);
    const inG = resolveTargetSharpNoteNames("G", "BaseChord1", "M7", 0, [0]);
    expect(inC).not.toEqual(inG);
  });
});
