import { AppWrapper, MainContent, Section } from "@/parts";
import { SoundEngine } from "./components/SoundEngine/SoundEngine";
import { ShapePlayer } from "./components/ShapePlayer/ShapePlayer";
import GuitarFretboard from "./components/GuitarFretboard/GuitarFretboard";
// import { PianoControllers } from "@/components/PianoControllers/PianoControllers";
import { HeaderControllers } from "./components/HeaderControllers/HeaderControllers";
import { PlayerHeader } from "./components/PlayerHeader/PlayerHeader";
import { PickerDialog } from "./components/PickerDialog/PickerDialog";
import Sign from "./components/Sign/Sign";
// import { DataKeyStoreDebugComponent } from "./DevTools/DataKeyStoreDebugComponent/DataKeyStoreDebugComponent";

export default function App() {
  return (
    <AppWrapper>
      <SoundEngine />
      <PickerDialog />
      {/* <DataKeyStoreDebugComponent /> */}
      {/* <Section>
        <PianoControllers />
      </Section> */}

      <MainContent>
        <Section>
          <Sign />
        </Section>

        <Section $stickyTop={0}>
          <HeaderControllers />
        </Section>

        <Section $stickyTop={50}>
          <GuitarFretboard />
        </Section>

        <Section>
          <PlayerHeader />
        </Section>

        <Section>
          <ShapePlayer />
        </Section>
      </MainContent>
    </AppWrapper>
  );
}
