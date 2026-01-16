import { useState, useEffect } from "react";
import shapes from "@/utils/shapes";
import { useControlsStore } from "@/store/useControlsStore";

export const useFretboardDevEditor = () => {
  const currentShapeId = useControlsStore((state) => state.currentShapeId);
  const [devPoints, setDevPoints] = useState<{ s: number; f: number }[]>([]);
  const [basePoint, setBasePoint] = useState<{ s: number; f: number } | null>(null);

  // Funkcja zwracająca funkcję dla onClick
  const onDevClick = (s: number, f: number) => () => {
    if (!basePoint) {
      setBasePoint({ s, f });
      setDevPoints([{ s, f }]);
      return;
    }

    setDevPoints((prev) => {
      const exists = prev.find((p) => p.s === s && p.f === f);
      if (exists) {
        // Jeśli odklikujemy bazę, resetujemy całość
        if (s === basePoint.s && f === basePoint.f) {
          setBasePoint(null);
          return [];
        }
        return prev.filter((p) => p !== exists);
      }
      return [...prev, { s, f }];
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c" && basePoint && currentShapeId) {
        const currentVariants = shapes[currentShapeId]?.variants || {};
        const indices = Object.keys(currentVariants)
          .map((k) => parseInt(k.split("_")[1]))
          .filter((n) => !isNaN(n));
        const nextIdx = indices.length > 0 ? Math.max(...indices) + 1 : 1;

        // Sortowanie punktów od najniższej struny (indeks 5 do 0)
        const sortedPoints = [...devPoints].sort((a, b) => b.s - a.s);

        const shapeBody = sortedPoints.map((p) => `[${p.s}, ${p.f - basePoint.f}]`).join(",");

        const output = `
    ${currentShapeId}_${nextIdx}: {
      targetStringIndex: ${basePoint.s},
      // prettier-ignore
      shape: [${shapeBody}],
    },`;

        navigator.clipboard.writeText(output);
        console.log("%c SKOPIOWANO DO SCHOWKA:", "color: #00ff00; font-weight: bold;", output);
      }

      if (e.key.toLowerCase() === "r") {
        setDevPoints([]);
        setBasePoint(null);
        console.log("Edytor wyczyszczony");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [devPoints, basePoint, currentShapeId]);

  return {
    onDevClick,
    isShapeNote: (s: number, f: number) => devPoints.some((p) => p.s === s && p.f === f),
  };
};
