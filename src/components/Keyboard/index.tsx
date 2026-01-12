import { type JSX } from "react";
import * as S from "./parts";
import { majorScale } from "@/utils/arpsAndScales/arpsAndScales";
import { keysOffset, notes, numberOfKeys } from "./constants";
import ScaleTemplate from "./ScaleTemplate";

const KEY_SHAPE_MAP: Record<number, S.KeyShape> = {
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
        {notes.map((note, index) => {
          const noteIndex = (index + keysOffset) % 12;
          return (
            <S.Key
              key={index}
              $isWhiteKey={majorScale.includes(noteIndex)}
              $keyShape={KEY_SHAPE_MAP[noteIndex]}
            >
              <S.NoteLabel>{note}</S.NoteLabel>
            </S.Key>
          );
        })}
      </S.Keyboard>
    </S.KeyboardWrapper>
  );
}
