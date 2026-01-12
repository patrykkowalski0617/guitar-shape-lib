import "./App.css";
import Keyboard from "./components/Keyboard/Keyboard";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import NotesDisplay from "./components/NotesDisplay/NotesDisplay";

function App() {
  return (
    <>
      <Keyboard />
      <NotesDisplay />
      <ModeSelect />

      <KeySelect />
    </>
  );
}

export default App;
