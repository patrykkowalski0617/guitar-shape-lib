import { AppWrapper, MainContent, Section } from "@/parts";
import { SoundEngine } from "./components/SoundEngine/SoundEngine";
import { ShapePlayer } from "./components/ShapePlayer/ShapePlayer";
import GuitarFretboard from "./components/GuitarFretboard/GuitarFretboard";
// import { PianoControllers } from "@/components/PianoControllers/PianoControllers";
import { HeaderControllers } from "./components/HeaderControllers/HeaderControllers";
import { PickerDialog } from "./components/PickerDialog/PickerDialog";
import Sign from "./components/Sign/Sign";
import { CheckView } from "./CheckView";
import { SideMenu } from "./components/SideMenu/SideMenu";
// import { DataKeyStoreDebugComponent } from "./DevTools/DataKeyStoreDebugComponent/DataKeyStoreDebugComponent";

export default function App() {
  return (
    <AppWrapper>
      <CheckView />
      <SoundEngine />
      <PickerDialog />
      {/* <DataKeyStoreDebugComponent /> */}
      {/* <Section>
        <PianoControllers />
      </Section> */}
      <SideMenu />
      <MainContent>
        <Section>
          {" "}
          <div
            style={{
              height: 10,
              border: "1px solid green",
              width: 1400,
              margin: "auto",
            }}
          ></div>
          <Sign />
        </Section>
        <Section $stickyTop={0}>
          <HeaderControllers />
        </Section>
        <Section $stickyTop={50}>
          <GuitarFretboard />
        </Section>
        <Section>
          <ShapePlayer />
        </Section>
      </MainContent>
    </AppWrapper>
  );
}
