import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFretboardCell } from "./hooks/useFretboardCell";
import type { NoteObject } from "@/utils";

const mockSetActiveHoverNoteId = vi.fn();
const mockSetActiveLockedNoteIds = vi.fn();
const mockGetEnharmonicNoteName = vi.fn(() => "C#");
const mockIsNoteActive = vi.fn(() => false);
let mockGuitarShape: unknown = null;

vi.mock("@/store", () => ({
  useMusicStore: (selector: (s: unknown) => unknown) =>
    selector({
      setActiveHoverNoteId: mockSetActiveHoverNoteId,
      setActiveLockedNoteIds: mockSetActiveLockedNoteIds,
    }),
}));

vi.mock("@/hooks", () => ({
  useEnharmonicNoteName: () => mockGetEnharmonicNoteName,
  useGuitarShape: () => mockGuitarShape,
}));

vi.mock("@/hooks/useIsNoteActive", () => ({
  useIsNoteActive: () => mockIsNoteActive(),
}));

const noteObject: NoteObject = {
  noteId: "C#-4",
  sharpNoteName: "C#",
  flatNoteName: "Db",
  isEnharmonic: true,
  octaveNumber: 4,
};

describe("useFretboardCell()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGuitarShape = null;
  });

  it("should call setActiveHoverNoteId with noteId on mouse enter", () => {
    const { result } = renderHook(() =>
      useFretboardCell({ noteObject, isShapeCell: false }),
    );

    act(() => result.current.handleMouseEnter());

    expect(mockSetActiveHoverNoteId).toHaveBeenCalledWith("C#-4");
  });

  it("should call setActiveHoverNoteId with null on mouse leave", () => {
    const { result } = renderHook(() =>
      useFretboardCell({ noteObject, isShapeCell: false }),
    );

    act(() => result.current.handleMouseLeave());

    expect(mockSetActiveHoverNoteId).toHaveBeenCalledWith(null);
  });

  it("should lock note on click when no guitar shape is active", () => {
    mockGuitarShape = null;

    const { result } = renderHook(() =>
      useFretboardCell({ noteObject, isShapeCell: false }),
    );

    act(() => result.current.handleClick());

    expect(mockSetActiveLockedNoteIds).toHaveBeenCalledWith("C#-4");
  });

  it("should NOT lock note on click when guitar shape is active", () => {
    mockGuitarShape = { label: "Am", intervals: [0, 3, 7] };

    const { result } = renderHook(() =>
      useFretboardCell({ noteObject, isShapeCell: false }),
    );

    act(() => result.current.handleClick());

    expect(mockSetActiveLockedNoteIds).not.toHaveBeenCalled();
  });

  it("should return noteLabel from getEnharmonicNoteName", () => {
    mockGetEnharmonicNoteName.mockReturnValue("Db");

    const { result } = renderHook(() =>
      useFretboardCell({ noteObject, isShapeCell: true }),
    );

    expect(result.current.noteLabel).toBe("Db");
  });

  it("should return isActiveNote from useIsNoteActive", () => {
    mockIsNoteActive.mockReturnValue(true);

    const { result } = renderHook(() =>
      useFretboardCell({ noteObject, isShapeCell: false }),
    );

    expect(result.current.isActiveNote).toBe(true);
  });

  it("should return stable handler references across re-renders (useCallback)", () => {
    const { result, rerender } = renderHook(() =>
      useFretboardCell({ noteObject, isShapeCell: false }),
    );

    const first = {
      enter: result.current.handleMouseEnter,
      leave: result.current.handleMouseLeave,
      click: result.current.handleClick,
    };

    rerender();

    expect(result.current.handleMouseEnter).toBe(first.enter);
    expect(result.current.handleMouseLeave).toBe(first.leave);
    expect(result.current.handleClick).toBe(first.click);
  });
});
