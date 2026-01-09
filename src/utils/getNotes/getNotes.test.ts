import { describe, it, expect } from "vitest";
import getNotes, { type Note } from "@/utils/getNotes/getNotes";

describe("music utils", () => {
  describe("getNotes()", () => {
    it("should generate a full octave starting from C by default", () => {
      // Arrange & Act
      const result = getNotes({});

      // Assert
      expect(result).toHaveLength(13);
      expect(result[0]).toBe("C");
      expect(result[12]).toBe("C");
    });

    it("should be sharp scale by default", () => {
      // Arrange & Act
      const result = getNotes({});

      expect(result).toContain("F#");
    });

    it("should wrap around the notes array correctly", () => {
      // Arrange
      const args = { firstNote: "B" as const, length: 2 };

      // Act
      const result = getNotes(args);

      // Assert
      expect(result).toEqual(["B", "C", "C#"]);
    });

    it("should extend notes array correctly", () => {
      // Arrange
      const args = { length: 15 };

      // Act
      const result = getNotes(args);

      // Assert
      expect(result[14]).toBe("D");
    });

    it("should use flat scale when isFlatKey is true", () => {
      // Act
      const result = getNotes({ firstNote: "Bb", isFlatKey: true });

      // Assert
      expect(result).toContain("Gb");
      expect(result).not.toContain("F#");
    });

    it("should throw an error for a completely invalid note name", () => {
      // Assert
      expect(() => {
        getNotes({ firstNote: "H" as unknown as Note });
      }).toThrowError(`Note "H" is not compatible with the selected scale or is not a valid note.`);
    });
  });
});
