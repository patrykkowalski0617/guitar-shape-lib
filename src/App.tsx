import Fretboard from "./components/Fretboard/Fretboard";
import Keyboard from "./components/Keyboard/Keyboard";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import RoleSelect from "./components/RoleSelect/RoleSelect";
import { useMusicEngine } from "./hooks/useMusicEngine/useMusicEngine";
import Header from "./components/Header/Header";
import ShapeSelect from "./components/ShapeSelect/ShapeSelect";
import Footer from "./components/Footer/Footer";
import { AppWrapper, MainContent, Setcion } from "./parts";
import { LockShapeButton } from "./components/LockShapeButton/LockShapeButton";
import { ShapeStatusButtons } from "./components/Progress/ShapeStatusButtons";
import { ProgressActions } from "./components/Progress/ProgressActions";

function App() {
  useMusicEngine();
  return (
    <AppWrapper>
      <Header />
      <MainContent>
        <Setcion>
          <Keyboard />
        </Setcion>
        <Setcion>
          <Fretboard />
        </Setcion>
        <Setcion>
          <div className="max-w-[400px] md:max-w-[1000px] m-auto flex flex-col justify-center md:flex-row flex-wrap md:items-end gap-6">
            <ModeSelect />
            <KeySelect />
            <RoleSelect />
            <ShapeSelect />
            <LockShapeButton />
            <ShapeStatusButtons />
            <ProgressActions />
          </div>
        </Setcion>
      </MainContent>
      <Footer />
    </AppWrapper>
  );
}

export default App;
