import Fretboard from "@/components/Fretboard/Fretboard";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { AppWrapper, ControlContainer, MainContent, Setcion } from "@/parts";
import { useSettingsStore } from "./store/useSettingsStore";
import Piano from "@/components/Piano/Piano";
import {
  KeySelect,
  LockShapeButton,
  ModeSelect,
  RandomizeControls,
  RoleSelect,
  ShapeSelect,
} from "@/components/Controls";
import FullscreenButton from "@/components/FullscreenButton/FullscreenButton";
import { Toaster } from "@/components/ui/sonner";
import { getHSLColorFromHue } from "./utils";
import { ShapeExplorerSlider } from "./components/Controls/ShapeExplorerSlider/ShapeExplorerSlider";

export default function App() {
  const { primaryColor } = useSettingsStore();

  const roleColors = {
    "--primary": getHSLColorFromHue(primaryColor),
  } as React.CSSProperties;

  return (
    <AppWrapper style={roleColors}>
      <Toaster position="top-center" />
      <Header />
      <FullscreenButton />
      <MainContent>
        <Setcion>
          <Fretboard />
          <ShapeExplorerSlider />
        </Setcion>
        <Setcion>
          <ControlContainer>
            <ModeSelect />
            <KeySelect />
            <RoleSelect />
            <ShapeSelect />
            <RandomizeControls />
            <LockShapeButton />
          </ControlContainer>
        </Setcion>
        <Setcion>
          <Piano />
        </Setcion>
      </MainContent>
      <Footer />
    </AppWrapper>
  );
}
