import { useMusicStore, useControlsStore } from "@/store";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/data";
import { SelectPrevNext } from "../../ui/select-prev-next";
import { ControlLabel } from "@/parts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ControlWrapper } from "../parts";

export function KeySelect() {
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setCurrentKey = useControlsStore((state) => state.setCurrentKey);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const keyOptions = Object.entries(UNIFIED_MUSIC_KEYS).map(([id, data]) => ({
    value: id,
    label: isMajorMode ? data.majorName : data.relativeMinorName,

    ...data,
  }));

  const handleValueChange = (value: string) => {
    setCurrentKey(value as MusicKeyId);
    setCurrentShapeVariantLocationData(null);
  };

  return (
    <ControlWrapper>
      <ControlLabel>Key/Root Note</ControlLabel>

      <div className="hidden sm:block md:min-w-[200px]">
        <SelectPrevNext value={currentKeyId} onValueChange={handleValueChange} options={keyOptions}>
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
        <Select value={currentKeyId} onValueChange={handleValueChange}>
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
