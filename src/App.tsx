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
import { getRoleHSLColor } from "@/utils";
import FullscreenButton from "@/components/FullscreenButton/FullscreenButton";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const { tonicColor, subdominantColor, dominantColor } = useSettingsStore();

  const roleColors = {
    "--secondary": getRoleHSLColor(tonicColor),
    "--primary": getRoleHSLColor(subdominantColor),
    "--tension": getRoleHSLColor(dominantColor),
  } as React.CSSProperties;

  return (
    <AppWrapper style={roleColors}>
      <Toaster position="top-center" />
      <Header />
      <FullscreenButton />
      <MainContent>
        <Setcion>
          <Fretboard />
        </Setcion>
        <Setcion>
          <ControlContainer>
            <ModeSelect />
            <KeySelect />
            <RoleSelect />
            <ShapeSelect />
            <LockShapeButton />
            <RandomizeControls />
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
