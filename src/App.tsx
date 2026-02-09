import Fretboard from "./components/Fretboard/Fretboard";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AppWrapper, ControlContainer, MainContent, Setcion } from "./parts";
import { useSettingsStore } from "./store/useSettingsStore";
import Piano from "./components/Piano/Piano";
import { KeySelect, LockShapeButton, ModeSelect, RoleSelect, ShapeSelect } from "./components/Controls";

export default function App() {
  const { tonicColor, subdominantColor, dominantColor } = useSettingsStore();

  const roleColors = {
    "--secondary": `hsl(${tonicColor} 90% 45%)`,
    "--primary": `hsl(${subdominantColor} 90% 45%)`,
    "--tension": `hsl(${dominantColor} 90% 45%)`,
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
