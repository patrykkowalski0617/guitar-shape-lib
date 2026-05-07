import { useKnob } from "./hooks/useKnobs";
import * as S from "./parts";

interface KnobProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
}

export const Knob = ({ label, value, min, max, step, onChange }: KnobProps) => {
  const { rotation, handleMouseDown } = useKnob({
    value,
    min,
    max,
    step,
    onChange,
  });

  return (
    <S.ControlWrapper>
      <S.KnobOuter onMouseDown={handleMouseDown}>
        <S.IndicatorContainer $rotation={rotation}>
          <S.IndicatorMark />
        </S.IndicatorContainer>
      </S.KnobOuter>
      <S.LabelBox>
        <S.LabelText>{label}</S.LabelText>
      </S.LabelBox>
    </S.ControlWrapper>
  );
};
