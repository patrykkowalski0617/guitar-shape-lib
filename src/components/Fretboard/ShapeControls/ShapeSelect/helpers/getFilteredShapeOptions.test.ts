import { describe, it, expect, vi } from "vitest";
import { getAutoSelectedShape } from "./getAutoSelectedShape";
import type { ShapeOption } from "./getFilteredShapeOptions";
import * as filteredOptionsModule from "./getFilteredShapeOptions";
import type { RoleId } from "@/data";

describe("getAutoSelectedShape", () => {
  it.each(["all-one-instance", "all-matching-key"])(
    "should return null for shapeId and shapeSemitoneOffsetFromC when roleId is: %s",
    (roleId) => {
      const result = getAutoSelectedShape(roleId as RoleId, true, "C");
      expect(result).toEqual({ shapeId: null, shapeSemitoneOffsetFromC: null });
    },
  );

  describe("Relativity across different tuneKeyId", () => {
    it("should return shapeSemitoneOffsetFromC 0 for tonic role in any tuneKeyId", () => {
      const resultC = getAutoSelectedShape("tonic", true, "C");
      const resultG = getAutoSelectedShape("tonic", true, "G");

      expect(resultC.shapeSemitoneOffsetFromC).toBe(0);
      expect(resultG.shapeSemitoneOffsetFromC).toBe(0);
      expect(resultC.shapeId).toBe(resultG.shapeId);
    });

    it("should return shapeSemitoneOffsetFromC 9 for tonic role in minor mode (relative VI degree)", () => {
      const resultC = getAutoSelectedShape("tonic", false, "C");
      expect(resultC.shapeSemitoneOffsetFromC).toBe(9);
    });
  });

  describe("Safety and Fallbacks", () => {
    it("should return nulls if getFilteredShapeOptions returns no options", () => {
      const spy = vi.spyOn(filteredOptionsModule, "getFilteredShapeOptions");

      spy.mockReturnValueOnce([] as ShapeOption[]);

      const result = getAutoSelectedShape("tonic", true, "C");

      expect(result).toEqual({ shapeId: null, shapeSemitoneOffsetFromC: null });

      spy.mockRestore();
    });

    it("should return nulls if roleId is null", () => {
      const result = getAutoSelectedShape(null, true, "C");
      expect(result).toEqual({ shapeId: null, shapeSemitoneOffsetFromC: null });
    });
  });

  it("should ensure shapeId is always returned as a string", () => {
    const result = getAutoSelectedShape("tonic", true, "C");
    if (result.shapeId !== null) {
      expect(typeof result.shapeId).toBe("string");
    }
  });
});
