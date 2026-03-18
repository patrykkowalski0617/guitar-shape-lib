import { type JSX } from "react";
import * as S from "./parts";

export type Variant = "fretboard" | "piano";

interface NoteLabelProps {
  isShapeNote?: boolean;
  isActiveNote?: boolean;
  variant: Variant;
  noteLabel: string;
}

export default function NoteLabel({
  isShapeNote = false,
  isActiveNote = false,
  variant,
  noteLabel,
}: NoteLabelProps): JSX.Element {
  return (
    <S.NoteWrapper
      $isShapeNote={isShapeNote}
      $variant={variant}
      $isActiveNote={isActiveNote}
    >
      <S.Note>{noteLabel}</S.Note>
    </S.NoteWrapper>
  );
}
