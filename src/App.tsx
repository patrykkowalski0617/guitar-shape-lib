import { motion, AnimatePresence } from "framer-motion";
import Fretboard from "@/components/Fretboard/Fretboard";
import { AppWrapper, MainContent, Section } from "@/parts";
import { usePlayerStore } from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import UpperControlsBar from "./components/UpperControlsBar/UpperControlsBar";
import Footer from "./components/Footer/Footer";
import { Player } from "./components/Player/Player";
import Piano from "./components/Piano/Piano";
import { SoundEngine } from "./components/SoundEngine/SoundEngine";
import { usePersistentBoolean } from "@/hooks/usePersistentBoolean";
import { animationDuration } from "./constants";
import { MiddleControlsBar } from "./components/MiddleControlsBar/MiddleControlsBar";
import { MultiStepSliderTest } from "./components/ui/MultiStepSlider/MultiStepSliderTest";
import { PianoControls } from "./components/PianoControls/PianoControls";
import { ShapePlayer } from "./components/ShapePlayer/ShapePlayer";
import { KeyAndChordPicker } from "@/components/KeyAndChordPicker/KeyAndChordPicker";
import { DataDebug } from "./DataDebug/DataDebug";
import ShapePicker from "./components/ShapePicker/ShapePicker";
import GuitarFretboard from "./components/GuitarFretboard/GuitarFretboard";

const MotionSection = motion(Section);

export default function App() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);

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
    <AppWrapper style={{ maxHeight: 700, minHeight: "unset" }}>
      <SoundEngine />
      <Toaster position="top-center" />
      <DataDebug />
      <FullscreenButton />
      <KeyAndChordPicker />
      <ShapePicker />
      <MainContent>
        <Section>
          <PianoControls />
        </Section>
        {/* <AnimatePresence>
          {shouldShowPiano && (
            <MotionSection key="piano-bar" {...standardAnimation}>
        <Piano />
        </MotionSection>
          )}
        </AnimatePresence> */}
        {/* <Section>
          <Piano />
        </Section> */}
        <Section>
          <GuitarFretboard />
        </Section>

        {/* <Section>
          <Fretboard />
          <UpperControlsBar />
          <MiddleControlsBar />
        </Section> */}

        <Section>
          <ShapePlayer />
        </Section>

        {/* <MultiStepSliderTest /> */}

        {/*
        <AnimatePresence>
          {isPlayerUnlocked && (
            <MotionSection key="player-bar" {...standardAnimation}>
              <Player>
                <Player.Bricks />
                <Player.Controls />
              </Player>
            </MotionSection>
          )}
        </AnimatePresence> */}
        <Section>
          <Footer />
        </Section>
      </MainContent>
    </AppWrapper>
  );
}
