/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRandomizeShape } from "./useRandomizeShape";
import { useControlsStore } from "@/store";
import { getFilteredShapeOptions } from "@/components/Controls/ShapeSelect/helpers/getFilteredShapeOptions";
import type { RoleId } from "@/data";

vi.mock("@/store", () => ({
  useControlsStore: vi.fn(),
}));

vi.mock("@/components/Controls/ShapeSelect/helpers/getFilteredShapeOptions", () => ({
  getFilteredShapeOptions: vi.fn(),
}));

describe("useRandomizeShape()", () => {
  const setShapeMock = vi.fn();
  const currentKeyIdMock = "C";

  beforeEach(() => {
    vi.clearAllMocks();

    (useControlsStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => {
      const state = {
        setShape: setShapeMock,
        currentKeyId: currentKeyIdMock,
      };
      return selector(state);
    });

    (getFilteredShapeOptions as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      { shapeId: "shape-1", offset: 0 },
      { shapeId: "shape-2", offset: 2 },
    ]);
  });

  it("should pick a random shape based on filtered options and update store", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    const { result } = renderHook(() => useRandomizeShape());

    let picked;
    act(() => {
      picked = result.current("tonic" as RoleId, true);
    });

    expect(picked).toEqual({ shapeId: "shape-1", offset: 0 });
    expect(setShapeMock).toHaveBeenCalledWith("shape-1", 0);

    expect(getFilteredShapeOptions).toHaveBeenCalledWith("tonic", true, "C");

    mathSpy.mockRestore();
  });

  it("should handle the last available shape option", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0.99);

    const { result } = renderHook(() => useRandomizeShape());

    let picked;
    act(() => {
      picked = result.current("dominant" as RoleId, false);
    });

    expect(picked).toEqual({ shapeId: "shape-2", offset: 2 });
    expect(setShapeMock).toHaveBeenCalledWith("shape-2", 2);

    mathSpy.mockRestore();
  });
});
