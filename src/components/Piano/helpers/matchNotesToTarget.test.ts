import { describe, it, expect } from "vitest";
import { matchNotesToTarget } from "./matchNotesToTarget";

describe("matchNotesToTarget()", () => {
  describe("Tonic and Subdominant Shapes", () => {
    const targetMajor = ["C-3", "E-3", "G-3", "B-3", "D-4", "F-4", "A-4"];
    const targetMinor = ["A-2", "C-3", "E-3", "G-3", "B-3", "D-4", "F-4"];

    it("should handle M7", () => {
      expect(matchNotesToTarget(targetMajor, ["C-3", "E-3", "G-3", "B-3"])).toEqual([
        "C-3",
        "E-3",
        "G-3",
        "B-3",
      ]);
    });

    it("should handle M_add9", () => {
      expect(matchNotesToTarget(targetMajor, ["C-3", "E-3", "G-3", "D-4"])).toEqual([
        "C-3",
        "E-3",
        "G-3",
        "D-4",
      ]);
    });

    it("should handle M9", () => {
      expect(matchNotesToTarget(targetMajor, ["C-3", "E-3", "G-3", "B-3", "D-4"])).toEqual([
        "C-3",
        "E-3",
        "G-3",
        "B-3",
        "D-4",
      ]);
    });

    it("should handle m7", () => {
      expect(matchNotesToTarget(targetMinor, ["A-3", "C-4", "E-4", "G-4"])).toEqual([
        "A-2",
        "C-3",
        "E-3",
        "G-3",
      ]);
    });

    it("should handle m_add9", () => {
      expect(matchNotesToTarget(targetMinor, ["A-3", "C-4", "E-4", "B-4"])).toEqual([
        "A-2",
        "C-3",
        "E-3",
        "B-3",
      ]);
    });

    it("should handle m_9", () => {
      expect(matchNotesToTarget(targetMinor, ["A-3", "C-4", "E-4", "G-4", "B-4"])).toEqual([
        "A-2",
        "C-3",
        "E-3",
        "G-3",
        "B-3",
      ]);
    });

    it("should handle aeolian", () => {
      expect(
        matchNotesToTarget(targetMinor, ["A-3", "B-3", "C-4", "D-4", "E-4", "F-4", "G-4"]),
      ).toEqual(["A-2", "C-3", "E-3", "G-3", "B-3", "D-4", "F-4"]);
    });

    it("should handle dorian", () => {
      expect(
        matchNotesToTarget(targetMinor, ["A-3", "B-3", "C-4", "D-4", "E-4", "F#-4", "G-4"]),
      ).toEqual(["A-2", "C-3", "E-3", "G-3", "B-3", "D-4", "F#-4"]);
    });
  });

  describe("Dominant Shapes", () => {
    const targetDomMajor = ["G-3", "B-3", "D-4", "F-4", "A-4", "C-5", "E-5"];
    const targetDomMinor = ["E-3", "G#-3", "B-3", "D-4", "F-4", "A-4", "C-5"];

    it("should handle dominant", () => {
      expect(matchNotesToTarget(targetDomMajor, ["G-3", "B-3", "D-4", "F-4"])).toEqual([
        "G-3",
        "B-3",
        "D-4",
        "F-4",
      ]);
      expect(matchNotesToTarget(targetDomMinor, ["E-3", "G#-3", "B-3", "D-4"])).toEqual([
        "E-3",
        "G#-3",
        "B-3",
        "D-4",
      ]);
    });

    it("should handle 7b9", () => {
      expect(matchNotesToTarget(targetDomMajor, ["G-3", "B-3", "D-4", "F-4", "G#-4"])).toEqual([
        "G-3",
        "B-3",
        "D-4",
        "F-4",
        "G#-4",
      ]);
      expect(matchNotesToTarget(targetDomMinor, ["E-3", "G#-3", "B-3", "D-4", "F-4"])).toEqual([
        "E-3",
        "G#-3",
        "B-3",
        "D-4",
        "F-4",
      ]);
    });

    it("should handle m7b5", () => {
      expect(matchNotesToTarget(targetDomMajor, ["B-3", "D-4", "F-4", "A-4"])).toEqual([
        "B-3",
        "D-4",
        "F-4",
        "A-4",
      ]);
    });

    it("should handle dim7", () => {
      // Note the octave shift in minor context for G#-3
      expect(matchNotesToTarget(targetDomMinor, ["B-3", "D-4", "F-4", "G#-4"])).toEqual([
        "G#-3",
        "B-3",
        "D-4",
        "F-4",
      ]);
    });

    it("should handle mixolydian", () => {
      // Complex mapping with F#-3 and C#-4 shift
      const input = ["E-3", "F#-3", "G#-3", "A-3", "B-3", "C#-4", "D-4"];
      expect(matchNotesToTarget(targetDomMinor, input)).toEqual([
        "E-3",
        "G#-3",
        "B-3",
        "D-4",
        "A-4",
        "F#-3",
        "C#-4",
      ]);
    });

    it("should handle phrygian_dominant", () => {
      const input = ["E-3", "F-3", "G#-3", "A-3", "B-3", "C-4", "D-4"];
      expect(matchNotesToTarget(targetDomMinor, input)).toEqual([
        "E-3",
        "G#-3",
        "B-3",
        "D-4",
        "F-4",
        "A-4",
        "C-5",
      ]);
    });
  });

  describe("Pentatonic Shapes", () => {
    const target = ["G-3", "B-3", "D-4", "F-4", "A-4", "C-5", "E-5"];

    it("should handle minor_pent", () => {
      expect(matchNotesToTarget(target, ["G-3", "A#-3", "C-4", "D-4", "F-4"])).toEqual([
        "G-3",
        "D-4",
        "F-4",
        "C-5",
        "A#-3",
      ]);
      expect(matchNotesToTarget(target, ["E-3", "G-3", "A-3", "B-3", "D-4"])).toEqual([
        "G-3",
        "B-3",
        "D-4",
        "A-4",
        "E-5",
      ]);
    });

    it("should handle major_pent", () => {
      expect(matchNotesToTarget(target, ["G-3", "A-3", "B-3", "D-4", "E-4"])).toEqual([
        "G-3",
        "B-3",
        "D-4",
        "A-4",
        "E-5",
      ]);
    });
  });
});
