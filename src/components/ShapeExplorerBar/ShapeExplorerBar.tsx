import { motion, AnimatePresence } from "framer-motion";
import ShapeExplorerSlider from "@/components/ShapeExplorer/ShapeExplorerSlider/ShapeExplorerSlider";
import { CleanButton } from "@/components/ShapeExplorerBar/CleanButton/CleanButton";
import { AddBrickButton } from "@/components/ShapeExplorerBar/AddBrickButton/AddBrickButton";
import * as S from "./parts";
import { useControlsStore } from "@/store";
import { usePersistentBoolean } from "@/hooks/usePersistentBoolean";
import { NoteMatrix } from "@/components/NoteMatrix/NoteMatrix";
import { animationDuration } from "@/constants";

const MotionSection = motion(S.Section);

export const ShapeExplorerBar = () => {
  const shapeId = useControlsStore((state) => state.shapeId);

  const isUnlocked = usePersistentBoolean(shapeId !== null);

  const durationSec = animationDuration / 1000;

  const animationConfig = {
    initial: {
      width: 0,
      height: 0,
      opacity: 0,
      margin: 0,
    },
    animate: {
      width: "auto",
      height: "auto",
      opacity: 1,
    },
    exit: {
      width: 0,
      height: 0,
      opacity: 0,
      margin: 0,
    },
    transition: {
      duration: durationSec,
      ease: "easeInOut",
    },
  } as const;

  return (
    <S.ShapeExplorerBar>
      <AnimatePresence>
        {isUnlocked && (
          <MotionSection key="note-matrix-section" {...animationConfig}>
            <NoteMatrix />
          </MotionSection>
        )}
      </AnimatePresence>

      <S.Section>
        <S.ShapeExplorerSection>
          <ShapeExplorerSlider />
          <CleanButton />
          <AddBrickButton />
        </S.ShapeExplorerSection>
      </S.Section>
    </S.ShapeExplorerBar>
  );
};
