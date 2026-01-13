import { useMusicStore } from "@/store/useMusicStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../InputGroup/InputGroup";
import { musicFunctions, type MusicFunctionData, type MusicFunctionId } from "@/utils";

export default function MusicFunctionSelect() {
  const currentMusicFunctionId = useMusicStore((state) => state.currentMusicFunctionId);
  const setCurrentMusicFunctionId = useMusicStore((state) => state.setCurrentMusicFunctionId);
  const areDescriptiveLabels = useMusicStore((state) => state.areDescriptiveLabels);

  return (
    <GroupWrapper>
      <Label>{areDescriptiveLabels ? "Energy" : "Function"} </Label>
      <ToggleGroup
        type="single"
        value={currentMusicFunctionId}
        onValueChange={(v) => {
          if (v) setCurrentMusicFunctionId(v as MusicFunctionId);
        }}
        className="h-10 justify-start border rounded-md p-1 bg-muted/50 border-muted-foreground/20 w-fit"
      >
        {(Object.entries(musicFunctions) as [MusicFunctionId, MusicFunctionData][]).map(
          ([id, data]) => (
            <ToggleGroupItem
              title={data.descriptiveLabel}
              key={id}
              value={id}
              className="h-full px-4 text-xs uppercase font-semibold data-[state=on]:bg-background data-[state=on]:shadow-sm"
            >
              {areDescriptiveLabels ? data.descriptiveLabel : data.label}
            </ToggleGroupItem>
          )
        )}
      </ToggleGroup>
    </GroupWrapper>
  );
}
