import DescriptiveLabelsSelect from "./components/DescriptiveLabelsSelect/DescriptiveLabelsSelect";
import Fretboard from "./components/Fretboard/Fretboard";
import Keyboard from "./components/Keyboard/Keyboard";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import RoleSelect from "./components/RoleSelect/RoleSelect";
import { useMusicEngine } from "./hooks/useMusicEngine/useMusicEngine";

function App() {
  useMusicEngine();
  return (
    <>
      <Keyboard />
      <Fretboard />
      <div className="flex flex-row items-end justify-center gap-6 p-4 w-full bg-background">
        <DescriptiveLabelsSelect />
        <ModeSelect />
        <KeySelect />
        <RoleSelect />
      </div>
    </>
  );
}

export default App;
