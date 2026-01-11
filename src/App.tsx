import "./App.css";
import KeySelect from "./components/KeySelect/KeySelect";
import ModeSelect from "./components/ModeSelect/ModeSelect";
import NotesDisplay from "./components/NotesDisplay/NotesDisplay";

function App() {
  return (
    <>
      <NotesDisplay />
      <ModeSelect />

      <KeySelect />
    </>
  );
}

export default App;
