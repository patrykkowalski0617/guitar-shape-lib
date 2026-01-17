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
        onValueChange={(v) => {
          if (v) {
            setIsMajorMode(v === "major");
          } else {
            setIsMajorMode(v === "minor");
          }
        }}
        className="h-10 justify-start border rounded-xl p-1 bg-muted/50 border-muted-foreground/20 w-fit"
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
