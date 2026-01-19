import { useSettingsStore } from "@/store/useSettingsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GroupWrapper, Label } from "@/components/customUI/InputGroup/InputGroup";

const LABEL_OPTIONS = [
  {
    id: "standard",
    label: "Fancy XD",
    descriptiveLabel: "Standard music names",
    value: false,
  },
  {
    id: "descriptive",
    label: "Descriptive",
    descriptiveLabel: "Descriptive and emotional names",
    value: true,
  },
];

export default function DescriptiveLabelsSelect() {
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);
  const setAreDescriptiveLabels = useSettingsStore((state) => state.setAreDescriptiveLabels);
  const currentValue = areDescriptiveLabels ? "descriptive" : "standard";

  return (
    <GroupWrapper>
      <Label>{areDescriptiveLabels ? "Only right option is 'Descriptive'" : "Labels Type"}</Label>
      <ToggleGroup
        type="single"
        value={currentValue}
        className="w-full md:w-full"
        onValueChange={(v) => {
          if (v) setAreDescriptiveLabels(v === "descriptive");
        }}
      >
        {LABEL_OPTIONS.map((option) => (
          <ToggleGroupItem key={option.id} value={option.id} className="flex-1 md:flex-1">
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </GroupWrapper>
  );
}
