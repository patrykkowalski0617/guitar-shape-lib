import { describe, it, expect, vi } from "vitest";
import { getAutoSelectedShape } from "./getAutoSelectedShape";
import * as filteredOptionsModule from "./getFilteredShapeOptions";
import type { RoleId } from "@/data";

describe("getAutoSelectedShape - Deep Coverage", () => {
  describe("Relativity and Key changes", () => {
    it("should return correct relative shapeSemitoneOffsetFromCs for Major Tonic in C and G", () => {
      const resultC = getAutoSelectedShape("tonic", true, "C");
      const resultG = getAutoSelectedShape("tonic", true, "G");

      expect(resultC.shapeSemitoneOffsetFromC).toBe(0);
      expect(resultG.shapeSemitoneOffsetFromC).toBe(0);
      expect(resultC.shapeId).toBe(resultG.shapeId);
    });

    it("should return shapeSemitoneOffsetFromC 9 for Minor Tonic in any key (relative VI degree)", () => {
      const resultC = getAutoSelectedShape("tonic", false, "C");
      const resultF = getAutoSelectedShape("tonic", false, "F");

      expect(resultC.shapeSemitoneOffsetFromC).toBe(9);
      expect(resultF.shapeSemitoneOffsetFromC).toBe(9);
    });
  });

  describe("Edge Cases & Safety", () => {
    it("should return nulls when roleId is null or undefined", () => {
      expect(getAutoSelectedShape(null, true, "C")).toEqual({ shapeId: null, shapeSemitoneOffsetFromC: null });
    });

    it("should return nulls for global roles", () => {
      expect(getAutoSelectedShape("all-one-instance", true, "C")).toEqual({
        shapeId: null,
        shapeSemitoneOffsetFromC: null,
      });
      expect(getAutoSelectedShape("all-matching-key", true, "C")).toEqual({
        shapeId: null,
        shapeSemitoneOffsetFromC: null,
      });
    });

    it("should handle scenario where DEFAULT_SHAPES_CONFIG shape is missing in options", () => {
      const spy = vi.spyOn(filteredOptionsModule, "getFilteredShapeOptions");
      spy.mockReturnValueOnce([]);

      const result = getAutoSelectedShape("tonic", true, "C");

      expect(result).toEqual({ shapeId: null, shapeSemitoneOffsetFromC: null });

      spy.mockRestore();
    });
  });

  describe("Mode Consistency", () => {
    it("should use different config keys for major and minor", () => {
      const majorTonic = getAutoSelectedShape("tonic", true, "C");
      const minorTonic = getAutoSelectedShape("tonic", false, "C");

      expect(majorTonic.shapeSemitoneOffsetFromC).toBe(0);
      expect(minorTonic.shapeSemitoneOffsetFromC).toBe(9);
    });
  });

  it("should correctly access config even with different functional roles", () => {
    const roles: RoleId[] = ["tonic", "subdominant", "dominant"];

    roles.forEach((role) => {
      const result = getAutoSelectedShape(role, true, "C");
      expect(result.shapeId).not.toBeNull();
      expect(typeof result.shapeSemitoneOffsetFromC).toBe("number");
    });
  });
});
