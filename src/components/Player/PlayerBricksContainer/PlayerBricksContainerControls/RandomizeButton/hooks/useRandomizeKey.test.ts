/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRandomizeKey } from "./useRandomizeKey";
import { useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS } from "@/data";

vi.mock("@/store", () => ({
  useControlsStore: vi.fn(),
}));

describe("useRandomizeKey()", () => {
  const setTuneKeyIdMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useControlsStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ setTuneKeyId: setTuneKeyIdMock }),
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

    expect(setTuneKeyIdMock).toHaveBeenCalledWith(expectedKey);

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
    expect(setTuneKeyIdMock).toHaveBeenCalledWith(expectedKey);

    mathSpy.mockRestore();
  });
});
