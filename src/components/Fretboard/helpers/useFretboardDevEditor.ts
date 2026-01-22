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

        const existingVariantsStrings = new Set(
          Object.values(currentCoords).map((coords) => JSON.stringify(coords)),
        );

        const keys = Object.keys(currentCoords);
        const maxIdx = keys.reduce((max, key) => {
          const num = parseInt(key.split("_").pop() || "0");
          return num > max ? num : max;
        }, 0);

        let nextIdx = maxIdx + 1;
        let finalOutput = "";
        let skippedCount = 0;

        let currentPoints = [...devPoints].sort((a, b) => b.s - a.s);

        while (currentPoints.length > 0) {
          const iterationBase = currentPoints[0];

          const currentVariantArray = currentPoints
            .map((p) => [p.s, p.f - iterationBase.f])
            .sort((a, b) => b[0] - a[0] || a[1] - b[1]);

          const variantString = JSON.stringify(currentVariantArray);

          const alreadyExists = existingVariantsStrings.has(variantString);

          const isSingleRootOnly =
            currentVariantArray.length === 1 && currentVariantArray[0][1] === 0;

          const isInvalidStartingString =
            currentVariantArray.length > 0 &&
            (currentVariantArray[0][0] === 0 || currentVariantArray[0][0] === 1);

          if (!alreadyExists && !isSingleRootOnly && !isInvalidStartingString) {
            const shapeBody = currentVariantArray
              .map((coord) => `[${coord[0]}, ${coord[1]}]`)
              .join(",");

            finalOutput += `
              // prettier-ignore
              "${currentShapeId}_${nextIdx}": [${shapeBody}],`;

            nextIdx++;
          } else {
            skippedCount++;
          }

          currentPoints = currentPoints
            .map((p) => {
              const nextS = p.s - 1;
              let nextF = p.f;
              if (p.s === 2 && nextS === 1) nextF += 1;
              return { s: nextS, f: nextF };
            })
            .filter((p) => p.s >= 0);
        }

        if (finalOutput) {
          navigator.clipboard.writeText(finalOutput);
          console.log(
            `%c GENEROWANIE: ${currentShapeId} | Pominięto (duplikaty, single-root lub struna 0/1): ${skippedCount}`,
            "color: #00ff00; font-weight: bold;",
          );
          console.log(finalOutput);
        } else {
          console.log(`%c Brak nowych unikalnych wariantów do wygenerowania.`, "color: #ffa500;");
        }
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
