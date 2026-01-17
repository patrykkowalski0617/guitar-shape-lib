import { useState, useEffect } from "react";
import shapes, { type Shapes } from "@/utils/shapes";
import { useControlsStore } from "@/store/useControlsStore";

export const useFretboardDevEditor = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const [devPoints, setDevPoints] = useState<{ s: number; f: number }[]>([]);

  const onDevClick = (s: number, f: number) => {
    if (!currentShapeId) return;
    setDevPoints((prev) => {
      const exists = prev.find((p) => p.s === s && p.f === f);
      return exists ? prev.filter((p) => p !== exists) : [...prev, { s, f }];
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c" && devPoints.length > 0 && currentShapeId) {
        const base = devPoints[0];
        const shapeData = (shapes as Shapes)[currentShapeId];
        const currentCoords = shapeData?.shapesCoordinates || {};
        const keys = Object.keys(currentCoords);

        const maxIdx = keys.reduce((max, key) => {
          const num = parseInt(key.split("_").pop() || "0");
          return num > max ? num : max;
        }, 0);

        const nextIdx = maxIdx + 1;

        const sorted = [...devPoints].sort((a, b) => b.s - a.s);
        const shapeBody = sorted.map((p) => `[${p.s}, ${p.f - base.f}]`).join(",");

        const output = `
               ${currentShapeId}_${nextIdx}: [${shapeBody}],`;

        navigator.clipboard.writeText(output);
        console.log(
          `%c GENEROWANIE: ${currentShapeId}_${nextIdx}`,
          "color: #00ff00; font-weight: bold;"
        );
        console.log(output);
      }

      if (e.key.toLowerCase() === "r") {
        setDevPoints([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [devPoints, currentShapeId]);

  return {
    onDevClick,
    hasPoints: devPoints.length > 0,
    isDevNote: (s: number, f: number) => devPoints.some((p) => p.s === s && p.f === f),
  };
};
