import { useEffect, useRef } from "react";
import { Dices } from "lucide-react";
import {
  useRandomizeKey,
  useRandomizeShape,
  useRandomizeShapeVariant,
} from "./hooks";
import { useAddBrick } from "../AddBrickButton/hooks/useAddBrick";
import { useMusicStore, usePlayerStore } from "@/store";
import { Button } from "@/components/ui/button";
import { playerIconSize } from "@/components/Player/constants";

export function RandomizeButton() {
  const { setRandomKey } = useRandomizeKey();
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
    const randomKey = setRandomKey();

    const { shapeId, shapeSemitoneOffsetFromC } = setRandomShape();

    const isShapeDataValid =
      shapeId !== null && shapeSemitoneOffsetFromC !== null;

    if (isShapeDataValid) {
      isRandomizeActionActive.current = true;
      setRandomShapeVariant(randomKey, shapeSemitoneOffsetFromC, shapeId);
    }
  };

  return (
    <Button variant={"playerOutline"} onClick={handleRandomize}>
      <Dices size={playerIconSize} />
    </Button>
  );
}
