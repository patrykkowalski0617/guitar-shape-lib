import { type JSX } from "react";
import { useMusicStore } from "@/store";
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
  const isSelected = useMusicStore((state) =>
    state.selectedComponentNotes.includes(noteLabel),
  );

  return (
    <S.NoteWrapper
      $isVisible={isVisible}
      $variant={variant}
      $isSelected={isSelected}
    >
      <S.Note>{noteLabel}</S.Note>
    </S.NoteWrapper>
  );
}
