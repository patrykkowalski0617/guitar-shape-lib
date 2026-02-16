import { useControlsStore } from "@/store/useControlsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { musicMode, type MusicModeId } from "@/data";
import TutorialPopover from "../../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../../TutorialPopover/tutorial.config";
import { ControlLabel, ControlWrapper } from "@/parts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ModeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);

  const currentMode: MusicModeId = isMajorMode ? "major" : "minor";
  const options = Object.entries(musicMode) as [MusicModeId, typeof musicMode.major][];
  return (
    <ControlWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.MODE_TOGGLE} />
      <ControlLabel>Mode</ControlLabel>

      <div className="hidden sm:block">
        <ToggleGroup
          type="single"
          value={currentMode}
          onValueChange={() => {
            setIsMajorMode(!isMajorMode);
          }}
        >
          {options.map(([id, data]) => (
            <ToggleGroupItem key={id} value={id}>
              {data.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="sm:hidden">
        <Select
          value={currentMode}
          onValueChange={() => {
            setIsMajorMode(!isMajorMode);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(([id, data]) => (
              <SelectItem key={id} value={id}>
                {data.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </ControlWrapper>
  );
}
