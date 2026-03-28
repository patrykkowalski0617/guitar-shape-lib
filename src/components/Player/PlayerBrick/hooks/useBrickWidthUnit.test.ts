/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBrickWidthUnit } from "./useBrickWidthUnit";

describe("useBrickWidthUnit", () => {
  const setViewportWidth = (width: number) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches:
        query.includes(`${width}px`) ||
        (query.includes("1024px") && width >= 1024) ||
        (query.includes("768px") && width >= 768),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 35 for desktop viewports", () => {
    setViewportWidth(1390);
    const { result } = renderHook(() => useBrickWidthUnit());
    expect(result.current).toBe(35);
  });

  it("should return 20 for tablet viewports", () => {
    setViewportWidth(800);
    const { result } = renderHook(() => useBrickWidthUnit());
    expect(result.current).toBe(20);
  });

  it("should return 15 for mobile viewports", () => {
    setViewportWidth(500);
    const { result } = renderHook(() => useBrickWidthUnit());
    expect(result.current).toBe(15);
  });

  it("should update unit value on window resize", () => {
    setViewportWidth(1200);
    const { result } = renderHook(() => useBrickWidthUnit());
    expect(result.current).toBe(35);

    act(() => {
      setViewportWidth(500);
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(15);
  });

  it("should clean up the resize listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useBrickWidthUnit());

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
