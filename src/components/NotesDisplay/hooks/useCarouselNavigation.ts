import { useEffect, useRef } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface UseCarouselNavigationProps {
  api: CarouselApi | undefined;
  notes: string[];
  currentKeyNumericId: number;
  currentKeyFirstNote: string;
}

export function useCarouselNavigation({
  api,
  notes,
  currentKeyNumericId,
  currentKeyFirstNote,
}: UseCarouselNavigationProps) {
  const prevKeyNumericIdRef = useRef<number>(currentKeyNumericId);
  console.log(currentKeyFirstNote);

  useEffect(() => {
    if (!api) return;

    const currentIndex = api.selectedScrollSnap();
    const allMatchingIndices = notes
      .map((n, i) => (n === currentKeyFirstNote ? i : -1))
      .filter((i) => i !== -1);

    if (allMatchingIndices.length === 0) return;

    let targetIndex: number;

    const keyChanged = prevKeyNumericIdRef.current !== currentKeyNumericId;

    if (keyChanged) {
      // Logika kierunkowa przy zmianie tonacji
      if (currentKeyNumericId > prevKeyNumericIdRef.current) {
        targetIndex = allMatchingIndices.find((i) => i > currentIndex) ?? allMatchingIndices[0];
      } else {
        targetIndex =
          [...allMatchingIndices].reverse().find((i) => i < currentIndex) ??
          allMatchingIndices[allMatchingIndices.length - 1];
      }
      prevKeyNumericIdRef.current = currentKeyNumericId;
    } else {
      // Logika najbliższej nuty przy zmianie trybu (Major/Minor)
      targetIndex = allMatchingIndices.reduce((prev, curr) =>
        Math.abs(curr - currentIndex) < Math.abs(prev - currentIndex) ? curr : prev
      );
    }

    api.scrollTo(targetIndex);
  }, [api, currentKeyNumericId, currentKeyFirstNote, notes]);
}
