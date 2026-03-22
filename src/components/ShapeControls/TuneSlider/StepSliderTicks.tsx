import * as S from "./parts";

interface StepSliderTicksProps {
  options: string[];
  effectiveMax: number;
}

export function StepSliderTicks({
  options,
  effectiveMax,
}: StepSliderTicksProps) {
  const calculateTickPosition = (index: number) => {
    const hasOnlyOneOption = effectiveMax === 0;
    const position = hasOnlyOneOption ? 0 : (index / effectiveMax) * 100;
    return position;
  };

  return (
    <>
      {options.map((option, index) => {
        const position = calculateTickPosition(index);

        return (
          <S.Tick
            key={`${option}-${index}`}
            style={{ left: `${position}%` }}
          ></S.Tick>
        );
      })}
    </>
  );
}
