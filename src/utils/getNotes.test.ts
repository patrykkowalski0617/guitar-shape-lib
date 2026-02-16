import { describe, it, expect } from "vitest";
import { getNotes } from "./getNotes";

describe("getNotes()", () => {
  it("should return a default range starting from C0 with length 12", () => {
    const notes = getNotes({});

    expect(notes).toHaveLength(12);
    expect(notes[0].noteId).toBe("C-0");
    expect(notes[11].noteId).toBe("B-0");
    expect(notes[0].octaveNumber).toBe(0);
  });

  it("should correctly calculate octaves when spanning multiple octaves", () => {
    const length = 14;
    const notes = getNotes({ firstNote: "B", firstOctave: 1, length });

    expect(notes[0].noteId).toBe("B-1");
    expect(notes[1].noteId).toBe("C-2");
    expect(notes[13].noteId).toBe("C-3");
  });

  it("should handle enharmonic notes correctly (e.g., C# vs Db)", () => {
    const notes = getNotes({ firstNote: "C#", length: 1 });
    const note = notes[0];

    expect(note.sharpNoteName).toBe("C#");
    expect(note.flatNoteName).toBe("Db");
    expect(note.isEnharmonic).toBe(true);
  });

  it("should identify non-enharmonic notes (e.g., C)", () => {
    const notes = getNotes({ firstNote: "C", length: 1 });
    const note = notes[0];

    expect(note.sharpNoteName).toBe("C");
    expect(note.flatNoteName).toBe("C");
    expect(note.isEnharmonic).toBe(false);
  });

  it("should work correctly when starting from a flat note name", () => {
    const notes = getNotes({ firstNote: "Bb", length: 1 });

    expect(notes[0].sharpNoteName).toBe("A#");
    expect(notes[0].flatNoteName).toBe("Bb");
  });

  it("should throw an error for an invalid note name", () => {
    // @ts-expect-error: It tests runtime validation for invalid input
    expect(() => getNotes({ firstNote: "H" })).toThrowError('Note "H" is not a valid note.');
  });

  it("should return the exact requested number of notes", () => {
    const lengths = [1, 5, 24, 100];
    lengths.forEach((len) => {
      expect(getNotes({ length: len })).toHaveLength(len);
    });
  });

  it("should maintain stable noteId format {sharpName}-{octave}", () => {
    const notes = getNotes({ firstNote: "F#", firstOctave: 4, length: 1 });
    expect(notes[0].noteId).toBe("F#-4");
  });
});
