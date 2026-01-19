import { type JSX } from "react";
import * as S from "./parts";
import { type Note } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";

interface NoteLabelProps {
  flatNoteName: Note;
  sharpNoteName: Note;
  isFlatKey: boolean;
  isHighlighted: boolean;
  isEnharmonic: boolean;
  orientation?: S.LabelOrientation;
  isShapeNote?: boolean;
}

export default function NoteLabel({
  isFlatKey,
  isHighlighted,
  sharpNoteName,
  flatNoteName,
  isEnharmonic,
  orientation = "vertical",
  isShapeNote = false,
}: NoteLabelProps): JSX.Element {
  const areAnimationsOn = useSettingsStore((state) => state.areAnimationsOn);
  return (
    <S.Wrapper
      $isFlatKey={isFlatKey}
      $isEnharmonicNote={isEnharmonic}
      $isHighlighted={isHighlighted}
      $orientation={orientation}
      $isShapeNote={isShapeNote}
      $areAnimationsOn={areAnimationsOn}
    >
      <div className="mainLabel">{sharpNoteName}</div>
      {isEnharmonic && <div className="optionalLabel">{flatNoteName}</div>}
    </S.Wrapper>
  );
}
