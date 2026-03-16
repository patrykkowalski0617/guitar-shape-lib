import { type JSX } from "react";
import * as S from "./parts";
import type { NoteObject } from "@/utils";
import { useEnharmonicNoteName } from "@/hooks";

export type Variant = "fretboard" | "piano";

interface NoteLabelProps {
  isShapeNote?: boolean;
  isActiveNote?: boolean;
  variant: Variant;
  note: NoteObject;
  isMinor?: boolean;
}

export default function NoteLabel({
  isShapeNote = false,
  isActiveNote = false,
  variant,
  note,
  isMinor = false,
}: NoteLabelProps): JSX.Element {
  const getEnharmonicNoteName = useEnharmonicNoteName();
  return (
    <S.NoteWrapper
      $isShapeNote={isShapeNote}
      $variant={variant}
      $isActiveNote={isActiveNote}
    >
      <S.Note>
        {getEnharmonicNoteName(note)}
        {isMinor ? "m" : ""}
      </S.Note>
    </S.NoteWrapper>
  );
}
