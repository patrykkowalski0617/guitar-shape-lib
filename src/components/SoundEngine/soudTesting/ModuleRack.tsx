import { useState } from "react";
import { Module } from "./Module";
import type { ModuleRackProps } from "./types";

export const ModuleRack = ({
  modules,
  onParamChange,
  onReorder,
}: ModuleRackProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorder(draggedIndex, dropIndex);
    }
    setDragOverIndex(null);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        overflowX: "auto",
        padding: "1rem",
        minHeight: "400px",
        background: "var(--color-background-primary)",
        borderRadius: "var(--border-radius-lg)",
        border: "0.5px solid var(--color-border-tertiary)",
      }}
    >
      {modules.map((module, index) => (
        <Module
          key={module.id}
          module={module}
          index={index}
          onParamChange={(key, val) => onParamChange(module.id, key, val)}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          isDragging={draggedIndex === index}
          isDragOver={dragOverIndex === index}
        />
      ))}
    </div>
  );
};
