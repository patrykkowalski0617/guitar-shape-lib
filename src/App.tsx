import Fretboard from "./components/Fretboard/Fretboard";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AppWrapper, ControlContainer, MainContent, Setcion } from "./parts";
import { useSettingsStore } from "./store/useSettingsStore";
import Piano from "./components/Piano/Piano";
import {
  KeySelect,
  LockShapeButton,
  ModeSelect,
  RandomizeControls,
  RoleSelect,
  ShapeSelect,
} from "./components/Controls";
import { getTSD_HSLColor } from "./utils/getTSD_HSLColor";

export default function App() {
  const { tonicColor, subdominantColor, dominantColor } = useSettingsStore();

  const roleColors = {
    "--secondary": getTSD_HSLColor(tonicColor),
    "--primary": getTSD_HSLColor(subdominantColor),
    "--tension": getTSD_HSLColor(dominantColor),
  } as React.CSSProperties;

  return (
    <AppWrapper style={roleColors}>
      <Header />
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
