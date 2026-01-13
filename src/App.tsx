import DescriptiveLabelsSelect from "./components/DescriptiveLabelsSelect/DescriptiveLabelsSelect";
import Keyboard from "./components/Keyboard/Keyboard";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import MusicFunctionSelect from "./components/MusicFunctionSelect/MusicFunctionSelect";

function App() {
  return (
    <>
      <Keyboard />
      <div className="flex flex-row items-end justify-center gap-6 p-4 w-full bg-background">
        <DescriptiveLabelsSelect />
        <ModeSelect />
        <KeySelect />
        <MusicFunctionSelect />
      </div>
    </>
  );
}

export default App;
