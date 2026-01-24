import { type JSX } from "react";
import * as S from "./parts";
import { type Note } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";

interface NoteLabelProps {
  flatNoteName: Note;
  sharpNoteName: Note;
  isFlatTune: boolean;
  isHighlighted: boolean;
  isEnharmonic: boolean;
  orientation?: S.LabelOrientation;
  isShapeNote?: boolean;
  isTuneNote?: boolean;
}

export default function NoteLabel({
  isFlatTune,
  isHighlighted,
  sharpNoteName,
  flatNoteName,
  isEnharmonic,
  orientation = "vertical",
  isShapeNote = false,
  isTuneNote = false,
}: NoteLabelProps): JSX.Element {
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);

  return (
    <S.Wrapper
      $isFlatTune={isFlatTune}
      $isEnharmonicNote={isEnharmonic}
      $isHighlighted={isHighlighted}
      $orientation={orientation}
      $isShapeNote={isShapeNote}
      $areAnimationsOn={areAnimationsOn}
      $isTuneNote={isTuneNote}
    >
      <div className="mainLabel">{sharpNoteName}</div>
      {isEnharmonic && <div className="optionalLabel">{flatNoteName}</div>}
    </S.Wrapper>
  );
}
