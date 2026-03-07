import { useEffect, useRef } from "react";
import { Dices } from "lucide-react";
import { useRandomizeMode } from "./hooks/useRandomizeMode";
import { useRandomizeKey } from "./hooks/useRandomizeKey";
import { useRandomizeRole } from "./hooks/useRandomizeRole";
import { useRandomizeShape } from "./hooks/useRandomizeShape";
import { useRandomizeShapeVariant } from "./hooks/useRandomizeShapeVariant";
import { OutlineButton } from "@/components/Player/ui/parts";
import { useAddBrick } from "../AddBrickButton/hooks/useAddBrick";
import { useMusicStore, usePlayerStore } from "@/store";
import { iconSize } from "@/components/Controls/parts";

export function RandomeButton() {
  const { setRandomMode } = useRandomizeMode();
  const { setRandomKey } = useRandomizeKey();
  const { setRandomRole } = useRandomizeRole();
  const { setRandomShape } = useRandomizeShape();
  const { setRandomShapeVariant } = useRandomizeShapeVariant();
  const { addBrick } = useAddBrick();
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const isRandomizeActionActive = useRef(false);

  useEffect(() => {
    const shouldExecuteAddBrick = isRandomizeActionActive.current;

    if (shouldExecuteAddBrick) {
      addBrick();
      isRandomizeActionActive.current = false;
    }
  }, [shapeVariantLocationData, addBrick]);

  if (isPlaying) {
    return null;
  }

  const handleRandomize = () => {
    const randomIsMajorMode = setRandomMode();
    const randomKey = setRandomKey();
    const randomRole = setRandomRole();

    const { shapeId, shapeSemitoneOffsetFromC } = setRandomShape(
      randomRole,
      randomIsMajorMode,
    );

    const isShapeDataValid =
      shapeId !== null && shapeSemitoneOffsetFromC !== null;

    if (isShapeDataValid) {
      isRandomizeActionActive.current = true;
      setRandomShapeVariant(randomKey, shapeSemitoneOffsetFromC, shapeId);
    }
  };

  return (
    <OutlineButton onClick={handleRandomize} className="border-primary/50">
      <Dices size={iconSize} />
    </OutlineButton>
  );
}
