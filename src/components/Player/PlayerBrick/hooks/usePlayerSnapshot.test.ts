/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePlayerSnapshot } from "./usePlayerSnapshot";
import { usePlayerStore, useControlsStore, useMusicStore } from "@/store";
import { useApplySnapshotToStore } from "./useApplySnapshotToStore";

vi.mock("./useApplySnapshotToStore", () => ({
  useApplySnapshotToStore: vi.fn(),
}));

describe("usePlayerSnapshot", () => {
  const brickId = 1;
  const onToggleEdit = vi.fn();
  const mockApplySnapshot = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useApplySnapshotToStore).mockReturnValue(mockApplySnapshot);

    usePlayerStore.setState({
      bricks: [{ id: brickId, width: 4, snapshot: null }],
      updateBrickSnapshot: vi.fn(),
    });

    useControlsStore.setState({
      tuneKeyId: "C",
      isMajorMode: true,
      roleId: "tonic",
      shapeId: "M7",
      shapeSemitoneOffsetFromC: 0,
    });

    useMusicStore.setState({
      shapeVariantLocationData: null,
      setShapeVariantLocationData_locked: vi.fn(),
    });
  });

  it("should update brick snapshot in store when isEditable is true", () => {
    const updateSpy = vi.fn();
    usePlayerStore.setState({ updateBrickSnapshot: updateSpy });

    renderHook(() => usePlayerSnapshot(brickId, true, onToggleEdit));

    expect(updateSpy).toHaveBeenCalledWith(
      brickId,
      expect.objectContaining({
        keyId: "C",
        shapeId: "M7",
      }),
    );
  });

  it("should return currentLiveState as displayData when isEditable is true", () => {
    const { result } = renderHook(() =>
      usePlayerSnapshot(brickId, true, onToggleEdit),
    );

    expect(result.current.displayData.keyId).toBe("C");
    expect(result.current.isEditable).toBe(true);
  });

  it("should return brick snapshot as displayData when isEditable is false", () => {
    const savedSnapshot = { keyId: "G" } as any;
    usePlayerStore.setState({
      bricks: [{ id: brickId, width: 4, snapshot: savedSnapshot }],
    });

    const { result } = renderHook(() =>
      usePlayerSnapshot(brickId, false, onToggleEdit),
    );

    expect(result.current.displayData.keyId).toBe("G");
  });

  it("should call onToggleEdit and set locked data when handleClick is called", () => {
    const setLockedSpy = vi.fn();
    useMusicStore.setState({
      setShapeVariantLocationData_locked: setLockedSpy,
    });

    const { result } = renderHook(() =>
      usePlayerSnapshot(brickId, true, onToggleEdit),
    );

    act(() => {
      result.current.handleClick({ stopPropagation: vi.fn() } as any);
    });

    expect(setLockedSpy).toHaveBeenCalled();
    expect(onToggleEdit).toHaveBeenCalled();
  });

  it("should apply snapshot to store when clicking an unedited brick with a rootNote", () => {
    const savedSnapshot = { rootNote: "C", keyId: "F" } as any;
    usePlayerStore.setState({
      bricks: [{ id: brickId, width: 4, snapshot: savedSnapshot }],
    });

    const { result } = renderHook(() =>
      usePlayerSnapshot(brickId, false, onToggleEdit),
    );

    act(() => {
      result.current.handleClick({ stopPropagation: vi.fn() } as any);
    });

    expect(mockApplySnapshot).toHaveBeenCalledWith(savedSnapshot);
  });
});
