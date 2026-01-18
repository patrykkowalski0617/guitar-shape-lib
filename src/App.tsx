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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col lg:flex-row flex-wrap items-start lg:items-end gap-6 w-full">
              <ModeSelect />
              <KeySelect />
              <RoleSelect />
              <ShapeSelect />
              <LockShapeButton />
            </div>
            <div>tutaj bedzie kontent</div>
          </div>
        </Setcion>
      </MainContent>
      <Footer />
    </AppWrapper>
  );
}

export default App;
