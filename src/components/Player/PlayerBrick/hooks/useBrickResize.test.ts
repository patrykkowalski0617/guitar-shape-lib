/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBrickResize } from "./useBrickResize";

describe("useBrickResize", () => {
  const onWidthChange = vi.fn();
  const setIsResizing = vi.fn();
  const defaultProps = {
    isEditable: true,
    width: 4,
    onWidthChange,
    birckWidthUnit: 20,
    isResizing: false,
    setIsResizing,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not start resizing if isEditable is false", () => {
    const { result } = renderHook(() =>
      useBrickResize({ ...defaultProps, isEditable: false }),
    );

    const mousedownEvent = {
      clientX: 100,
      stopPropagation: vi.fn(),
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.handleMouseDown(mousedownEvent);
    });

    expect(mousedownEvent.stopPropagation).toHaveBeenCalled();

    const mousemoveEvent = new MouseEvent("mousemove", { clientX: 120 });
    act(() => {
      window.dispatchEvent(mousemoveEvent);
    });

    expect(onWidthChange).not.toHaveBeenCalled();
  });

  it("should call onWidthChange with correct value when mouse moves", () => {
    const { result } = renderHook(() => useBrickResize(defaultProps));

    const mousedownEvent = {
      clientX: 100,
      stopPropagation: vi.fn(),
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.handleMouseDown(mousedownEvent);
    });

    const mousemoveEvent = new MouseEvent("mousemove", { clientX: 120 });
    act(() => {
      window.dispatchEvent(mousemoveEvent);
    });

    expect(setIsResizing).toHaveBeenCalledWith(true);
    expect(onWidthChange).toHaveBeenCalledWith(5);
  });

  it("should call onWidthChange with correct value during touch movement", () => {
    const { result } = renderHook(() => useBrickResize(defaultProps));

    const touchStartEvent = {
      touches: [{ clientX: 100 }],
    } as unknown as React.TouchEvent;

    act(() => {
      result.current.handleTouchStart(touchStartEvent);
    });

    const touchMoveEvent = {
      touches: [{ clientX: 60 }],
    } as unknown as React.TouchEvent;

    act(() => {
      result.current.handleTouchMove(touchMoveEvent);
    });

    expect(onWidthChange).toHaveBeenCalledWith(2);
  });

  it("should stop resizing and clean up listeners on mouseup", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { result } = renderHook(() => useBrickResize(defaultProps));

    act(() => {
      result.current.handleMouseDown({
        clientX: 100,
        stopPropagation: vi.fn(),
      } as unknown as React.MouseEvent);
    });

    const mouseupEvent = new MouseEvent("mouseup");
    act(() => {
      window.dispatchEvent(mouseupEvent);
    });

    expect(setIsResizing).toHaveBeenCalledWith(false);
    expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("mouseup", expect.any(Function));
  });

  it("should stop resizing on touchend", () => {
    const { result } = renderHook(() => useBrickResize(defaultProps));

    act(() => {
      result.current.handleTouchEnd();
    });

    expect(setIsResizing).toHaveBeenCalledWith(false);
  });
});
