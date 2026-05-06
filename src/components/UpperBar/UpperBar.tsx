import { motion, AnimatePresence } from "framer-motion";
import * as S from "./parts";
import BaseChordToggle from "./BaseChordToggle/BaseChordToggle";
import ShapeSelect from "./ShapeSelect/ShapeSelect";
import ShapeCarousel from "./ShapeCarousel/ShapeCarousel";
import { Player } from "../Player/Player";
import { usePlayerStore } from "@/store";
import { animationDuration } from "@/constants";
import { usePersistentBoolean } from "@/hooks/usePersistentBoolean";

const MotionSection = motion(S.Section);

export default function UpperBar() {
  const bricks = usePlayerStore((state) => state.bricks);
  const isPermanentlyLocked = usePersistentBoolean(bricks.length > 0);
  const isVisible = !isPermanentlyLocked;

  const durationSec = animationDuration / 1000;

  const animationConfig = {
    animate: { width: "auto", opacity: 1, height: "auto" },
    exit: {
      width: 0,
      opacity: 0,
      height: 0,
      transition: {
        width: { duration: durationSec, delay: durationSec },
        height: { duration: durationSec, delay: durationSec },
        opacity: { duration: durationSec },
      },
    },
    transition: { duration: durationSec, ease: "easeInOut" },
  } as const;

  return (
    <S.Wrapper>
      <S.Section>
        <ShapeCarousel />
      </S.Section>

      <S.Section>
        <S.BaseChordToggleWrapper>
          <BaseChordToggle />
          <ShapeSelect />
        </S.BaseChordToggleWrapper>
      </S.Section>

      <AnimatePresence>
        {isVisible && (
          <MotionSection
            key="upper-bar-player"
            initial={false}
            animate={animationConfig.animate}
            exit={animationConfig.exit}
            transition={animationConfig.transition}
            style={{ whiteSpace: "nowrap" }}
          >
            <Player>
              <Player.BasicControls />
            </Player>
          </MotionSection>
        )}
      </AnimatePresence>
    </S.Wrapper>
  );
}
