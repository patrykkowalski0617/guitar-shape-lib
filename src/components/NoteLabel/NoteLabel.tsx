import { type JSX } from "react";
import * as S from "./parts";
import { type Note } from "@/data";
import { MainLabel, OptionalLabel } from "@/components/NoteLabel/parts";

export type Variant = "fretboard" | "piano";

interface NoteLabelProps {
  flatNoteName: Note;
  sharpNoteName: Note;
  isFlatTune: boolean;
  isHighlighted: boolean;
  isEnharmonic: boolean;
  isShapeNote?: boolean;
  isActiveNote?: boolean;
  variant: Variant;
}

export default function NoteLabel({
  isFlatTune,
  isHighlighted,
  sharpNoteName,
  flatNoteName,
  isEnharmonic,
  isShapeNote = false,
  isActiveNote = false,
  variant,
}: NoteLabelProps): JSX.Element {
  return (
    <S.NoteWrapper
      $isFlatTune={isFlatTune}
      $isEnharmonicNote={isEnharmonic}
      $isShapeNote={isShapeNote}
      $variant={variant}
      $isActiveNote={isActiveNote}
    >
      <MainLabel $isFlatTune={isFlatTune} $isEnharmonicNote={isEnharmonic} $isHighlighted={isHighlighted}>
        {sharpNoteName}
      </MainLabel>
      {isEnharmonic && (
        <OptionalLabel $isFlatTune={isFlatTune} $isEnharmonicNote={isEnharmonic} $isHighlighted={isHighlighted}>
          {flatNoteName}
        </OptionalLabel>
      )}
    </S.NoteWrapper>
  );
}
