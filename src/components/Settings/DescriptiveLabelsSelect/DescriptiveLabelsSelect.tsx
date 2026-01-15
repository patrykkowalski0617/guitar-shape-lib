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
        {areDescriptiveLabels ? "Only right option" : "Labels Type"}
      </span>

      <ToggleGroup
        type="single"
        value={currentValue}
        onValueChange={(v) => {
          if (v) setAreDescriptiveLabels(v === "descriptive");
        }}
        className="grid grid-cols-2 min-h-[40px] h-11 w-full border rounded-md p-1 bg-muted/50 border-muted-foreground/20"
      >
        {LABEL_OPTIONS.map((option) => (
          <ToggleGroupItem
            key={option.id}
            value={option.id}
            title={option.descriptiveLabel}
            className="h-full w-full px-4 text-xs font-semibold uppercase data-[state=on]:bg-background data-[state=on]:shadow-sm transition-all"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
