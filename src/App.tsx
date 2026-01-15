import Fretboard from "./components/Fretboard/Fretboard";
import Keyboard from "./components/Keyboard/Keyboard";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import RoleSelect from "./components/RoleSelect/RoleSelect";
import { useMusicEngine } from "./hooks/useMusicEngine/useMusicEngine";
import Header from "./components/Header/Header";
import ShapeSelect from "./components/ShapeSelect/ShapeSelect";

function App() {
  useMusicEngine();
  return (
    <>
      <Header />
      <Keyboard />
      <Fretboard />
      <div className="flex flex-row flex-wrap items-end justify-center gap-6 p-4 w-full bg-background">
        <ModeSelect />
        <KeySelect />
        <RoleSelect />
        <ShapeSelect />
      </div>
    </>
  );
}

export default App;
