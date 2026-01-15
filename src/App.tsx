import Fretboard from "./components/Fretboard/Fretboard";
import Keyboard from "./components/Keyboard/Keyboard";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import RoleSelect from "./components/RoleSelect/RoleSelect";
import { useMusicEngine } from "./hooks/useMusicEngine/useMusicEngine";
import { Settings } from "./components/Settings/Settings";

function App() {
  useMusicEngine();
  return (
    <>
      <Keyboard />
      <Fretboard />
      <div className="flex flex-row flex-wrap items-end justify-center gap-6 p-4 w-full bg-background">
        <ModeSelect />
        <KeySelect />
        <RoleSelect />
        <Settings />
      </div>
    </>
  );
}

export default App;
