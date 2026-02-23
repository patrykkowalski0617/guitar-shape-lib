/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRandomizeKey } from "./useRandomizeKey";
import { useControlsStore } from "@/store/useControlsStore";
import { UNIFIED_MUSIC_KEYS } from "@/data";

vi.mock("@/store/useControlsStore", () => ({
  useControlsStore: vi.fn(),
}));

describe("useRandomizeKey()", () => {
  const setCurrentKeyMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useControlsStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ setCurrentKey: setCurrentKeyMock }),
    );
  });

  it("should pick a random key and update the store", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    const { result } = renderHook(() => useRandomizeKey());

    let randomKey;
    act(() => {
      randomKey = result.current();
    });

    const keyIds = Object.keys(UNIFIED_MUSIC_KEYS);
    const expectedKey = keyIds[0];

    expect(randomKey).toBe(expectedKey);

    expect(setCurrentKeyMock).toHaveBeenCalledWith(expectedKey);

    mathSpy.mockRestore();
  });

  it("should return different keys for different random values", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0.999);

    const { result } = renderHook(() => useRandomizeKey());

    let randomKey;
    act(() => {
      randomKey = result.current();
    });

    const keyIds = Object.keys(UNIFIED_MUSIC_KEYS);
    const expectedKey = keyIds[keyIds.length - 1];

    expect(randomKey).toBe(expectedKey);
    expect(setCurrentKeyMock).toHaveBeenCalledWith(expectedKey);

    mathSpy.mockRestore();
  });
});
