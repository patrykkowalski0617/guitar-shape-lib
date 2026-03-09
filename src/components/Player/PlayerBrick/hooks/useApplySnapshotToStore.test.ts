/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useApplySnapshotToStore } from "./useApplySnapshotToStore";
import { useControlsStore, useMusicStore } from "@/store";
import { type Snapshot } from "./index";

const mockSnapshot: Snapshot = {
  keyId: "G",
  isMajorMode: false,
  roleId: "subdominant",
  shapeVariantLocationData: {
    shapeId: "m7",
    stringId: "strE",
    fretIndex: 3,
    variantId: "v1",
  },
  rootNote: "C",
  shapeLabel: "m7",
  shapeSemitoneOffsetFromC: 7,
  shapeId: "m7",
};

describe("useApplySnapshotToStore", () => {
  beforeEach(() => {
    useControlsStore.setState({
      tuneKeyId: "C",
      isMajorMode: true,
      roleId: "tonic",
      shapeId: "M7",
      shapeSemitoneOffsetFromC: 0,
    });
    useMusicStore.setState({
      shapeVariantLocationData: null,
    });
  });

  it("should update all stores with snapshot data when called", () => {
    const { result } = renderHook(() => useApplySnapshotToStore());

    act(() => {
      result.current(mockSnapshot);
    });

    const controlsState = useControlsStore.getState();
    const musicState = useMusicStore.getState();

    expect(controlsState.tuneKeyId).toBe("G");
    expect(controlsState.isMajorMode).toBe(false);
    expect(controlsState.roleId).toBe("subdominant");
    expect(controlsState.shapeId).toBe("m7");
    expect(controlsState.shapeSemitoneOffsetFromC).toBe(7);
    expect(musicState.shapeVariantLocationData).toEqual(
      mockSnapshot.shapeVariantLocationData,
    );
  });

  it("should handle null values in snapshot correctly", () => {
    const { result } = renderHook(() => useApplySnapshotToStore());

    const partialSnapshot: Snapshot = {
      ...mockSnapshot,
      roleId: null,
      shapeVariantLocationData: null,
    };

    act(() => {
      result.current(partialSnapshot);
    });

    const controlsState = useControlsStore.getState();
    const musicState = useMusicStore.getState();

    expect(controlsState.roleId).toBeNull();
    expect(musicState.shapeVariantLocationData).toBeNull();
  });

  it("should update state independently for each store", () => {
    const { result } = renderHook(() => useApplySnapshotToStore());

    act(() => {
      result.current(mockSnapshot);
    });

    const controlsState = useControlsStore.getState();
    expect(controlsState.tuneKeyId).toBe("G");
    expect(controlsState.shapeId).toBe("m7");
  });
});
