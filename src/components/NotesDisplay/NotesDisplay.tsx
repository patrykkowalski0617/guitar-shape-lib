import { useState, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS } from "@/utils/musicKeys/musicKeys";
import { useCarouselNavigation } from "./hooks/useCarouselNavigation";
import { getUnifiedNotes } from "./utils/notes-helper";

export default function NotesDisplay() {
  const [api, setApi] = useState<CarouselApi>();
  const { currentKeyId, isMajorMode } = useMusicStore();

  const keyData = UNIFIED_MUSIC_KEYS[currentKeyId];
  const currentKeyFirstNote = isMajorMode ? keyData.majorFirstNote : keyData.relativeMinorFirstNote;

  // Korzystamy z nowej funkcji pomocniczej
  const notes = useMemo(() => getUnifiedNotes(36), []);

  useCarouselNavigation({
    api,
    notes,
    currentKeyNumericId: keyData.orderNumber,
    currentKeyFirstNote,
  });

  return (
    <div className="w-full px-12">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          watchDrag: false,
          duration: 30,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 flex pointer-events-none select-none">
          {notes.map((noteObj, index) => (
            <NoteItem key={`${noteObj.display}-${index}`} note={noteObj.display} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function NoteItem({ note }: { note: string }) {
  return (
    <CarouselItem className="pl-2 flex-none w-[calc(100%/24)]">
      <div
        className={`
        flex items-center justify-center py-4 border rounded-md shadow-sm font-bold text-sm transition-colors duration-300`}
      >
        {note}
      </div>
    </CarouselItem>
  );
}
