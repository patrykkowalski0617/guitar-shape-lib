import Fretboard from "./components/Fretboard/Fretboard";
import Keyboard from "./components/Keyboard/Keyboard";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import RoleSelect from "./components/RoleSelect/RoleSelect";
import { useMusicEngine } from "./hooks/useMusicEngine/useMusicEngine";
import Header from "./components/Header/Header";
import ShapeSelect from "./components/ShapeSelect/ShapeSelect";
import { Setcion } from "./components/customUI/parts";
import Footer from "./components/Footer/Footer";
import { AppWrapper, MainContent } from "./parts";

function App() {
  useMusicEngine();
  return (
    <>
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
            <div className="flex flex-row flex-wrap items-end justify-center gap-6 w-full bg-background">
              <ModeSelect />
              <KeySelect />
              <RoleSelect />
              {/* <ShapeSelect /> */}
            </div>
          </Setcion>
        </MainContent>
        <Setcion>
          <Footer />
        </Setcion>
      </AppWrapper>
    </>
  );
}

export default App;
