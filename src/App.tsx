import DescriptiveLabelsSelect from "./components/DescriptiveLabelsSelect/DescriptiveLabelsSelect";
import Keyboard from "./components/Keyboard/Keyboard";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import MusicFunctionSelect from "./components/MusicFunctionSelect/MusicFunctionSelect";
import {
  MINOR_MAJOR_TEMPLATE_STEPS,
  MINOR_MAJOR_TEMPLATE_STEPS_2octaves,
  MINOR_MAJOR_TEMPLATE_STEPS_2octaves_Domi,
  MINOR_MAJOR_TEMPLATE_STEPS_2octaves_Subdomi,
} from "./utils";

function App() {
  console.log(MINOR_MAJOR_TEMPLATE_STEPS);
  console.log(MINOR_MAJOR_TEMPLATE_STEPS_2octaves);
  console.log(MINOR_MAJOR_TEMPLATE_STEPS_2octaves_Subdomi);
  console.log(MINOR_MAJOR_TEMPLATE_STEPS_2octaves_Domi);

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
