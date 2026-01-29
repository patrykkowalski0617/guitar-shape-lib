import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "../ControlsContainer/ControlsContainer";
import { musicMode, type MusicModeId } from "@/utils";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";

export default function ModeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);

  const currentMode: MusicModeId = isMajorMode ? "major" : "minor";

  return (
    <GroupWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.MODE_TOGGLE} />
      <Label>Mode</Label>
      <ToggleGroup
        type="single"
        value={currentMode}
        onValueChange={() => {
          setIsMajorMode(!isMajorMode);
        }}
      >
        {(Object.entries(musicMode) as [MusicModeId, typeof musicMode.major][]).map(
          ([id, data]) => (
            <ToggleGroupItem key={id} value={id}>
              {data.label}
            </ToggleGroupItem>
          ),
        )}
      </ToggleGroup>
    </GroupWrapper>
  );
}
