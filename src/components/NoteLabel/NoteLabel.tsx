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
    <S.NoteWrapper $isTargetNote={isTargetNote}>
      <S.Note $isVisible={isVisible} $variant={variant}>
        {noteLabel}
      </S.Note>
    </S.NoteWrapper>
  );
}
