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
      {/* <div
        style={{
          height: "100vh",
          border: "1px solid red",
          width: 1400,
          margin: "auto",
          position: "fixed",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      ></div> */}
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
