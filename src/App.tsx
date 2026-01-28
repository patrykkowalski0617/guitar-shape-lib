import Fretboard from "./components/Fretboard/Fretboard";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import RoleSelect from "./components/RoleSelect/RoleSelect";
import { useMusicEngine } from "./hooks/useMusicEngine";
import Header from "./components/Header/Header";
import ShapeSelect from "./components/ShapeSelect/ShapeSelect";
import Footer from "./components/Footer/Footer";
import { AppWrapper, MainContent, Setcion } from "./parts";
import { LockShapeButton } from "./components/LockShapeButton/LockShapeButton";
import { ShapeStatusButtons } from "./components/Progress/ShapeStatusButtons";
import { ProgressActions } from "./components/Progress/ProgressActions";
import Keyboard from "./components/Keyboard/Keyboard";
import ControlsContainer from "./components/ControlsContainer/ControlsContainer";
import { DevModeProvider } from "./components/DevModeProvider/DevModeProvider";
import { useSettingsStore } from "./store/useSettingsStore";

function App() {
  useMusicEngine();
  const { tonicColor, subdominantColor, dominantColor } = useSettingsStore();

  const roleColors = {
    "--secondary": `hsl(${tonicColor} 100% 45%)`,
    "--primary": `hsl(${subdominantColor} 47% 45%)`,
    "--tension": `hsl(${dominantColor} 92% 45%)`,
  } as React.CSSProperties;

  return (
    <AppWrapper style={roleColors}>
      <DevModeProvider />
      <Header />
      <MainContent>
        <Setcion>
          <Keyboard />
        </Setcion>
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
            <ShapeStatusButtons />
            <ProgressActions />
          </ControlsContainer>
        </Setcion>
      </MainContent>
      <Footer />
    </AppWrapper>
  );
}

export default App;
