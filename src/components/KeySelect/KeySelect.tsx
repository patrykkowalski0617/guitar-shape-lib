import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useControlsStore } from "@/store/useControlsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/utils";
import { GroupWrapper, Label } from "../customUI/InputGroup/InputGroup";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transitionTime } from "@/utils/constants";

export default function KeySelect() {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setCurrentKey = useControlsStore((state) => state.setCurrentKey);
  const shiftKey = useControlsStore((state) => state.shiftKey);
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);

  const [isThrottled, setIsThrottled] = useState(false);
  const throttleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleShift = (direction: "next" | "prev") => {
    if (isThrottled) return;
    shiftKey(direction);
    setIsThrottled(true);
    if (throttleTimer.current) clearTimeout(throttleTimer.current);
    throttleTimer.current = setTimeout(() => {
      setIsThrottled(false);
    }, transitionTime);
  };

  const options = Object.entries(UNIFIED_MUSIC_KEYS).map(([id, data]) => ({
    id: id as MusicKeyId,
    majorName: data.majorName,
    relativeMinorName: data.relativeMinorName,
  }));

  // Zmniejszono wysokość (h-8) i szerokość (w-8) przycisków
  const buttonBaseClass =
    "h-8 w-8 p-0 border-muted-foreground/20 bg-muted/30 hover:bg-muted/50 text-foreground disabled:opacity-30";

  return (
    <GroupWrapper>
      <Label>
        {areDescriptiveLabels ? "Relative minor/Major Roots" : "Relative minor/Major Keys"}
      </Label>

      <div className="flex items-center overflow-hidden rounded-md border border-muted-foreground/20">
        <Button
          variant="ghost" // Zmieniono na ghost, bo ramkę trzyma teraz rodzic (style segmentowe)
          className={`${buttonBaseClass} rounded-none border-none border-r border-muted-foreground/20`}
          onClick={() => handleShift("prev")}
          disabled={isThrottled}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="bg-muted/30">
          <Select value={currentKeyId} onValueChange={(v) => setCurrentKey(v as MusicKeyId)}>
            <SelectTrigger
              style={{ height: "32px" }} // 32px to odpowiednik h-8
              className="!bg-transparent border-none focus:ring-0 focus:ring-offset-0 font-semibold text-[12px] w-28 rounded-none px-2"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-semibold">
              {options.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  <span className={isMajorMode ? "opacity-100" : "opacity-50"}>
                    {opt.majorName}
                  </span>
                  <span className="mx-1 opacity-50">/</span>
                  <span className={!isMajorMode ? "opacity-100" : "opacity-50"}>
                    {opt.relativeMinorName}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          className={`${buttonBaseClass} rounded-none border-none border-l border-muted-foreground/20`}
          onClick={() => handleShift("next")}
          disabled={isThrottled}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </GroupWrapper>
  );
}
