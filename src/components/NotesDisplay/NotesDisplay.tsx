import { useState, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useMusicStore } from "@/store/useMusicStore";
import { getNotes } from "@/utils";
import { UNIFIED_MUSIC_KEYS } from "@/utils/musicKeys/musicKeys";
import { useCarouselNavigation } from "./hooks/useCarouselNavigation";

export default function NotesDisplay() {
  const [api, setApi] = useState<CarouselApi>();

  const { currentKeyId, isMajorMode } = useMusicStore();

  const keyData = UNIFIED_MUSIC_KEYS[currentKeyId];
  const currentKeyFirstNote = isMajorMode ? keyData.majorFirstNote : keyData.relativeMinorFirstNote;

  const notes = useMemo(() => getNotes({ firstNote: "A", length: 36 }), []);

  useCarouselNavigation({
    api,
    notes,
    currentKeyNumericId: keyData.id,
    currentKeyFirstNote,
  });

  return (
    <div className="w-full px-12">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", watchDrag: false, duration: 60 }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 flex pointer-events-none select-none">
          {notes.map((note, index) => (
            <NoteItem key={`${note}-${index}`} note={note} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function NoteItem({ note }: { note: string }) {
  return (
    <CarouselItem className="pl-2 flex-none w-[calc(100%/11)]">
      <div className="flex items-center justify-center py-4 border rounded-md shadow-sm bg-background font-bold text-sm text-foreground">
        {note}
      </div>
    </CarouselItem>
  );
}
