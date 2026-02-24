import { useState } from "react";
import { usePlayerStore } from "@/store";

export const usePlayerBricksDrag = () => {
  const reorderBricks = usePlayerStore((state) => state.reorderBricks);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number, isEditable: boolean) => {
    if (isEditable) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();

    const isInvalidMove = draggedIndex === null || draggedIndex === targetIndex;
    if (isInvalidMove) return;

    reorderBricks(draggedIndex, targetIndex);
    setDraggedIndex(targetIndex);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return {
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
