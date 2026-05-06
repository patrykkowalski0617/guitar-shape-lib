import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useControlsStore } from "@/store";
import { useAddBrick } from "./hooks/useAddBrick";
import * as S from "./parts";
import { usePersistentBoolean } from "@/hooks/usePersistentBoolean";
import { animationDuration } from "@/constants";

const MotionWrapper = motion(S.Wrapper);

export const AddBrickButton = () => {
  const shapeId = useControlsStore((state) => state.shapeId);
  const { addBrick } = useAddBrick();

  const isDisabled = !shapeId;
  const isUnlocked = usePersistentBoolean(!isDisabled);

  const durationSec = animationDuration / 1000;

  return (
    <AnimatePresence>
      {isUnlocked && (
        <MotionWrapper
          key="add-brick-button"
          onClick={addBrick}
          $isDisabled={isDisabled}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 40, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: durationSec, ease: "easeInOut" }}
        >
          <Plus size={22} />
        </MotionWrapper>
      )}
    </AnimatePresence>
  );
};
