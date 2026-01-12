import { getNotes } from "@/utils";
import * as S from "./parts";
import { majorScale } from "@/utils/arpsAndScales/arpsAndScales";

const CHROMATIC_SCALE = getNotes({});
const KEY_SHAPE_MAP = {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B",
};
const numberOfKeys = 43;
const offset = 5;
const firstNote = CHROMATIC_SCALE[((offset % 12) + 12) % 12];
const notes = getNotes({ length: numberOfKeys, firstNote });

export default function Keyboard() {
  return (
    <S.Keyboard numberOfKeys={numberOfKeys}>
      {notes.map((note, index) => {
        const noteIndex = (index + offset) % 12;
        const keyShape = KEY_SHAPE_MAP[noteIndex];

        return (
          <S.Key key={index} isWhiteKey={majorScale.includes(noteIndex)} keyShape={keyShape}>
            <S.NoteLabel>{note}</S.NoteLabel>
          </S.Key>
        );
      })}
    </S.Keyboard>
  );
}
