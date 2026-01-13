import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/utils";
import { GroupWrapper, Label } from "../InputGroup/InputGroup";

export default function KeySelect() {
  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const setCurrentKey = useMusicStore((state) => state.setCurrentKey);

  const options = Object.entries(UNIFIED_MUSIC_KEYS).map(([id, data]) => ({
    id: id as MusicKeyId,
    majorName: data.majorName,
    relativeMinorName: data.relativeMinorName,
  }));

  return (
    <GroupWrapper>
      <Label>Root Key</Label>
      <Select value={currentKeyId} onValueChange={(v) => setCurrentKey(v as MusicKeyId)}>
        <SelectTrigger className="bg-muted/30 border-muted-foreground/20 focus:ring-0 focus:ring-offset-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.id} value={opt.id}>
              <span className={isMajorMode ? "opacity-100" : "opacity-50"}>{opt.majorName}</span>
              <span className="mx-1 opacity-50">/</span>
              <span className={!isMajorMode ? "opacity-100" : "opacity-50"}>
                {opt.relativeMinorName}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </GroupWrapper>
  );
}
