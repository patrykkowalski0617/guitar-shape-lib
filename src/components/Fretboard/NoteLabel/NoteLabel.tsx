import { type JSX } from "react";
import * as S from "./parts";
import { type Note } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";
import { MainLabel, OptionalLabel } from "@/components/NoteLabel/parts";

interface NoteLabelProps {
  flatNoteName: Note;
  sharpNoteName: Note;
  isFlatTune: boolean;
  isHighlighted: boolean;
  isEnharmonic: boolean;
  isShapeNote?: boolean;
  isTuneNote?: boolean;
}

export default function NoteLabel({
  isFlatTune,
  isHighlighted,
  sharpNoteName,
  flatNoteName,
  isEnharmonic,
  isShapeNote = false,
  isTuneNote = false,
}: NoteLabelProps): JSX.Element {
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);

  return (
    <S.Wrapper
      $isFlatTune={isFlatTune}
      $isEnharmonicNote={isEnharmonic}
      $isHighlighted={isHighlighted}
      $isShapeNote={isShapeNote}
      $areAnimationsOn={areAnimationsOn}
      $isTuneNote={isTuneNote}
    >
      <MainLabel
        $isFlatTune={isFlatTune}
        $isEnharmonicNote={isEnharmonic}
        $isHighlighted={isHighlighted}
        $areAnimationsOn={areAnimationsOn}
      >
        {sharpNoteName}
      </MainLabel>
      {isEnharmonic && (
        <OptionalLabel
          $isFlatTune={isFlatTune}
          $isEnharmonicNote={isEnharmonic}
          $isHighlighted={isHighlighted}
          $areAnimationsOn={areAnimationsOn}
        >
          {flatNoteName}
        </OptionalLabel>
      )}
    </S.Wrapper>
  );
}
