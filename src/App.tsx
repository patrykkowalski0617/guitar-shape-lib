import { AppWrapper, MainContent, Section } from "@/parts";
import Footer from "./components/Footer/Footer";
import { SoundEngine } from "./components/SoundEngine/SoundEngine";
import { ShapePlayer } from "./components/ShapePlayer/ShapePlayer";
import { KeyAndChordPicker } from "@/components/KeyAndChordPicker/KeyAndChordPicker";
import ShapePicker from "./components/ShapePicker/ShapePicker";
import GuitarFretboard from "./components/GuitarFretboard/GuitarFretboard";
// import { PianoControllers } from "@/components/PianoControllers/PianoControllers";
import { HeaderControllers } from "./components/HeaderControllers/HeaderControllers";
import { PlayerHeader } from "./components/PlayerHeader/PlayerHeader";
// import { DataKeyStoreDebugComponent } from "./DevTools/DataKeyStoreDebugComponent/DataKeyStoreDebugComponent";

export default function App() {
  return (
    <AppWrapper style={{ height: 700, minHeight: "unset" }}>
      <SoundEngine />
      {/* <DataKeyStoreDebugComponent /> */}
      {/* <Section>
        <PianoControllers />
      </Section> */}

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
          <PlayerHeader />
          <ShapePlayer />
        </Section>

        <Section>
          <Footer />
        </Section>
      </MainContent>
    </AppWrapper>
  );
}
