import { useSettingsStore } from "@/store/useSettingsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ControlLabel, ControlWrapper } from "@/parts";

const LABEL_OPTIONS = [
  {
    id: "tutorial-on",
    label: "On",
  },
  {
    id: "tutorial-off",
    label: "Off",
  },
];

export default function Tutorial() {
  const isTutorialOn = useSettingsStore((state) => state.isTutorialOn);
  const setIsTutorialOn = useSettingsStore((state) => state.setIsTutorialOn);
  const currentValue = isTutorialOn ? "tutorial-on" : "tutorial-off";

  return (
    <ControlWrapper $isFullWidth>
      <ControlLabel>Tutorial</ControlLabel>
      <ToggleGroup
        type="single"
        value={currentValue}
        className="w-full md:w-full"
        onValueChange={() => {
          setIsTutorialOn(!isTutorialOn);
        }}
      >
        {LABEL_OPTIONS.map((option) => (
          <ToggleGroupItem key={option.id} value={option.id} className="flex-1 md:flex-1">
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </ControlWrapper>
  );
}
