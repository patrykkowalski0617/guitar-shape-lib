import { describe, it, expect } from "vitest";
import { matchShapeNotesToRoleNotes } from "./matchShapeNotesToRoleNotes";

describe("matchShapeNotesToRoleNotes()", () => {
  describe("Tonic and Subdominant Shapes (Standard Mapping)", () => {
    const targetMajor = ["C-3", "E-3", "G-3", "B-3", "D-4", "F-4", "A-4"];
    const targetMinor = ["A-2", "C-3", "E-3", "G-3", "B-3", "D-4", "F-4"];

    it("should handle M7 (perfect matches)", () => {
      expect(matchShapeNotesToRoleNotes(targetMajor, ["C-3", "E-3", "G-3", "B-3"])).toEqual([
        "C-3",
        "E-3",
        "G-3",
        "B-3",
      ]);
    });

    it("should handle M_add9 (jumping to correct octave matrix)", () => {
      expect(matchShapeNotesToRoleNotes(targetMajor, ["C-3", "E-3", "G-3", "D-3"])).toEqual([
        "C-3",
        "E-3",
        "G-3",
        "D-4",
      ]);
    });

    it("should handle Aeolian (full scale mapping)", () => {
      const input = ["A-3", "B-3", "C-4", "D-4", "E-4", "F-4", "G-4"];
      expect(matchShapeNotesToRoleNotes(targetMinor, input)).toEqual(["A-2", "C-3", "E-3", "G-3", "B-3", "D-4", "F-4"]);
    });

    it("should handle Dorian (mapping sharp alteration on 6th degree)", () => {
      const input = ["A-3", "B-3", "C-4", "D-4", "E-4", "F#-4", "G-4"];
      expect(matchShapeNotesToRoleNotes(targetMinor, input)).toEqual([
        "A-2",
        "C-3",
        "E-3",
        "G-3",
        "B-3",
        "D-4",
        "F#-4",
      ]);
    });
  });

  describe("Dominant Shapes and Alterations", () => {
    const targetG7 = ["G-3", "B-3", "D-4", "F-4", "A-4", "C-5", "E-5"];

    it("should NOT map G# to G (Root) because 1,3,5 are protected", () => {
      const input = ["B-3", "D-4", "F-4", "G#-4"];
      const result = matchShapeNotesToRoleNotes(targetG7, input);

      expect(result).toContain("G#-4");
      expect(result[0]).not.toBe("G#-3");
    });

    it("should map G# (from Bdim7) to the 9th degree (A-4) of G7", () => {
      const input = ["B-3", "D-4", "F-4", "G#-4"];
      const result = matchShapeNotesToRoleNotes(targetG7, input);

      expect(result).toEqual(["B-3", "D-4", "F-4", "G#-4"]);
    });

    it("should handle Lydian Dominant (C7#11) with sharp alteration", () => {
      const targetC7 = ["C-3", "E-3", "G-3", "Bb-3", "D-4", "F-4", "A-4"];
      const input = ["C-3", "D-3", "E-3", "F#-3", "G-3", "A-3", "Bb-3"];

      const result = matchShapeNotesToRoleNotes(targetC7, input);

      expect(result).toEqual(["C-3", "E-3", "G-3", "Bb-3", "D-4", "F#-4", "A-4"]);
    });
  });

  describe("Flat Keys and Specific Voicings", () => {
    it("should handle Db Major scale on DbM7 target", () => {
      const target = ["Db-3", "F-3", "Ab-3", "C-4", "Eb-4", "Gb-4", "Bb-4"];
      const input = ["Db-3", "Eb-3", "F-3", "Gb-3", "Ab-3", "Bb-3", "C-4"];

      expect(matchShapeNotesToRoleNotes(target, input)).toEqual(["Db-3", "F-3", "Ab-3", "C-4", "Eb-4", "Gb-4", "Bb-4"]);
    });

    it("should handle Altered scale (G7alt) with multiple alterations", () => {
      const targetG7 = ["G-3", "B-3", "D-4", "F-4", "A-4", "C-5", "E-5"];
      const input = ["G-3", "Ab-3", "Bb-3", "B-3", "Db-4", "Eb-4", "F-4"];

      const result = matchShapeNotesToRoleNotes(targetG7, input);
      expect(result).toContain("G-3");
      expect(result).toContain("B-3");
      expect(result).toContain("F-4");
      expect(result).toContain("Ab-4");
    });
  });

  describe("Pentatonic and Gaps", () => {
    const target = ["G-3", "B-3", "D-4", "F-4", "A-4", "C-5", "E-5"];

    it("should handle minor pentatonic and keep pool order for unmatched", () => {
      const input = ["G-3", "Bb-3", "C-4", "D-4", "F-4"];
      const result = matchShapeNotesToRoleNotes(target, input);

      expect(result).toEqual(["G-3", "D-4", "F-4", "Bb-4", "C-5"]);
    });
  });
});
