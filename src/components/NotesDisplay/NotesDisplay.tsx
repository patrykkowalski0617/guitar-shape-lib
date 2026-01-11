import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useMusicStore } from "@/store/useMusicStore";
import { getNotes } from "@/utils";
import { UNIFIED_MUSIC_KEYS } from "@/utils/musicKeys/musicKeys";

export default function NotesDisplay() {
  const [api, setApi] = useState<CarouselApi>();

  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const isMajorMode = useMusicStore((state) => state.isMajorMode);

  // Pobieramy ID bieżącej tonacji
  const currentKeyNumericId = UNIFIED_MUSIC_KEYS[currentKeyId].id;

  // Ref przechowuje teraz poprzednie numeryczne ID
  const prevKeyNumericIdRef = useRef(currentKeyNumericId);

  const currentKeyFirstNote = isMajorMode
    ? UNIFIED_MUSIC_KEYS[currentKeyId].majorFirstNote
    : UNIFIED_MUSIC_KEYS[currentKeyId].relativeMinorFirstNote;

  const notes = useMemo(() => getNotes({ firstNote: "A", length: 80 }), []);

  useEffect(() => {
    if (!api) return;

    const currentIndex = api.selectedScrollSnap();
    let targetIndex = -1;

    // Znajdujemy wszystkie wystąpienia docelowej nuty w całej tablicy
    const allMatchingIndices = notes
      .map((n, i) => (n === currentKeyFirstNote ? i : -1))
      .filter((i) => i !== -1);

    if (prevKeyNumericIdRef.current !== currentKeyNumericId) {
      // SCENARIUSZ 1: Zmiana tonacji (Key Change)
      if (currentKeyNumericId > prevKeyNumericIdRef.current) {
        // ID wzrosło -> szukamy pierwszej pasującej nuty W GÓRĘ (index > currentIndex)
        targetIndex = allMatchingIndices.find((i) => i > currentIndex) ?? allMatchingIndices[0];
      } else {
        // ID spadło -> szukamy pierwszej pasującej nuty W DÓŁ (index < currentIndex)
        // [].reverse() pomaga znaleźć najbliższą mniejszą od obecnej
        targetIndex =
          [...allMatchingIndices].reverse().find((i) => i < currentIndex) ??
          allMatchingIndices[allMatchingIndices.length - 1];
      }

      // Aktualizujemy ref na nowe ID
      prevKeyNumericIdRef.current = currentKeyNumericId;
    } else {
      // SCENARIUSZ 2: Zmiana trybu (Major/Minor) -> Najbliższa nuta
      targetIndex = allMatchingIndices.reduce((prev, curr) => {
        return Math.abs(curr - currentIndex) < Math.abs(prev - currentIndex) ? curr : prev;
      });
    }

    if (targetIndex !== -1) {
      api.scrollTo(targetIndex);
    }
  }, [api, currentKeyNumericId, isMajorMode, currentKeyFirstNote, notes]);

  return (
    <div className="w-full px-12">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          watchDrag: false,
          duration: 60,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 flex pointer-events-none text-muted-foreground">
          {notes.map((note, index) => (
            <CarouselItem key={index} className="pl-2 flex-none w-[calc(100%/11)]">
              <div className="flex items-center justify-center py-4 border rounded-md shadow-sm bg-background font-bold text-sm text-foreground">
                {note}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
