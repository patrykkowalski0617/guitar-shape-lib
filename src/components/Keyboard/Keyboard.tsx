import { type JSX } from "react";
import { getNotes } from "@/utils";
import * as S from "./parts";
import { majorScale } from "@/utils/arpsAndScales/arpsAndScales";

const KEY_SHAPE_MAP: Record<number, "C" | "D" | "E" | "F" | "G" | "A" | "B"> = {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B",
};

const CHROMATIC_SCALE = getNotes({});

export default function Keyboard(): JSX.Element {
  const numberOfKeys = 43;
  const offset = 5;
  const firstNote = CHROMATIC_SCALE[((offset % 12) + 12) % 12];
  const notes = getNotes({ length: numberOfKeys, firstNote });

  return (
    <S.Keyboard $numberOfKeys={numberOfKeys}>
      {notes.map((note: string, index: number) => {
        const noteIndex = (index + offset) % 12;
        const keyShape = KEY_SHAPE_MAP[noteIndex];

        return (
          <S.Key key={index} $isWhiteKey={majorScale.includes(noteIndex)} $keyShape={keyShape}>
            <S.NoteLabel>{note}</S.NoteLabel>
          </S.Key>
        );
      })}
    </S.Keyboard>
  );
}
