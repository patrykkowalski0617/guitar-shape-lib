/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRandomizeMode } from "./useRandomizeMode";
import { useControlsStore } from "@/store/useControlsStore";

vi.mock("@/store/useControlsStore", () => ({
  useControlsStore: vi.fn(),
}));

describe("useRandomizeMode()", () => {
  const setIsMajorModeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useControlsStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ setIsMajorMode: setIsMajorModeMock }),
    );
  });

  it("should set Major mode when random value is high (> 0.5)", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0.7);

    const { result } = renderHook(() => useRandomizeMode());

    let mode;
    act(() => {
      mode = result.current();
    });

    expect(mode).toBe(true);
    expect(setIsMajorModeMock).toHaveBeenCalledWith(true);

    mathSpy.mockRestore();
  });

  it("should set Minor mode when random value is low (< 0.5)", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0.2);

    const { result } = renderHook(() => useRandomizeMode());

    let mode;
    act(() => {
      mode = result.current();
    });

    expect(mode).toBe(false);
    expect(setIsMajorModeMock).toHaveBeenCalledWith(false);

    mathSpy.mockRestore();
  });
});
