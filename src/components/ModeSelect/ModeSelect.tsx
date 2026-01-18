import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../customUI/InputGroup/InputGroup";
import { musicMode, type MusicModeId } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function ModeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);

  const currentMode: MusicModeId = isMajorMode ? "major" : "minor";

  return (
    <GroupWrapper>
      <Label>{areDescriptiveLabels ? "Mood" : "Mode"}</Label>
      <ToggleGroup
        type="single"
        value={currentMode}
        onValueChange={() => {
          setIsMajorMode(!isMajorMode);
        }}
        className="h-8 justify-start border rounded-md p-0 bg-muted/30 border-muted-foreground/20 w-fit gap-0 overflow-hidden"
      >
        {(Object.entries(musicMode) as [MusicModeId, typeof musicMode.major][]).map(
          ([id, data]) => (
            <ToggleGroupItem
              key={id}
              value={id}
              title={data.descriptiveLabel}
              className="h-full px-3 text-[12px] uppercase font-semibold tracking-tight data-[state=on]:bg-background data-[state=on]:text-foreground rounded-none border-r last:border-r-0 border-muted-foreground/10 transition-none"
            >
              {areDescriptiveLabels ? data.descriptiveLabel : data.label}
            </ToggleGroupItem>
          )
        )}
      </ToggleGroup>
    </GroupWrapper>
  );
}
