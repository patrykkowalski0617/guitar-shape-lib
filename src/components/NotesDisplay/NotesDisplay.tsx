import React, { useEffect, useState } from "react";
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
  const currentKeyFirstNote = isMajorMode
    ? UNIFIED_MUSIC_KEYS[currentKeyId].majorFirstNote
    : UNIFIED_MUSIC_KEYS[currentKeyId].relativeMinorFirstNote;
  const notes = getNotes({ firstNote: "A", length: 36 });
  console.log(currentKeyFirstNote);

  // 1. Reagujemy na zmianę tonacji i przewijamy karuzelę
  useEffect(() => {
    if (!api) return;

    // Znajdujemy indeks pierwszej nuty pasującej do tonacji
    const targetIndex = notes.findIndex((note) => note === currentKeyFirstNote);

    if (targetIndex !== -1) {
      api.scrollTo(targetIndex);
    }
  }, [api, currentKeyId, currentKeyFirstNote, notes]);

  return (
    <div className="w-full px-12">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          watchDrag: false, // 2. Blokujemy możliwość przeciągania myszką/palcem
        }}
        className="w-full"
      >
        {/* pointer-events-none to dodatkowa blokada jakichkolwiek kliknięć */}
        <CarouselContent className="-ml-2 flex pointer-events-none">
          {notes.map((note, index) => (
            <CarouselItem key={index} className="pl-2 flex-none w-[calc(100%/11)]">
              <div
                className={`flex items-center justify-center py-4 border rounded-md shadow-sm transition-colors
                ${
                  note === currentKeyFirstNote
                    ? "bg-primary text-primary-foreground"
                    : "bg-background"
                }
              `}
              >
                <span className="font-bold text-sm">{note}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
