import { describe, it, expect, vi } from "vitest";
import { getAutoSelectedShape } from "./getAutoSelectedShape";
import type { ShapeOption } from "./getFilteredShapeOptions";
import * as filteredOptionsModule from "./getFilteredShapeOptions";
import type { RoleId } from "@/data";

describe("getAutoSelectedShape", () => {
  it.each(["all-one-instance", "all-matching-key"])(
    "should return null for shapeId and offset when currentRoleId is: %s",
    (currentRoleId) => {
      const result = getAutoSelectedShape(currentRoleId as RoleId, true, "C");
      expect(result).toEqual({ shapeId: null, offset: null });
    },
  );

  describe("Relativity across different currentKeyId", () => {
    it("should return offset 0 for tonic role in any currentKeyId", () => {
      const resultC = getAutoSelectedShape("tonic", true, "C");
      const resultG = getAutoSelectedShape("tonic", true, "G");

      expect(resultC.offset).toBe(0);
      expect(resultG.offset).toBe(0);
      expect(resultC.shapeId).toBe(resultG.shapeId);
    });

    it("should return offset 9 for tonic role in minor mode (relative VI degree)", () => {
      const resultC = getAutoSelectedShape("tonic", false, "C");
      expect(resultC.offset).toBe(9);
    });
  });

  describe("Safety and Fallbacks", () => {
    it("should return nulls if getFilteredShapeOptions returns no options", () => {
      const spy = vi.spyOn(filteredOptionsModule, "getFilteredShapeOptions");

      spy.mockReturnValueOnce([] as ShapeOption[]);

      const result = getAutoSelectedShape("tonic", true, "C");

      expect(result).toEqual({ shapeId: null, offset: null });

      spy.mockRestore();
    });

    it("should return nulls if roleId is null", () => {
      const result = getAutoSelectedShape(null, true, "C");
      expect(result).toEqual({ shapeId: null, offset: null });
    });
  });

  it("should ensure shapeId is always returned as a string", () => {
    const result = getAutoSelectedShape("tonic", true, "C");
    if (result.shapeId !== null) {
      expect(typeof result.shapeId).toBe("string");
    }
  });
});
