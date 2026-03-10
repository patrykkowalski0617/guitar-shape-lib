import { type JSX } from "react";
import * as S from "./parts";
import { usePlayerStore } from "@/store";
import type { NoteObject } from "@/utils";
import { useEnharmonicNoteName } from "@/hooks";

export type Variant = "fretboard" | "piano";

interface NoteLabelProps {
  isShapeNote?: boolean;
  isActiveNote?: boolean;
  variant: Variant;
  note: NoteObject;
}

export default function NoteLabel({
  isShapeNote = false,
  isActiveNote = false,
  variant,
  note,
}: NoteLabelProps): JSX.Element {
  const transitionTime = usePlayerStore((state) => state.transitionTime);
  const getEnharmonicNoteName = useEnharmonicNoteName();
  return (
    <S.NoteWrapper
      $isShapeNote={isShapeNote}
      $variant={variant}
      $isActiveNote={isActiveNote}
      $transitionTime={transitionTime}
    >
      <S.Note>{getEnharmonicNoteName(note)}</S.Note>
    </S.NoteWrapper>
  );
}
