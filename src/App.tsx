import Fretboard from "./components/Fretboard/Fretboard";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import RoleSelect from "./components/RoleSelect/RoleSelect";
import Header from "./components/Header/Header";
import ShapeSelect from "./components/ShapeSelect/ShapeSelect";
import Footer from "./components/Footer/Footer";
import { AppWrapper, MainContent, Setcion } from "./parts";
import { LockShapeButton } from "./components/LockShapeButton/LockShapeButton";
import ControlsContainer from "./components/ControlsContainer/ControlsContainer";
import { useSettingsStore } from "./store/useSettingsStore";
import Piano from "./components/Piano/Piano";

function App() {
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
          <ControlsContainer>
            <ModeSelect />
            <KeySelect />
            <RoleSelect />
            <ShapeSelect />
            <LockShapeButton />
          </ControlsContainer>
        </Setcion>
        <Setcion>
          <Piano />
        </Setcion>
      </MainContent>
      <Footer />
    </AppWrapper>
  );
}

export default App;
