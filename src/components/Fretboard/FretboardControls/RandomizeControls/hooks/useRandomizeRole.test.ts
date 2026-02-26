/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRandomizeRole } from "./useRandomizeRole";
import { useControlsStore } from "@/store";
import { roles, type RoleId, isGlobalRole } from "@/data";

vi.mock("@/store", () => ({
  useControlsStore: vi.fn(),
}));

describe("useRandomizeRole()", () => {
  const setRoleIdMock = vi.fn();

  const functionalRoles = (Object.keys(roles) as RoleId[]).filter((id) => !isGlobalRole(id));

  beforeEach(() => {
    vi.clearAllMocks();

    (useControlsStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ setRoleId: setRoleIdMock }),
    );
  });

  it("should pick the first functional role and update the store when Math.random is 0", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    const { result } = renderHook(() => useRandomizeRole());

    let randomRole: RoleId;
    act(() => {
      randomRole = result.current();
    });

    const expectedRole = functionalRoles[0];

    expect(randomRole! as unknown as RoleId).toBe(expectedRole);
    expect(setRoleIdMock).toHaveBeenCalledWith(expectedRole);
    expect(isGlobalRole(randomRole! as unknown as RoleId)).toBe(false);

    mathSpy.mockRestore();
  });

  it("should pick the last functional role (excluding global roles) when Math.random is near 1", () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0.999);

    const { result } = renderHook(() => useRandomizeRole());

    let randomRole: RoleId;
    act(() => {
      randomRole = result.current();
    });

    const expectedRole = functionalRoles[functionalRoles.length - 1];

    expect(randomRole! as unknown as RoleId).toBe(expectedRole);
    expect(setRoleIdMock).toHaveBeenCalledWith(expectedRole);
    expect(isGlobalRole(randomRole! as unknown as RoleId)).toBe(false);

    mathSpy.mockRestore();
  });

  it("should never return a global role", () => {
    const { result } = renderHook(() => useRandomizeRole());

    for (let i = 0; i < 50; i++) {
      let randomRole: RoleId;
      act(() => {
        randomRole = result.current();
      });
      expect(isGlobalRole(randomRole! as unknown as RoleId)).toBe(false);
    }
  });
});
