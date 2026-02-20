import { useControlsStore } from "@/store/useControlsStore";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/data";
import { SelectPrevNext } from "../../ui/select-prev-next";
import { ControlLabel, ControlWrapper } from "@/parts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function KeySelect() {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setCurrentKey = useControlsStore((state) => state.setCurrentKey);

  const keyOptions = Object.entries(UNIFIED_MUSIC_KEYS).map(([id, data]) => ({
    value: id,
    label: isMajorMode ? data.majorName : data.relativeMinorName,

    ...data,
  }));

  return (
    <ControlWrapper>
      <ControlLabel>Key</ControlLabel>

      <div className="hidden sm:block">
        <SelectPrevNext
          value={currentKeyId}
          onValueChange={(v) => setCurrentKey(v as MusicKeyId)}
          options={keyOptions}
          className="md:min-w-[200px]"
        >
          {keyOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              <span className={isMajorMode ? "opacity-100" : "opacity-50"}>{opt.majorName}</span>
              <span className="mx-1 opacity-50">/</span>
              <span className={!isMajorMode ? "opacity-100" : "opacity-50"}>{opt.relativeMinorName}</span>
            </SelectItem>
          ))}
        </SelectPrevNext>
      </div>

      <div className="sm:hidden">
        <Select value={currentKeyId} onValueChange={(v) => setCurrentKey(v as MusicKeyId)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {keyOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <span className={isMajorMode ? "opacity-100" : "opacity-50"}>{opt.majorName}</span>
                <span className="mx-1 opacity-50">/</span>
                <span className={!isMajorMode ? "opacity-100" : "opacity-50"}>{opt.relativeMinorName}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </ControlWrapper>
  );
}
