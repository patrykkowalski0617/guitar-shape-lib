import { type JSX } from "react";
import * as S from "./parts";
import type { NoteName } from "@/data";

export type Variant = "fretboard" | "piano";

interface NoteLabelProps {
  isVisible?: boolean;
  variant: Variant;
  noteLabel: NoteName;
  isTargetNote: boolean;
}

export default function NoteLabel({
  isVisible = false,
  variant,
  noteLabel,
  isTargetNote,
}: NoteLabelProps): JSX.Element {
  return (
    <S.NoteWrapper
      $isVisible={isVisible}
      $variant={variant}
      $isTargetNote={isTargetNote}
    >
      <S.Note>{noteLabel}</S.Note>
    </S.NoteWrapper>
  );
}
