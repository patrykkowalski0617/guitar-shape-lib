import {
  Add,
  Clear,
  Metronome,
  Undo,
  Save,
  Open,
  TogglePlayback,
  BpmInput,
  BpmMultiplier,
} from "./headerElements";
import * as S from "./parts";
import { ExerciseTitle } from "./headerElements/ExerciseTitle/ExerciseTitle";
import { MasterNoteMatrix } from "../NoteMatrix/MasterNoteMatrix";
import { Transpose } from "./headerElements/Transpose/Transpose";

export const HeaderControllers = () => {
  return (
    <S.ShapePlayerControllers>
      <Open />
      <Save />
      <ExerciseTitle />
      <Add />
      <Clear />
      <Undo />
      <TogglePlayback />
      <Metronome />
      <BpmInput />
      <BpmMultiplier />
      <MasterNoteMatrix />
      <Transpose />
    </S.ShapePlayerControllers>
  );
};
