/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRandomizeRole } from "./useRandomizeRole";
import { useControlsStore } from "@/store/useControlsStore";
import { roles, type RoleId } from "@/data";

vi.mock("@/store/useControlsStore", () => ({
  useControlsStore: vi.fn(),
}));

describe("useRandomizeRole()", () => {
  const setCurrentRoleIdMock = vi.fn();

  const functionalRoles = (Object.keys(roles) as RoleId[]).filter((id) => id !== "all");

  beforeEach(() => {
    vi.clearAllMocks();

    (useControlsStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ setCurrentRoleId: setCurrentRoleIdMock }),
    );
  });

  it("should pick the first functional role and update the store when Math.random is 0", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    const { result } = renderHook(() => useRandomizeRole());

    let randomRole;
    act(() => {
      randomRole = result.current();
    });

    const expectedRole = functionalRoles[0];

    expect(randomRole).toBe(expectedRole);
    expect(setCurrentRoleIdMock).toHaveBeenCalledWith(expectedRole);
    expect(randomRole).not.toBe("all");

    mathSpy.mockRestore();
  });

  it("should pick the last functional role (excluding 'all') when Math.random is near 1", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0.999);

    const { result } = renderHook(() => useRandomizeRole());

    let randomRole;
    act(() => {
      randomRole = result.current();
    });

    const expectedRole = functionalRoles[functionalRoles.length - 1];

    expect(randomRole).toBe(expectedRole);
    expect(setCurrentRoleIdMock).toHaveBeenCalledWith(expectedRole);
    expect(randomRole).not.toBe("all");

    mathSpy.mockRestore();
  });

  it("should never return 'all' role", () => {
    const { result } = renderHook(() => useRandomizeRole());

    for (let i = 0; i < 50; i++) {
      let randomRole;
      act(() => {
        randomRole = result.current();
      });
      expect(randomRole).not.toBe("all");
    }
  });
});
