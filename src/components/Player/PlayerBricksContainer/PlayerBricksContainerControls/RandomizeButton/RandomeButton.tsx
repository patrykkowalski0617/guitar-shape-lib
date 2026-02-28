import { Dices } from "lucide-react";
import { useRandomizeMode } from "./hooks/useRandomizeMode";
import { useRandomizeKey } from "./hooks/useRandomizeKey";
import { useRandomizeRole } from "./hooks/useRandomizeRole";
import { useRandomizeShape } from "./hooks/useRandomizeShape";
import { useRandomizeShapeVariant } from "./hooks/useRandomizeShapeVariant";
import { iconSize } from "@/components/Fretboard/FretboardControls/parts";
import { OutlineButton } from "@/components/Player/ui/parts";

export function RandomeButton() {
  const setRandomMode = useRandomizeMode();
  const setRandomKey = useRandomizeKey();
  const setRandomRole = useRandomizeRole();
  const setRandomShape = useRandomizeShape();
  const setRandomShapeVariant = useRandomizeShapeVariant();

  const handleRandomize = () => {
    const randomIsMajorMode = setRandomMode();
    const randomKey = setRandomKey();
    const randomRole = setRandomRole();

    const { shapeId, shapeSemitoneOffsetFromC } = setRandomShape(randomRole, randomIsMajorMode);

    if (shapeId === null || shapeSemitoneOffsetFromC === null) {
      return;
    }

    setRandomShapeVariant(randomKey, shapeSemitoneOffsetFromC, shapeId);
  };

  return (
    <OutlineButton onClick={handleRandomize} className="border-primary/50">
      <Dices size={iconSize} />
    </OutlineButton>
  );
}
