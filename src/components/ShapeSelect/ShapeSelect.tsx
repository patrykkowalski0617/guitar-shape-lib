import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useControlsStore } from "@/store/useControlsStore";
import { GroupWrapper, Label } from "../InputGroup/InputGroup";
import { useSettingsStore } from "@/store/useSettingsStore";
import { roles } from "@/utils";
import shapes from "@/utils/shapes";

export default function ShapeSelect() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const currentKeyId = useControlsStore((state) => state.currentKeyId);
  const currentRoleId = useControlsStore((state) => state.currentRoleId);
  const areDescriptiveLabels = useSettingsStore((state) => state.areDescriptiveLabels);

  if (currentRoleId) {
    console
      .log
      // roles[currentRoleId].shapes.map((el) => {
      //   return { shape: shapes[el.chordShapeId], el: el };
      // })
      ();
  }
  const options = ["option1"];

  return (
    <GroupWrapper>
      <Label>{areDescriptiveLabels ? "Set of notes" : "Shapes"}</Label>
      <Select value={currentKeyId} onValueChange={(v) => {}}>
        <SelectTrigger
          style={{ height: "40px" }}
          className="bg-muted/30 border-muted-foreground/20 focus:ring-0 focus:ring-offset-0 font-semibold"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              <span className={isMajorMode ? "opacity-100" : "opacity-50"}>{opt}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </GroupWrapper>
  );
}
