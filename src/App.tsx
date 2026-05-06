import { motion, AnimatePresence } from "framer-motion";
import Fretboard from "@/components/Fretboard/Fretboard";
import { AppWrapper, MainContent, Section } from "@/parts";
import { useControlsStore, useMusicStore, usePlayerStore } from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import ShapeControls from "./components/UpperBar/UpperBar";
import Sign from "./components/Sign/Sign";
import { Player } from "./components/Player/Player";
import Piano from "./components/Piano/Piano";
import { ShapeExplorerBar } from "./components/ShapeExplorerBar/ShapeExplorerBar";
import { SoundEngine } from "./components/SoundEngine/SoundEngine";
import { usePersistentBoolean } from "@/hooks/usePersistentBoolean";
import { animationDuration } from "./constants";
import { SynthControls } from "./components/SoundEngine/SynthControls/SynthControls";

const MotionSection = motion(Section);

export default function App() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);
  const shapeId = useControlsStore((state) => state.shapeId);
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);

  const isExplorerUnlocked = usePersistentBoolean(
    shapeId !== null || activeLockedNotes.length > 0,
  );
  const isPlayerUnlocked = usePersistentBoolean(bricks.length > 0);

  const durationSec = animationDuration / 1000;

  const standardAnimation = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: durationSec, ease: "easeInOut" },
  } as const;

  const shouldShowPiano = !isPlayerUnlocked || !isPlaying;

  return (
    <AppWrapper>
      <SoundEngine />
      <SynthControls />
      <Toaster position="top-center" />
      <FullscreenButton />

      <MainContent>
        <Section>
          <ShapeControls />
        </Section>

        <Section>
          <Fretboard />
        </Section>

        <AnimatePresence>
          {!isPlaying && isExplorerUnlocked && (
            <MotionSection key="explorer-bar" {...standardAnimation}>
              <ShapeExplorerBar />
            </MotionSection>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isPlayerUnlocked && (
            <MotionSection key="player-bar" {...standardAnimation}>
              <Player>
                <Player.Bricks />
                <Player.Controls />
              </Player>
            </MotionSection>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {shouldShowPiano && (
            <MotionSection key="piano-bar" {...standardAnimation}>
              <Piano />
            </MotionSection>
          )}
        </AnimatePresence>

        <Section>
          <Sign />
        </Section>
      </MainContent>
    </AppWrapper>
  );
}
