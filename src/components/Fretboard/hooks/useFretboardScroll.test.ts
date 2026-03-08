// @vitest-environment jsdom
import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useMusicStore, usePlayerStore } from "@/store";
import { useShapeCoordinates } from "@/components/Fretboard/FretboardCell/hooks";
import { useFretboardScroll } from "./useFretboardScroll";

vi.mock("@/store", () => ({
  useMusicStore: vi.fn(),
  usePlayerStore: vi.fn(),
}));

vi.mock("@/components/Fretboard/FretboardCell/hooks", () => ({
  useShapeCoordinates: vi.fn(),
}));

describe("useFretboardScroll", () => {
  let containerMock: any;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    const mockState = {
      isPlaying: false,
      shapeVariantLocationData: { id: "regular" },
      shapeVariantLocationData_locked: { id: "ghost" },
    };

    vi.mocked(usePlayerStore).mockImplementation((selector: any) =>
      selector(mockState),
    );
    vi.mocked(useMusicStore).mockImplementation((selector: any) =>
      selector(mockState),
    );

    containerMock = {
      current: {
        scrollLeft: 0,
        scrollTo: vi.fn(),
        getBoundingClientRect: () =>
          ({
            left: 0,
            right: 1000,
            top: 0,
            bottom: 0,
            width: 1000,
            height: 500,
          }) as DOMRect,
        querySelector: vi.fn(),
      },
    };
  });

  it("should NOT scroll if both lowest and highest frets are visible", () => {
    vi.mocked(useShapeCoordinates).mockReturnValue([
      [0, 5],
      [0, 8],
    ]);

    containerMock.current.querySelector.mockImplementation(
      (selector: string) => {
        if (selector === '[data-fret="5"]') {
          return {
            getBoundingClientRect: () => ({ left: 100, right: 150 }) as DOMRect,
          };
        }
        if (selector === '[data-fret="8"]') {
          return {
            getBoundingClientRect: () => ({ left: 800, right: 850 }) as DOMRect,
          };
        }
        return null;
      },
    );

    renderHook(() => useFretboardScroll(containerMock));
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(containerMock.current.scrollTo).not.toHaveBeenCalled();
  });

  it("should scroll to the highest fret if it is hidden on the right", () => {
    vi.mocked(useShapeCoordinates).mockReturnValue([
      [0, 5],
      [0, 15],
    ]);

    containerMock.current.querySelector.mockImplementation(
      (selector: string) => {
        if (selector === '[data-fret="5"]') {
          return {
            getBoundingClientRect: () => ({ left: 100, right: 150 }) as DOMRect,
          };
        }
        if (selector === '[data-fret="15"]') {
          return {
            getBoundingClientRect: () =>
              ({ left: 1100, right: 1200 }) as DOMRect,
          };
        }
        return null;
      },
    );

    renderHook(() => useFretboardScroll(containerMock));
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(containerMock.current.scrollTo).toHaveBeenCalledWith({
      left: 260,
      behavior: "smooth",
    });
  });

  it("should scroll to the lowest fret if it is hidden on the left", () => {
    vi.mocked(useShapeCoordinates).mockReturnValue([
      [0, 5],
      [0, 8],
    ]);

    containerMock.current.querySelector.mockImplementation(
      (selector: string) => {
        if (selector === '[data-fret="5"]') {
          return {
            getBoundingClientRect: () =>
              ({ left: -200, right: -150 }) as DOMRect,
          };
        }
        if (selector === '[data-fret="8"]') {
          return {
            getBoundingClientRect: () => ({ left: 100, right: 150 }) as DOMRect,
          };
        }
        return null;
      },
    );

    renderHook(() => useFretboardScroll(containerMock));
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(containerMock.current.scrollTo).toHaveBeenCalledWith({
      left: -260,
      behavior: "smooth",
    });
  });

  it("should scroll to 0 if theLowestFret is 0", () => {
    vi.mocked(useShapeCoordinates).mockReturnValue([]);

    renderHook(() => useFretboardScroll(containerMock));
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(containerMock.current.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ left: 0 }),
    );
  });
});
