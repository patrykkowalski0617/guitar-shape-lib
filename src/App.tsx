import { AppWrapper, MainContent, Section } from "@/parts";
import { Toaster } from "@/components/ui/sonner";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import Footer from "./components/Footer/Footer";
import { SoundEngine } from "./components/SoundEngine/SoundEngine";
import { ShapePlayer } from "./components/ShapePlayer/ShapePlayer";
import { KeyAndChordPicker } from "@/components/KeyAndChordPicker/KeyAndChordPicker";
import ShapePicker from "./components/ShapePicker/ShapePicker";
import GuitarFretboard from "./components/GuitarFretboard/GuitarFretboard";
import { ShapePlayerHeader } from "@/components/ShapePlayer/ShapePlayerHeader/ShapePlayerHeader";
import { PianoControllers } from "@/components/PianoControllers/PianoControllers";
import { testingShapes } from "./DevTools/testingShapes";
// import { DataKeyStoreDebugComponent } from "./DevTools/DataKeyStoreDebugComponent/DataKeyStoreDebugComponent";

export default function App() {
  testingShapes();

  return (
    <AppWrapper style={{ height: 700, minHeight: "unset" }}>
      <SoundEngine />
      {/* <DataKeyStoreDebugComponent /> */}
      <Section>
        <PianoControllers />
      </Section>

      <Toaster position="top-center" />
      <FullscreenButton />
      <KeyAndChordPicker />
      <ShapePicker />
      <MainContent>
        <Section>
          <ShapePlayerHeader />
        </Section>
        <Section>
          <GuitarFretboard />
        </Section>

        <Section>
          <ShapePlayer />
        </Section>

        <Section>
          <Footer />
        </Section>
      </MainContent>
    </AppWrapper>
  );
}
