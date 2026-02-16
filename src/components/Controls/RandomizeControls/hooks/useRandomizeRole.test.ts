/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRandomizeRole } from "./useRandomizeRole";
import { useControlsStore } from "@/store/useControlsStore";
import { roles } from "@/data";

vi.mock("@/store/useControlsStore", () => ({
  useControlsStore: vi.fn(),
}));

describe("useRandomizeRole()", () => {
  const setCurrentRoleIdMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useControlsStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ setCurrentRoleId: setCurrentRoleIdMock }),
    );
  });

  it("should pick a random role and update the store", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    const { result } = renderHook(() => useRandomizeRole());

    let randomRole;
    act(() => {
      randomRole = result.current();
    });

    const roleIds = Object.keys(roles);
    const expectedRole = roleIds[0];

    expect(randomRole).toBe(expectedRole);
    expect(setCurrentRoleIdMock).toHaveBeenCalledWith(expectedRole);

    mathSpy.mockRestore();
  });

  it("should pick the last role when Math.random is near 1", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0.99);

    const { result } = renderHook(() => useRandomizeRole());

    let randomRole;
    act(() => {
      randomRole = result.current();
    });

    const roleIds = Object.keys(roles);
    const expectedRole = roleIds[roleIds.length - 1];

    expect(randomRole).toBe(expectedRole);
    expect(setCurrentRoleIdMock).toHaveBeenCalledWith(expectedRole);

    mathSpy.mockRestore();
  });
});
