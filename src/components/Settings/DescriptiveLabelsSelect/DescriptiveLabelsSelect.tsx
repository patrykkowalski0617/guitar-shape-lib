import { useSettingsStore } from "@/store/useSettingsStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
    <div className="flex flex-col gap-3 w-full items-stretch">
      <span className="text-xs font-semibold text-foreground ml-1">
        {areDescriptiveLabels ? "Only right option is 'Descriptive'" : "Labels Type"}
      </span>

      <ToggleGroup
        type="single"
        value={currentValue}
        onValueChange={(v) => {
          if (v) setAreDescriptiveLabels(v === "descriptive");
        }}
      >
        {LABEL_OPTIONS.map((option) => (
          <ToggleGroupItem key={option.id} value={option.id} title={option.descriptiveLabel}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
