import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMusicStore } from "@/store/useMusicStore";
import { UNIFIED_MUSIC_KEYS, type MusicKeyId } from "@/utils/musicKeys/musicKeys";

export default function KeySelect() {
  const currentKeyId = useMusicStore((state) => state.currentKeyId);
  const setCurrentKey = useMusicStore((state) => state.setCurrentKey);

  const options = Object.entries(UNIFIED_MUSIC_KEYS).map(([id, data]) => ({
    id: id as MusicKeyId,
    name: data.unifiedName,
  }));

  return (
    <Select value={currentKeyId} onValueChange={(value) => setCurrentKey(value as MusicKeyId)}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select Unified Key" />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
