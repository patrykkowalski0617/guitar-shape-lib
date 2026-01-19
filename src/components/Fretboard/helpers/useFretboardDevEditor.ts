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
        const shapeData = (shapes as Shapes)[currentShapeId];
        const currentCoords = shapeData?.shapesCoordinates || {};
        const keys = Object.keys(currentCoords);

        const maxIdx = keys.reduce((max, key) => {
          const num = parseInt(key.split("_").pop() || "0");
          return num > max ? num : max;
        }, 0);

        let nextIdx = maxIdx + 1;
        let finalOutput = "";

        let currentPoints = [...devPoints].sort((a, b) => b.s - a.s);

        while (currentPoints.length > 0) {
          const iterationBase = currentPoints[0];

          const shapeBody = currentPoints
            .map((p) => `[${p.s}, ${p.f - iterationBase.f}]`)
            .join(",");

          finalOutput += `
              // prettier-ignore
              ${currentShapeId}_${nextIdx}: [${shapeBody}],`;

          nextIdx++;

          currentPoints = currentPoints
            .map((p) => {
              const nextS = p.s - 1;
              let nextF = p.f;

              if (p.s === 2 && nextS === 1) {
                nextF += 1;
              }

              return { s: nextS, f: nextF };
            })

            .filter((p) => p.s >= 0);
        }

        navigator.clipboard.writeText(finalOutput);
        console.log(
          `%c GENEROWANIE KOMPLETU: ${currentShapeId}`,
          "color: #00ff00; font-weight: bold;"
        );
        console.log(finalOutput);
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
