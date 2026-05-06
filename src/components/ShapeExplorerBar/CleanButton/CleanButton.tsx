import { motion, AnimatePresence } from "framer-motion";
import { useControlsStore, useMusicStore } from "@/store";
import { BrushCleaning } from "lucide-react";
import * as P from "./parts";
import { usePersistentBoolean } from "@/hooks/usePersistentBoolean";
import { animationDuration } from "@/constants";

const MotionWrapper = motion(P.Wrapper);

export const CleanButton = () => {
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const setShapeVariantLocationData = useMusicStore(
    (state) => state.setShapeVariantLocationData,
  );
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);
  const resetActiveLockedNotes = useMusicStore(
    (state) => state.resetActiveLockedNotes,
  );
  const shapeId = useControlsStore((state) => state.shapeId);
  const setShape = useControlsStore((state) => state.setShape);

  const setBaseChordId = useControlsStore((state) => state.setBaseChordId);
  const setToggleBaseChordId = useControlsStore(
    (state) => state.setToggleBaseChordId,
  );

  const isDisabled = !(
    activeLockedNotes.length ||
    shapeVariantLocationData ||
    shapeId
  );

  const isUnlocked = usePersistentBoolean(!isDisabled);
  const durationSec = animationDuration / 1000;

  const handleClick = () => {
    setShapeVariantLocationData(null);
    resetActiveLockedNotes();
    setShape(null, null);
    setBaseChordId(null);
    setToggleBaseChordId(null);
  };

  return (
    <AnimatePresence>
      {isUnlocked && (
        <MotionWrapper
          key="clean-button-explorer"
          onClick={handleClick}
          $isDisabled={isDisabled}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: durationSec, ease: "easeInOut" }}
        >
          <BrushCleaning size={20} />
        </MotionWrapper>
      )}
    </AnimatePresence>
  );
};
