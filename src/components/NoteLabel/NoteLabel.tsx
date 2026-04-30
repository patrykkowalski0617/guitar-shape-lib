import { type JSX } from "react";
import * as S from "./parts";

export type Variant = "fretboard" | "piano";

interface NoteLabelProps {
  isVisible?: boolean;
  variant: Variant;
  noteLabel: string;
}

export default function NoteLabel({
  isVisible = false,
  variant,
  noteLabel,
}: NoteLabelProps): JSX.Element {
  return (
    <S.NoteWrapper $isVisible={isVisible} $variant={variant}>
      <S.Note>{noteLabel}</S.Note>
    </S.NoteWrapper>
  );
}
