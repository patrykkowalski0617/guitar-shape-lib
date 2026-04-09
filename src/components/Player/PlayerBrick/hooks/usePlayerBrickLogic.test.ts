/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePlayerBrickLogic } from "./usePlayerBrickLogic";
import { usePlayerStore } from "@/store";
import { useBrickResize } from "./useBrickResize";

vi.mock("./usePlayerSnapshot", () => ({
  usePlayerSnapshot: vi.fn(() => ({
    displayData: {
      rootNote: "G",
      shapeLabel: "M7",
      shapeVariantLocationData: {},
    },
    handleClick: vi.fn(),
    applySnapshotToStore: vi.fn(),
    lockedSnapshot: { rootNote: "G", shapeVariantLocationData: {} },
  })),
}));

vi.mock("./useBrickWidthUnit", () => ({
  useBrickWidthUnit: vi.fn(() => 25),
}));

vi.mock("./useBrickResize", () => ({
  useBrickResize: vi.fn(),
}));

describe("usePlayerBrickLogic", () => {
  const brick = { id: 1, width: 4, snapshot: {} } as any;
  const defaultProps = {
    brick,
    isEditable: true,
    onToggleEdit: vi.fn(),
    onWidthChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    usePlayerStore.setState({
      currentStep: 0,
      bricks: [brick],
      isPlaying: false,
      isCountingIn: false,
    });

    vi.mocked(useBrickResize).mockImplementation(({ setIsResizing }) => ({
      handleMouseDown: () => setIsResizing(true),
      handleTouchStart: vi.fn(),
      handleTouchMove: vi.fn(),
      handleTouchEnd: vi.fn(),
    }));
  });

  it("should calculate correct label when not resizing and has data", () => {
    const { result } = renderHook(() => usePlayerBrickLogic(defaultProps));
    expect(result.current.label).toBe("G M7");
  });

  it("should show width as label when resizing is active", () => {
    const { result } = renderHook(() => usePlayerBrickLogic(defaultProps));

    act(() => {
      result.current.resizeHandlers.handleMouseDown({} as any);
    });

    expect(result.current.isResizing).toBe(true);
    expect(result.current.label).toBe(4);
  });

  it("should calculate activePart correctly during playback", () => {
    usePlayerStore.setState({
      currentStep: 2,
      isPlaying: true,
      isCountingIn: false,
      bricks: [brick],
    });

    const { result } = renderHook(() => usePlayerBrickLogic(defaultProps));
    expect(result.current.activePart).toBe(3);
  });
});
