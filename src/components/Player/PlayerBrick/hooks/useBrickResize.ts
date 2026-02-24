import { useRef } from "react";

interface UseBrickResizeProps {
  isEditable: boolean;
  width: number;
  onWidthChange: (newWidth: number) => void;
  birckWidthUnit: number;
  isResizing: boolean;
  setIsResizing: (value: boolean) => void;
}

export function useBrickResize({
  isEditable,
  width,
  onWidthChange,
  birckWidthUnit,
  isResizing,
  setIsResizing,
}: UseBrickResizeProps) {
  const startX = useRef<number | null>(null);
  const startWidth = useRef<number>(width);

  const handleMouseMove = (e: MouseEvent) => {
    if (startX.current === null) return;
    if (!isResizing) setIsResizing(true);

    const delta = e.clientX - startX.current;
    const newWidth = Math.round(startWidth.current + delta / birckWidthUnit);
    onWidthChange(newWidth);
  };

  const handleMouseUp = () => {
    startX.current = null;
    setIsResizing(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditable) return;

    startX.current = e.clientX;
    startWidth.current = width;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isEditable) return;

    startX.current = e.touches[0].clientX;
    startWidth.current = width;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    if (!isResizing) setIsResizing(true);

    const delta = e.touches[0].clientX - startX.current;
    const newWidth = Math.round(startWidth.current + delta / birckWidthUnit);

    if (newWidth !== width) onWidthChange(newWidth);
  };

  const handleTouchEnd = () => {
    startX.current = null;
    setIsResizing(false);
  };

  return {
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
