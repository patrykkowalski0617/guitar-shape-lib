import { Tick } from "./parts";

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
        return (
          <Tick
            key={option + index}
            style={{ left: `${calculateTickPosition(index)}%` }}
          />
        );
      })}
    </>
  );
}
