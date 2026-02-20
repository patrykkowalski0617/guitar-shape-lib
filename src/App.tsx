import Fretboard from "@/components/Fretboard/Fretboard";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { AppWrapper, CollapsibleSection, ControlContainer, MainContent, Setcion } from "@/parts";
import { useSettingsStore } from "./store/useSettingsStore";
import { useControlsStore } from "./store/useControlsStore";
import Piano from "@/components/Piano/Piano";
import {
  AddToList,
  KeySelect,
  LockShapeButton,
  RandomizeControls,
  ShapeSelect,
  ModeAndRoleSelect,
} from "@/components/Controls";
import FullscreenButton from "@/components/FullscreenButton/FullscreenButton";
import { Toaster } from "@/components/ui/sonner";
import { getHSLColorFromHue } from "./utils";
import { ShapeExplorerSlider } from "./components/Controls/ShapeExplorerSlider/ShapeExplorerSlider";
import PianoToggleButton from "./components/Controls/PianoToggleButton/PianoToggleButton";

export default function App() {
  const { primaryColor } = useSettingsStore();
  const showPiano = useControlsStore((state) => state.showPiano);

  const roleColors = {
    "--primary": getHSLColorFromHue(primaryColor),
  } as React.CSSProperties;

  return (
    <AppWrapper style={roleColors}>
      <Toaster position="top-center" />
      <Header />

      <MainContent>
        <Setcion>
          <Fretboard />
          <ShapeExplorerSlider />
          <ControlContainer>
            <KeySelect />
            <ModeAndRoleSelect />
            <ShapeSelect />
            <RandomizeControls />
            <LockShapeButton />
            <AddToList />
            <PianoToggleButton />
          </ControlContainer>
        </Setcion>

        <CollapsibleSection $isVisible={showPiano}>
          <Piano />
        </CollapsibleSection>
      </MainContent>

      <FullscreenButton />
      <Footer />
    </AppWrapper>
  );
}
