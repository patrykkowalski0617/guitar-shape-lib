import { describe, it, expect } from "vitest";
import { getNotes, type Note } from "@/utils/getNotes/getNotes";

describe("music utils", () => {
  describe("getNotes()", () => {
    it("should generate a full octave starting from C by default", () => {
      const result = getNotes({});

      expect(result).toHaveLength(12);
      expect(result[0]).toBe("C");
      expect(result[11]).toBe("B");
    });

    it("should be sharp scale by default", () => {
      const result = getNotes({});

      expect(result).toContain("F#");
    });

    it("should wrap around the notes array correctly", () => {
      const args = { firstNote: "B" as const, length: 2 };

      const result = getNotes(args);

      expect(result).toEqual(["B", "C"]);
    });

    it("should extend notes array correctly", () => {
      const args = { length: 15 };

      const result = getNotes(args);

      expect(result[14]).toBe("D");
    });

    it("should use flat scale when isFlatKey is true", () => {
      const result = getNotes({ firstNote: "Bb", isFlatKey: true });

      expect(result).toContain("Gb");
      expect(result).not.toContain("F#");
    });

    it("should throw an error for a completely invalid note name", () => {
      expect(() => {
        getNotes({ firstNote: "H" as unknown as Note });
      }).toThrowError(`Note "H" is not compatible with the selected scale or is not a valid note.`);
    });
  });
});
