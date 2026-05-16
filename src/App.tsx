import { AppWrapper, MainContent, Section } from "@/parts";
import { Toaster } from "@/components/ui/sonner";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import Footer from "./components/Footer/Footer";
import { Player } from "./components/Player/Player";
import Piano from "./components/Piano/Piano";
import { SoundEngine } from "./components/SoundEngine/SoundEngine";
import { PianoControls } from "./components/PianoControls/PianoControls";
import { ShapePlayer } from "./components/ShapePlayer/ShapePlayer";
import { KeyAndChordPicker } from "@/components/KeyAndChordPicker/KeyAndChordPicker";
import ShapePicker from "./components/ShapePicker/ShapePicker";
import GuitarFretboard from "./components/GuitarFretboard/GuitarFretboard";
import Test from "./components/ui/MultiRangeSlider/MultiRangeSliderTest copy";
import TestComponent from "./components/ui/MultiRangeSlider/TestComponent";
import { GlobalMultiRangeController } from "./components/ShapeMulitStepSliderExplorer/GlobalMultiRangeController";

export default function App() {
  return (
    <AppWrapper style={{ maxHeight: 700, minHeight: "unset" }}>
      <SoundEngine />
      <Toaster position="top-center" />
      {/* <DataDebug /> */}
      <Test />
      <TestComponent />
      {/* <MultiStepSliderTest /> */}
      <FullscreenButton />
      <KeyAndChordPicker />
      <ShapePicker />
      <MainContent>
        <Section>
          <PianoControls />
        </Section>
        <Section>
          <Piano />
        </Section>
        <GlobalMultiRangeController />
        <Section>
          <GuitarFretboard />
        </Section>

        <Section>
          <ShapePlayer />
        </Section>

        <Player>
          <Player.Controls />
        </Player>

        <Section>
          <Footer />
        </Section>
      </MainContent>
    </AppWrapper>
  );
}
