import { motion, AnimatePresence } from "framer-motion";
import { usePersistentBoolean } from "@/hooks/usePersistentBoolean";
import { useShapeExplorerLogic } from "../hooks/useShapeExplorerLogic";
import * as S from "./parts";
import { StepSlider } from "./StepSlider";
import { animationDuration } from "@/constants";

const MotionWrapper = motion(S.ShapeExplorerWrapper);

export default function ShapeExplorerSlider() {
  const {
    options,
    sliderValue,
    userListIndexes,
    isDisabled,
    handleValueChange,
    handleMouseDown,
    handleMouseUp,
  } = useShapeExplorerLogic();

  const isUnlocked = usePersistentBoolean(!isDisabled);

  const durationSec = animationDuration / 1000;

  return (
    <AnimatePresence>
      {isUnlocked && (
        <MotionWrapper
          key="shape-explorer-slider"
          $isDisabled={isDisabled}
          initial={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
          animate={{
            width: 500,
            opacity: 1,
            paddingLeft: 7,
            paddingRight: 7,
          }}
          exit={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
          transition={{
            duration: durationSec,
            ease: "easeInOut",
            opacity: {
              delay: isUnlocked ? 0 : durationSec,
              duration: durationSec,
            },
          }}
        >
          <StepSlider
            value={sliderValue}
            options={options}
            step={1}
            userListIndexes={userListIndexes}
            onValueChange={handleValueChange}
            disabled={isDisabled}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
          />
        </MotionWrapper>
      )}
    </AnimatePresence>
  );
}
