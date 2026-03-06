import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useControlsStore, useMusicStore } from "@/store";
import { roles, type RoleId, isGlobalRole, shapes, type Shapes, UNIFIED_MUSIC_KEYS, type Note } from "@/data";
import { ControlLabel } from "@/parts";
import { ControlWrapper } from "../parts";
import { getNotes } from "@/utils";
import { getFilteredShapeOptions, type ShapeOption } from "../ShapeSelect/helpers";

export function CombinedShapeSelect() {
  const tuneKeyId = useControlsStore((state) => state.tuneKeyId);
  const setShape = useControlsStore((state) => state.setShape);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const setRoleId = useControlsStore((state) => state.setRoleId);
  const setShapeVariantLocationData = useMusicStore((state) => state.setShapeVariantLocationData);

  const musicKey = UNIFIED_MUSIC_KEYS[tuneKeyId];
  const relativeScale = getNotes({ firstNote: tuneKeyId as Note, length: 12 });

  const getOptionLabel = (option: ShapeOption) => {
    const shape = shapes[option.shapeId as keyof Shapes];
    const noteIndex = ((option.shapeSemitoneOffsetFromC % 12) + 12) % 12;
    const noteObj = relativeScale[noteIndex];
    const rootNote = musicKey.isFlatTune ? noteObj.flatNoteName : noteObj.sharpNoteName;

    return {
      root: rootNote,
      name: `${shape.label} ${shape.type}`,
    };
  };

  const handleValueChange = (combinedValue: string) => {
    const [id, offset, mode, rId] = combinedValue.split("|");

    setShapeVariantLocationData(null);
    setIsMajorMode(mode === "major");
    setRoleId(rId as RoleId);
    setShape(id, parseInt(offset, 10));
  };

  const functionalRoles = (Object.entries(roles) as [RoleId, { label: string }][]).filter(([id]) => !isGlobalRole(id));

  const createSection = (title: string, isMajor: boolean, rId: RoleId) => {
    const options = getFilteredShapeOptions(rId, isMajor, tuneKeyId);

    if (options.length === 0) return null;

    return (
      <SelectGroup key={`${rId}-${isMajor ? "major" : "minor"}`}>
        <SelectLabel className="px-2 py-1.5 text-xs font-bold uppercase text-muted-foreground border-t mt-2 first:border-none first:mt-0">
          {title}
        </SelectLabel>
        {options.map((option) => {
          const labels = getOptionLabel(option);
          const uniqueValue = `${option.shapeId}|${option.shapeSemitoneOffsetFromC}|${isMajor ? "major" : "minor"}|${rId}`;

          return (
            <SelectItem key={uniqueValue} value={uniqueValue}>
              <span className="opacity-50 mr-2">{labels.root}</span>
              <span>{labels.name}</span>
            </SelectItem>
          );
        })}
      </SelectGroup>
    );
  };

  return (
    <ControlWrapper>
      <ControlLabel>Shapes Explorer</ControlLabel>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="md:min-w-[280px]">
          <SelectValue placeholder="Select shape..." />
        </SelectTrigger>
        <SelectContent className="max-h-[500px]">
          {functionalRoles.map(([id, data]) => createSection(`Major ${data.label}`, true, id))}

          {functionalRoles.map(([id, data]) => createSection(`Minor ${data.label}`, false, id))}

          {createSection(roles["all-one-instance"].label, true, "all-one-instance")}
        </SelectContent>
      </Select>
    </ControlWrapper>
  );
}
