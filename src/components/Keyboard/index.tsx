import { type JSX } from "react";
import * as S from "./parts";
import { majorScale } from "@/utils/arpsAndScales/arpsAndScales";
import { keysOffset, notes, numberOfKeys } from "./constants";
import ScaleTemplate from "./ScaleTemplate";

const KEY_SHAPE_MAP: Record<number, "C" | "D" | "E" | "F" | "G" | "A" | "B"> = {
  0: "C",
  2: "D",
  4: "E",
  5: "F",
  7: "G",
  9: "A",
  11: "B",
};

export default function Keyboard(): JSX.Element {
  return (
    <S.KeyboardWrapper>
      <ScaleTemplate />
      <S.Keyboard $numberOfKeys={numberOfKeys}>
        {notes.map((note: string, index: number) => {
          const noteIndex = (index + keysOffset) % 12;
          const keyShape = KEY_SHAPE_MAP[noteIndex];

          return (
            <S.Key key={index} $isWhiteKey={majorScale.includes(noteIndex)} $keyShape={keyShape}>
              <S.NoteLabel>{note}</S.NoteLabel>
            </S.Key>
          );
        })}
      </S.Keyboard>
    </S.KeyboardWrapper>
  );
}
