import { AppWrapper, MainContent, Section } from "@/parts";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import Footer from "./components/Footer/Footer";
import { SoundEngine } from "./components/SoundEngine/SoundEngine";
import { ShapePlayer } from "./components/ShapePlayer/ShapePlayer";
import { KeyAndChordPicker } from "@/components/KeyAndChordPicker/KeyAndChordPicker";
import ShapePicker from "./components/ShapePicker/ShapePicker";
import GuitarFretboard from "./components/GuitarFretboard/GuitarFretboard";
import { PianoControllers } from "@/components/PianoControllers/PianoControllers";
import { HeaderControllers } from "./components/HeaderControllers/HeaderControllers";
import { MasterShapeExplorer } from "./components/ShapeExplorer/MasterShapeExplorer";
// import { DataKeyStoreDebugComponent } from "./DevTools/DataKeyStoreDebugComponent/DataKeyStoreDebugComponent";

export default function App() {
  return (
    <AppWrapper style={{ height: 700, minHeight: "unset" }}>
      <SoundEngine />
      {/* <DataKeyStoreDebugComponent /> */}
      <Section>
        <PianoControllers />
      </Section>

      <FullscreenButton />
      <KeyAndChordPicker />
      <ShapePicker />
      <MainContent>
        <Section>
          <HeaderControllers />
        </Section>
        <Section>
          <GuitarFretboard />
        </Section>

        <Section>
          <MasterShapeExplorer />
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
