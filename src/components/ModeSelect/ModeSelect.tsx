import { useMusicStore } from "@/store/useMusicStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../InputGroup/InputGroup";
import { musicMode, type MusicModeId } from "@/utils";

export default function ModeSelect() {
  const isMajorMode = useMusicStore((state) => state.isMajorMode);
  const setIsMajorMode = useMusicStore((state) => state.setIsMajorMode);
  const areDescriptiveLabels = useMusicStore((state) => state.areDescriptiveLabels);

  const currentMode: MusicModeId = isMajorMode ? "major" : "minor";

  return (
    <GroupWrapper>
      <Label>Scale Mode</Label>
      <ToggleGroup
        type="single"
        value={currentMode}
        onValueChange={(v) => {
          if (v) setIsMajorMode(v === "major");
        }}
        className="h-10 justify-start border rounded-md p-1 bg-muted/50 border-muted-foreground/20 w-fit"
      >
        {(Object.entries(musicMode) as [MusicModeId, typeof musicMode.major][]).map(
          ([id, data]) => (
            <ToggleGroupItem
              key={id}
              value={id}
              title={data.descriptiveLabel}
              className="h-full px-4 text-xs uppercase font-semibold data-[state=on]:bg-background data-[state=on]:shadow-sm flex flex-col items-center justify-center"
            >
              <span>{areDescriptiveLabels ? data.descriptiveLabel : data.label}</span>
            </ToggleGroupItem>
          )
        )}
      </ToggleGroup>
    </GroupWrapper>
  );
}
