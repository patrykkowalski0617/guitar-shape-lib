import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../customUI/InputGroup/InputGroup";
import { musicMode, type MusicModeId } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useTutorialHover } from "../TutorialBox/helpers/useTutorialHover";

export default function ModeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);

  const currentMode: MusicModeId = isMajorMode ? "major" : "minor";
  const tutorialHover_modeSelector = useTutorialHover("mode-toggle");

  return (
    <div {...tutorialHover_modeSelector}>
      <GroupWrapper>
        <Label>{areDescriptiveLabels ? "Mood" : "Mode"}</Label>
        <ToggleGroup
          type="single"
          value={currentMode}
          onValueChange={() => {
            setIsMajorMode(!isMajorMode);
          }}
        >
          {(Object.entries(musicMode) as [MusicModeId, typeof musicMode.major][]).map(
            ([id, data]) => (
              <ToggleGroupItem key={id} value={id} title={data.descriptiveLabel}>
                {areDescriptiveLabels ? data.descriptiveLabel : data.label}
              </ToggleGroupItem>
            )
          )}
        </ToggleGroup>
      </GroupWrapper>
    </div>
  );
}
